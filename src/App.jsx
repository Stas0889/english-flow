import { useCallback, useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import COURSE_LESSONS from "./data/courseLessons";
import GRAMMAR_LESSONS from "./data/grammarLessons";
import PHRASES_DATA from "./data/phrases";
import useLocalStorage from "./hooks/useLocalStorage";
import useSupabaseAuth from "./hooks/useSupabaseAuth";
import { supabase } from "./lib/supabase";
import Course from "./pages/Course";
import Dashboard from "./pages/Dashboard";
import Dictionary from "./pages/Dictionary";
import Grammar from "./pages/Grammar";
import Learn from "./pages/Learn";
import Mistakes from "./pages/Mistakes";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Review from "./pages/Review";
import Settings from "./pages/Settings";
import AddWord from "./pages/AddWord";
import Videos from "./pages/Videos";
import { createCustomWord, normalizeCustomWords } from "./utils/customWords";
import { getTodayDateKey, parseDateKey } from "./utils/dates";
import {
  getCategoryInsights,
  getDailyPhraseSet,
  getStudyInsights,
  getWeakWords,
  normalizeActivityLog,
  updateActivityLog,
} from "./utils/learningInsights";
import { getDueWords, getProgressSummary } from "./utils/progress";
import { applySrsAction } from "./utils/srs";
import {
  createWordsProgressSnapshot,
  mergeWordsWithDefaults,
  normalizeStoredWordsProgress,
} from "./utils/wordProgress";
import { getRecommendedNewWords } from "./utils/wordSelection";

const STORAGE_KEYS = {
  wordsProgress: "englishFlow_wordsProgress",
  settings: "englishFlow_settings",
  dailyState: "englishFlow_dailyState",
  grammarProgress: "englishFlow_grammarProgress",
  courseProgress: "englishFlow_courseProgress",
  customWords: "englishFlow_customWords",
  videoProgress: "englishFlow_videoProgress",
  writingPractice: "englishFlow_writingPractice",
};

const DEFAULT_SETTINGS = {
  newWordsPerDay: 5,
  interfaceLanguage: "ru",
  voiceAccent: "en-US",
  phraseOfTheDay: true,
  grammarEnabled: true,
  activeCategories: ["Basic A1", "Webflow", "Design", "Client Communication"],
};

const NEW_WORD_ASSIGNMENT_VERSION = 2;

const createInitialDailyState = (today) => ({
  date: today,
  newWordsPausedToday: false,
  assignedNewWordIds: [],
  priorityNewWordIds: [],
  completedReviews: 0,
  activityLog: [],
  newWordAssignmentVersion: NEW_WORD_ASSIGNMENT_VERSION,
});

const createInitialWritingPractice = () => ({
  queueWordIds: [],
  hiddenWordIds: [],
  completedWordIds: [],
  completedAtByWordId: {},
  repetitionsByWordId: {},
});

const normalizeStringList = (value) =>
  Array.isArray(value)
    ? value.filter(Boolean).filter((item, index, list) => list.indexOf(item) === index)
    : [];

const normalizeWritingPractice = (value) => {
  const source = value && typeof value === "object" ? value : {};

  return {
    ...createInitialWritingPractice(),
    queueWordIds: normalizeStringList(source.queueWordIds),
    hiddenWordIds: normalizeStringList(source.hiddenWordIds),
    completedWordIds: normalizeStringList(source.completedWordIds),
    completedAtByWordId:
      source.completedAtByWordId && typeof source.completedAtByWordId === "object"
        ? source.completedAtByWordId
        : {},
    repetitionsByWordId:
      source.repetitionsByWordId && typeof source.repetitionsByWordId === "object"
        ? source.repetitionsByWordId
        : {},
  };
};

const normalizeDailyState = ({ dailyState, settings, today, words }) => {
  const baseState = {
    ...createInitialDailyState(today),
    ...(dailyState ?? {}),
  };

  const nextState = {
    ...baseState,
    date: today,
    completedReviews: Number(baseState.completedReviews) || 0,
    activityLog: normalizeActivityLog(baseState.activityLog),
    newWordAssignmentVersion: NEW_WORD_ASSIGNMENT_VERSION,
  };

  if (baseState.date !== today) {
    nextState.newWordsPausedToday = false;
    nextState.assignedNewWordIds = [];
    nextState.priorityNewWordIds = [];
  }

  const wordsMap = new Map(words.map((word) => [word.id, word]));
  const customTodayNewWordIds = words
    .filter(
      (word) =>
        word.source === "custom" &&
        word.status === "new" &&
        word.createdAt === today,
    )
    .map((word) => word.id);
  const rawPriorityNewWordIds = [
    ...(Array.isArray(nextState.priorityNewWordIds)
      ? nextState.priorityNewWordIds
      : []),
    ...customTodayNewWordIds,
  ];
  const priorityNewWordIds = rawPriorityNewWordIds.filter((wordId, index, list) => {
    const word = wordsMap.get(wordId);
    return word?.status === "new" && list.indexOf(wordId) === index;
  });

  nextState.priorityNewWordIds = priorityNewWordIds;

  const recommendedIds = getRecommendedNewWords(
    words,
    settings.activeCategories,
  ).map((word) => word.id);
  const availableIds = [
    ...priorityNewWordIds,
    ...recommendedIds.filter((wordId) => !priorityNewWordIds.includes(wordId)),
  ];

  if (nextState.newWordsPausedToday) {
    nextState.assignedNewWordIds = [];
    return nextState;
  }

  const currentAssignedIds = (Array.isArray(nextState.assignedNewWordIds)
    ? nextState.assignedNewWordIds
    : []
  ).filter((wordId) => availableIds.includes(wordId));
  const assignedIds = [
    ...priorityNewWordIds,
    ...currentAssignedIds.filter(
      (wordId) => !priorityNewWordIds.includes(wordId),
    ),
  ];

  const perDay =
    Number(settings.newWordsPerDay) || DEFAULT_SETTINGS.newWordsPerDay;

  if (
    baseState.newWordAssignmentVersion !== NEW_WORD_ASSIGNMENT_VERSION ||
    baseState.date !== today
  ) {
    nextState.assignedNewWordIds = availableIds.slice(0, perDay);
    return nextState;
  }

  const missingCount = Math.max(0, perDay - assignedIds.length);

  nextState.assignedNewWordIds = [
    ...assignedIds,
    ...availableIds
      .filter((wordId) => !assignedIds.includes(wordId))
      .slice(0, missingCount),
  ];

  return nextState;
};

const isSameDailyState = (left, right) =>
  left?.date === right?.date &&
  left?.newWordsPausedToday === right?.newWordsPausedToday &&
  Number(left?.newWordAssignmentVersion || 0) ===
    Number(right?.newWordAssignmentVersion || 0) &&
  Number(left?.completedReviews || 0) === Number(right?.completedReviews || 0) &&
  JSON.stringify(left?.activityLog ?? []) ===
    JSON.stringify(right?.activityLog ?? []) &&
  JSON.stringify(left?.priorityNewWordIds ?? []) ===
    JSON.stringify(right?.priorityNewWordIds ?? []) &&
  JSON.stringify(left?.assignedNewWordIds ?? []) ===
    JSON.stringify(right?.assignedNewWordIds ?? []);

function App() {
  const today = getTodayDateKey();
  const auth = useSupabaseAuth();

  const [settings, setSettings] = useLocalStorage(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS,
  );
  const [storedWordsProgress, setStoredWordsProgress] = useLocalStorage(
    STORAGE_KEYS.wordsProgress,
    {},
  );
  const [dailyState, setDailyState] = useLocalStorage(
    STORAGE_KEYS.dailyState,
    () => createInitialDailyState(today),
  );
  const [grammarProgress, setGrammarProgress] = useLocalStorage(
    STORAGE_KEYS.grammarProgress,
    {},
  );
  const [courseProgress, setCourseProgress] = useLocalStorage(
    STORAGE_KEYS.courseProgress,
    {},
  );
  const [customWords, setCustomWords] = useLocalStorage(
    STORAGE_KEYS.customWords,
    [],
  );
  const [videoProgress, setVideoProgress] = useLocalStorage(
    STORAGE_KEYS.videoProgress,
    {},
  );
  const [writingPractice, setWritingPractice] = useLocalStorage(
    STORAGE_KEYS.writingPractice,
    createInitialWritingPractice,
  );

  const normalizedCustomWords = useMemo(
    () => normalizeCustomWords(customWords),
    [customWords],
  );

  const wordsProgress = useMemo(
    () => mergeWordsWithDefaults(storedWordsProgress, normalizedCustomWords),
    [normalizedCustomWords, storedWordsProgress],
  );

  const setWordsProgress = useCallback(
    (nextWordsOrUpdater) => {
      setStoredWordsProgress((currentStoredProgress) => {
        const currentWords = mergeWordsWithDefaults(
          currentStoredProgress,
          normalizedCustomWords,
        );
        const nextWords =
          typeof nextWordsOrUpdater === "function"
            ? nextWordsOrUpdater(currentWords)
            : nextWordsOrUpdater;

        return createWordsProgressSnapshot(nextWords, normalizedCustomWords);
      });
    },
    [normalizedCustomWords, setStoredWordsProgress],
  );

  useEffect(() => {
    setSettings((current) => ({ ...DEFAULT_SETTINGS, ...(current ?? {}) }));
    setCustomWords((current) => {
      const normalized = normalizeCustomWords(current);
      return JSON.stringify(current ?? []) === JSON.stringify(normalized)
        ? current
        : normalized;
    });
    setStoredWordsProgress((current) =>
      normalizeStoredWordsProgress(current, normalizedCustomWords),
    );
    setGrammarProgress((current) =>
      current && typeof current === "object" ? current : {},
    );
    setCourseProgress((current) =>
      current && typeof current === "object" ? current : {},
    );
    setVideoProgress((current) =>
      current && typeof current === "object" && !Array.isArray(current)
        ? current
        : {},
    );
    setWritingPractice((current) => {
      const normalized = normalizeWritingPractice(current);
      return JSON.stringify(current ?? {}) === JSON.stringify(normalized)
        ? current
        : normalized;
    });
  }, [
    setCourseProgress,
    setCustomWords,
    setGrammarProgress,
    setSettings,
    setStoredWordsProgress,
    setVideoProgress,
    setWritingPractice,
    normalizedCustomWords,
  ]);

  const normalizedSettings = useMemo(
    () => ({ ...DEFAULT_SETTINGS, ...(settings ?? {}) }),
    [settings],
  );

  const normalizedDailyState = useMemo(
    () =>
      normalizeDailyState({
        dailyState,
        settings: normalizedSettings,
        today,
        words: wordsProgress,
      }),
    [dailyState, normalizedSettings, today, wordsProgress],
  );

  useEffect(() => {
    if (!isSameDailyState(dailyState, normalizedDailyState)) {
      setDailyState(normalizedDailyState);
    }
  }, [dailyState, normalizedDailyState, setDailyState]);

  const dueWords = useMemo(
    () => getDueWords(wordsProgress, today),
    [today, wordsProgress],
  );

  const todayNewWords = useMemo(() => {
    const wordsMap = new Map(wordsProgress.map((word) => [word.id, word]));

    return normalizedDailyState.assignedNewWordIds
      .map((wordId) => wordsMap.get(wordId))
      .filter(Boolean)
      .filter((word) => word.status === "new");
  }, [normalizedDailyState.assignedNewWordIds, wordsProgress]);

  const stats = useMemo(
    () =>
      getProgressSummary(
        wordsProgress,
        normalizedDailyState.completedReviews || 0,
      ),
    [normalizedDailyState.completedReviews, wordsProgress],
  );

  const phraseOfDay = useMemo(() => {
    const phraseIndex =
      Math.floor(parseDateKey(today).getTime() / 86400000) % PHRASES_DATA.length;
    return PHRASES_DATA[Math.abs(phraseIndex)];
  }, [today]);

  const dailyPhrases = useMemo(
    () =>
      getDailyPhraseSet(
        PHRASES_DATA,
        today,
        normalizedSettings.activeCategories,
        3,
      ),
    [normalizedSettings.activeCategories, today],
  );

  const studyInsights = useMemo(
    () => getStudyInsights(normalizedDailyState.activityLog, today),
    [normalizedDailyState.activityLog, today],
  );

  const weakWords = useMemo(
    () => getWeakWords(wordsProgress, 6),
    [wordsProgress],
  );

  const categoryInsights = useMemo(
    () =>
      getCategoryInsights(wordsProgress, normalizedSettings.activeCategories),
    [normalizedSettings.activeCategories, wordsProgress],
  );

  const normalizedWritingPractice = useMemo(
    () => normalizeWritingPractice(writingPractice),
    [writingPractice],
  );

  const writingQueueWords = useMemo(() => {
    const hiddenIds = new Set(normalizedWritingPractice.hiddenWordIds);
    const wordsMap = new Map(wordsProgress.map((word) => [word.id, word]));
    const queueIds = [
      ...normalizedWritingPractice.queueWordIds,
      ...dueWords.map((word) => word.id),
    ].filter((wordId, index, list) => list.indexOf(wordId) === index);

    return queueIds
      .map((wordId) => wordsMap.get(wordId))
      .filter(Boolean)
      .filter(
        (word) =>
          !hiddenIds.has(word.id) &&
          normalizedWritingPractice.completedAtByWordId[word.id] !== today &&
          word.status !== "learned" &&
          word.status !== "backlog",
      );
  }, [dueWords, normalizedWritingPractice, today, wordsProgress]);

  const courseStats = useMemo(() => {
    const totalLessons = COURSE_LESSONS.length;
    const totalWeeks = new Set(COURSE_LESSONS.map((lesson) => lesson.week)).size;
    const completedLessons = COURSE_LESSONS.filter(
      (lesson) => courseProgress?.[lesson.id]?.completed,
    ).length;
    const startedLessons = COURSE_LESSONS.filter((lesson) => {
      const state = courseProgress?.[lesson.id];
      return (
        state?.completed ||
        Boolean(String(state?.writingDraft || "").trim()) ||
        Object.keys(state?.exerciseAnswers || {}).length > 0
      );
    }).length;

    return {
      totalLessons,
      totalWeeks,
      completedLessons,
      startedLessons,
      completionPercent: totalLessons
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0,
    };
  }, [courseProgress]);

  const enqueueWritingWord = useCallback(
    (wordId) => {
      if (!wordId) {
        return;
      }

      setWritingPractice((current) => {
        const baseState = normalizeWritingPractice(current);

        if (baseState.hiddenWordIds.includes(wordId)) {
          return baseState;
        }

        return {
          ...baseState,
          queueWordIds: [
            wordId,
            ...baseState.queueWordIds.filter((id) => id !== wordId),
          ],
        };
      });
    },
    [setWritingPractice],
  );

  const markWritingWordDone = (wordId, repetitions = 10) => {
    if (!wordId) {
      return;
    }

    setWritingPractice((current) => {
      const baseState = normalizeWritingPractice(current);

      return {
        ...baseState,
        queueWordIds: baseState.queueWordIds.filter((id) => id !== wordId),
        completedWordIds: [
          wordId,
          ...baseState.completedWordIds.filter((id) => id !== wordId),
        ],
        completedAtByWordId: {
          ...baseState.completedAtByWordId,
          [wordId]: today,
        },
        repetitionsByWordId: {
          ...baseState.repetitionsByWordId,
          [wordId]: repetitions,
        },
      };
    });
  };

  const hideWritingWord = (wordId) => {
    if (!wordId) {
      return;
    }

    setWritingPractice((current) => {
      const baseState = normalizeWritingPractice(current);

      return {
        ...baseState,
        queueWordIds: baseState.queueWordIds.filter((id) => id !== wordId),
        hiddenWordIds: [
          wordId,
          ...baseState.hiddenWordIds.filter((id) => id !== wordId),
        ],
      };
    });
  };

  const handleWordAction = (wordId, actionType) => {
    const targetWord = wordsProgress.find((word) => word.id === wordId);

    if (!targetWord) {
      return;
    }

    const { updatedWord, completedReviewsDelta } = applySrsAction(
      targetWord,
      actionType,
      today,
    );
    const isNewWord = targetWord.status === "new";
    const shouldQueueWriting =
      ["know", "hard", "forgot"].includes(actionType) &&
      updatedWord.status !== "learned";
      const activityPatch = {
        totalActions: 1,
        reviewActions: isNewWord ? 0 : 1,
        newWordActions: isNewWord ? 1 : 0,
        knownActions: actionType === "know" || actionType === "mastered" ? 1 : 0,
        hardActions: actionType === "hard" ? 1 : 0,
        forgotActions: actionType === "forgot" ? 1 : 0,
        postponedActions: actionType === "postpone" ? 1 : 0,
        learnedActions:
          updatedWord.status === "learned" && targetWord.status !== "learned" ? 1 : 0,
      };

    setWordsProgress((currentWords) =>
      currentWords.map((word) => (word.id === wordId ? updatedWord : word)),
    );

    if (shouldQueueWriting) {
      enqueueWritingWord(wordId);
    }

    setDailyState((currentState) => {
      const baseState = normalizeDailyState({
        dailyState: currentState,
        settings: normalizedSettings,
        today,
        words: wordsProgress,
      });

      return {
        ...baseState,
        completedReviews:
          (Number(baseState.completedReviews) || 0) + completedReviewsDelta,
        activityLog: updateActivityLog(baseState.activityLog, today, activityPatch),
      };
    });
  };

  const pauseNewWordsForToday = () => {
    setDailyState((currentState) => ({
      ...normalizeDailyState({
        dailyState: currentState,
        settings: normalizedSettings,
        today,
        words: wordsProgress,
      }),
      newWordsPausedToday: true,
      assignedNewWordIds: [],
    }));
  };

  const updateSettings = (patch) => {
    setSettings((current) => ({
      ...DEFAULT_SETTINGS,
      ...(current ?? {}),
      ...patch,
    }));
  };

  const recordPracticeResult = ({ mode, isCorrect }) => {
    setDailyState((currentState) => {
      const baseState = normalizeDailyState({
        dailyState: currentState,
        settings: normalizedSettings,
        today,
        words: wordsProgress,
      });

      return {
        ...baseState,
        activityLog: updateActivityLog(baseState.activityLog, today, {
          totalActions: 1,
          practiceActions: 1,
          correctPracticeActions: isCorrect ? 1 : 0,
          wordQuizActions: mode === "wordQuiz" ? 1 : 0,
          phraseBuilderActions: mode === "phraseBuilder" ? 1 : 0,
          communicationActions: mode === "communication" ? 1 : 0,
        }),
      };
    });
  };

  const pinWordToTodayLearning = (wordId) => {
    if (!wordId) {
      return;
    }

    setDailyState((currentState) => {
      const initialState = createInitialDailyState(today);
      const baseState =
        currentState?.date === today
          ? {
              ...initialState,
              ...(currentState ?? {}),
            }
          : {
              ...initialState,
              activityLog: normalizeActivityLog(currentState?.activityLog),
            };
      const assignedNewWordIds = [
        wordId,
        ...(Array.isArray(baseState.assignedNewWordIds)
          ? baseState.assignedNewWordIds.filter((id) => id !== wordId)
          : []),
      ];
      const priorityNewWordIds = [
        wordId,
        ...(Array.isArray(baseState.priorityNewWordIds)
          ? baseState.priorityNewWordIds.filter((id) => id !== wordId)
          : []),
      ];

      return {
        ...baseState,
        date: today,
        newWordsPausedToday: false,
        assignedNewWordIds,
        priorityNewWordIds,
        newWordAssignmentVersion: NEW_WORD_ASSIGNMENT_VERSION,
      };
    });
  };

  const addWordToTodayLearning = (wordId) => {
    if (!wordId) {
      return;
    }

    setWordsProgress((currentWords) =>
      currentWords.map((word) =>
        word.id === wordId
          ? {
              ...word,
              reviewStage: 0,
              nextReviewDate: null,
              status: "new",
            }
          : word,
      ),
    );
    pinWordToTodayLearning(wordId);
  };

  const addCustomWord = (payload) => {
    const nextWord = createCustomWord(payload);

    if (!nextWord) {
      throw new Error("Не удалось создать слово");
    }

    setCustomWords((current) => {
      const normalized = normalizeCustomWords(current);
      const hasDuplicate = normalized.some(
        (word) =>
          String(word.word).trim().toLowerCase() ===
          String(nextWord.word).trim().toLowerCase(),
      );

      return hasDuplicate ? normalized : [...normalized, nextWord];
    });

    pinWordToTodayLearning(nextWord.id);

    return nextWord;
  };

  const selectGrammarAnswer = (lessonId, selectedAnswer) => {
    setGrammarProgress((current) => ({
      ...(current ?? {}),
      [lessonId]: {
        ...(current?.[lessonId] ?? {}),
        selectedAnswer,
        checked: false,
        isCorrect: null,
      },
    }));
  };

  const checkGrammarAnswer = (lessonId, correctAnswer) => {
    setGrammarProgress((current) => {
      const selectedAnswer = current?.[lessonId]?.selectedAnswer ?? "";

      return {
        ...(current ?? {}),
        [lessonId]: {
          ...(current?.[lessonId] ?? {}),
          checked: true,
          isCorrect: selectedAnswer === correctAnswer,
        },
      };
    });
  };

  const resetProgress = () => {
    setStoredWordsProgress({});
    setDailyState(createInitialDailyState(today));
    setGrammarProgress({});
    setCourseProgress({});
    setVideoProgress({});
    setWritingPractice(createInitialWritingPractice());
  };

  const exportAppData = () => ({
    [STORAGE_KEYS.wordsProgress]: normalizeStoredWordsProgress(
      storedWordsProgress,
      normalizedCustomWords,
    ),
    [STORAGE_KEYS.settings]: normalizedSettings,
    [STORAGE_KEYS.dailyState]: normalizedDailyState,
    [STORAGE_KEYS.grammarProgress]: grammarProgress,
    [STORAGE_KEYS.courseProgress]: courseProgress,
    [STORAGE_KEYS.customWords]: normalizedCustomWords,
    [STORAGE_KEYS.videoProgress]: videoProgress,
    [STORAGE_KEYS.writingPractice]: normalizedWritingPractice,
  });

  const importAppData = (payload) => {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid import payload");
    }

    const nextSettings = {
      ...DEFAULT_SETTINGS,
      ...(payload[STORAGE_KEYS.settings] ?? normalizedSettings),
    };
    const nextStoredWordsProgress = normalizeStoredWordsProgress(
      payload[STORAGE_KEYS.wordsProgress] ?? storedWordsProgress,
      normalizeCustomWords(payload[STORAGE_KEYS.customWords] ?? normalizedCustomWords),
    );
    const nextCustomWords = normalizeCustomWords(
      payload[STORAGE_KEYS.customWords] ?? normalizedCustomWords,
    );
    const nextWords = mergeWordsWithDefaults(
      nextStoredWordsProgress,
      nextCustomWords,
    );
    const nextDailyState = normalizeDailyState({
      dailyState: payload[STORAGE_KEYS.dailyState] ?? normalizedDailyState,
      settings: nextSettings,
      today,
      words: nextWords,
    });
    const nextGrammarProgress =
      payload[STORAGE_KEYS.grammarProgress] &&
      typeof payload[STORAGE_KEYS.grammarProgress] === "object"
        ? payload[STORAGE_KEYS.grammarProgress]
        : {};
    const nextCourseProgress =
      payload[STORAGE_KEYS.courseProgress] &&
      typeof payload[STORAGE_KEYS.courseProgress] === "object"
        ? payload[STORAGE_KEYS.courseProgress]
        : {};
    const nextVideoProgress =
      payload[STORAGE_KEYS.videoProgress] &&
      typeof payload[STORAGE_KEYS.videoProgress] === "object" &&
      !Array.isArray(payload[STORAGE_KEYS.videoProgress])
        ? payload[STORAGE_KEYS.videoProgress]
        : {};
    const nextWritingPractice = normalizeWritingPractice(
      payload[STORAGE_KEYS.writingPractice] ?? normalizedWritingPractice,
    );

    setSettings(nextSettings);
    setCustomWords(nextCustomWords);
    setStoredWordsProgress(nextStoredWordsProgress);
    setDailyState(nextDailyState);
    setGrammarProgress(nextGrammarProgress);
    setCourseProgress(nextCourseProgress);
    setVideoProgress(nextVideoProgress);
    setWritingPractice(nextWritingPractice);
  };

  const saveCloudState = async () => {
    if (!supabase || !auth.user) {
      throw new Error("Сначала войди в аккаунт.");
    }

    const { error } = await supabase.from("user_app_state").upsert({
      user_id: auth.user.id,
      payload: exportAppData(),
    });

    if (error) {
      throw error;
    }

    return { savedAt: new Date().toISOString() };
  };

  const loadCloudState = async () => {
    if (!supabase || !auth.user) {
      throw new Error("Сначала войди в аккаунт.");
    }

    const { data, error } = await supabase
      .from("user_app_state")
      .select("payload, updated_at")
      .eq("user_id", auth.user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data?.payload) {
      throw new Error("В облаке пока нет сохранённого прогресса.");
    }

    importAppData(data.payload);

    return { updatedAt: data.updated_at };
  };

  const selectCourseAnswer = (lessonId, exerciseIndex, selectedAnswer) => {
    setCourseProgress((current) => ({
      ...(current ?? {}),
      [lessonId]: {
        ...(current?.[lessonId] ?? {}),
        exerciseAnswers: {
          ...(current?.[lessonId]?.exerciseAnswers ?? {}),
          [exerciseIndex]: selectedAnswer,
        },
        exerciseResults: {
          ...(current?.[lessonId]?.exerciseResults ?? {}),
          [exerciseIndex]: {
            ...(current?.[lessonId]?.exerciseResults?.[exerciseIndex] ?? {}),
            checked: false,
            isCorrect: null,
          },
        },
      },
    }));
  };

  const checkCourseAnswer = (lessonId, exerciseIndex, correctAnswer) => {
    setCourseProgress((current) => {
      const selectedAnswer =
        current?.[lessonId]?.exerciseAnswers?.[exerciseIndex] ?? "";

      return {
        ...(current ?? {}),
        [lessonId]: {
          ...(current?.[lessonId] ?? {}),
          exerciseResults: {
            ...(current?.[lessonId]?.exerciseResults ?? {}),
            [exerciseIndex]: {
              checked: true,
              isCorrect: selectedAnswer === correctAnswer,
            },
          },
        },
      };
    });
  };

  const updateCourseWriting = (lessonId, text) => {
    setCourseProgress((current) => ({
      ...(current ?? {}),
      [lessonId]: {
        ...(current?.[lessonId] ?? {}),
        writingDraft: text,
      },
    }));
  };

  const toggleCourseSample = (lessonId) => {
    setCourseProgress((current) => ({
      ...(current ?? {}),
      [lessonId]: {
        ...(current?.[lessonId] ?? {}),
        showSample: !current?.[lessonId]?.showSample,
      },
    }));
  };

  const markCourseLessonComplete = (lessonId) => {
    setCourseProgress((current) => ({
      ...(current ?? {}),
      [lessonId]: {
        ...(current?.[lessonId] ?? {}),
        completed: true,
      },
    }));
  };

  const appContext = {
    auth,
    checkCourseAnswer,
    checkGrammarAnswer,
    addWordToTodayLearning,
    addCustomWord,
    courseLessons: COURSE_LESSONS,
    courseProgress,
    courseStats,
    selectCourseAnswer,
    dailyState: normalizedDailyState,
    customWords: normalizedCustomWords,
    dueWords,
    dailyPhrases,
    exportAppData,
    categoryInsights,
    grammarLessons: GRAMMAR_LESSONS,
    grammarProgress,
    handleWordAction,
    hideWritingWord,
    importAppData,
    markWritingWordDone,
    pauseNewWordsForToday,
    phraseOfDay,
    recordPracticeResult,
    resetProgress,
    loadCloudState,
    saveCloudState,
    toggleCourseSample,
    selectGrammarAnswer,
    settings: normalizedSettings,
    studyInsights,
    stats,
    todayNewWords,
    updateCourseWriting,
    updateSettings,
    videoProgress,
    writingPractice: normalizedWritingPractice,
    writingQueueWords,
    weakWords,
    wordsProgress,
    markCourseLessonComplete,
    setVideoProgress,
  };

  return (
    <Routes>
      <Route element={<AppLayout appContext={appContext} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/course" element={<Course />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/review" element={<Review />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/writing" element={<Navigate to="/practice?mode=writing" replace />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/add-word" element={<AddWord />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/mistakes" element={<Mistakes />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/settings" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
