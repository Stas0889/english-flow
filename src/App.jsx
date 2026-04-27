import { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import COURSE_LESSONS from "./data/courseLessons";
import GRAMMAR_LESSONS from "./data/grammarLessons";
import PHRASES_DATA from "./data/phrases";
import WORDS_DATA from "./data/words";
import useLocalStorage from "./hooks/useLocalStorage";
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
import { getRecommendedNewWords, sortWordsForLearning } from "./utils/wordSelection";

const STORAGE_KEYS = {
  wordsProgress: "englishFlow_wordsProgress",
  settings: "englishFlow_settings",
  dailyState: "englishFlow_dailyState",
  grammarProgress: "englishFlow_grammarProgress",
  courseProgress: "englishFlow_courseProgress",
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
  completedReviews: 0,
  activityLog: [],
  newWordAssignmentVersion: NEW_WORD_ASSIGNMENT_VERSION,
});

const mergeWordsWithDefaults = (storedWords) => {
  const safeWords = Array.isArray(storedWords) ? storedWords : [];
  const wordsMap = new Map(safeWords.map((word) => [word.id, word]));

  return WORDS_DATA.map((word) => {
    const storedWord = wordsMap.get(word.id) ?? {};

    return {
      ...word,
      reviewStage: Number(storedWord.reviewStage ?? word.reviewStage) || 0,
      nextReviewDate: storedWord.nextReviewDate ?? word.nextReviewDate ?? null,
      errorCount: Number(storedWord.errorCount ?? word.errorCount) || 0,
      status: storedWord.status ?? word.status,
      createdAt: storedWord.createdAt ?? word.createdAt,
    };
  });
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
  }

  const availableIds = getRecommendedNewWords(
    words,
    settings.activeCategories,
  ).map((word) => word.id);

  if (nextState.newWordsPausedToday) {
    nextState.assignedNewWordIds = [];
    return nextState;
  }

  const assignedIds = (Array.isArray(nextState.assignedNewWordIds)
    ? nextState.assignedNewWordIds
    : []
  ).filter((wordId) => availableIds.includes(wordId));

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
  JSON.stringify(left?.assignedNewWordIds ?? []) ===
    JSON.stringify(right?.assignedNewWordIds ?? []);

function App() {
  const today = getTodayDateKey();

  const [settings, setSettings] = useLocalStorage(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS,
  );
  const [wordsProgress, setWordsProgress] = useLocalStorage(
    STORAGE_KEYS.wordsProgress,
    WORDS_DATA,
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

  useEffect(() => {
    setSettings((current) => ({ ...DEFAULT_SETTINGS, ...(current ?? {}) }));
    setWordsProgress((current) => mergeWordsWithDefaults(current));
    setGrammarProgress((current) =>
      current && typeof current === "object" ? current : {},
    );
    setCourseProgress((current) =>
      current && typeof current === "object" ? current : {},
    );
  }, [setCourseProgress, setGrammarProgress, setSettings, setWordsProgress]);

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

    return sortWordsForLearning(
      normalizedDailyState.assignedNewWordIds
        .map((wordId) => wordsMap.get(wordId))
        .filter(Boolean)
        .filter((word) => word.status === "new"),
    );
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
    const activityPatch = {
      totalActions: 1,
      reviewActions: isNewWord ? 0 : 1,
      newWordActions: isNewWord ? 1 : 0,
      knownActions: actionType === "know" ? 1 : 0,
      hardActions: actionType === "hard" ? 1 : 0,
      forgotActions: actionType === "forgot" ? 1 : 0,
      postponedActions: actionType === "postpone" ? 1 : 0,
      learnedActions:
        updatedWord.status === "learned" && targetWord.status !== "learned" ? 1 : 0,
    };

    setWordsProgress((currentWords) =>
      currentWords.map((word) => (word.id === wordId ? updatedWord : word)),
    );

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
    setWordsProgress(mergeWordsWithDefaults([]));
    setDailyState(createInitialDailyState(today));
    setGrammarProgress({});
    setCourseProgress({});
  };

  const exportAppData = () => ({
    [STORAGE_KEYS.wordsProgress]: wordsProgress,
    [STORAGE_KEYS.settings]: normalizedSettings,
    [STORAGE_KEYS.dailyState]: normalizedDailyState,
    [STORAGE_KEYS.grammarProgress]: grammarProgress,
    [STORAGE_KEYS.courseProgress]: courseProgress,
  });

  const importAppData = (payload) => {
    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid import payload");
    }

    const nextSettings = {
      ...DEFAULT_SETTINGS,
      ...(payload[STORAGE_KEYS.settings] ?? normalizedSettings),
    };
    const nextWords = mergeWordsWithDefaults(
      payload[STORAGE_KEYS.wordsProgress] ?? wordsProgress,
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

    setSettings(nextSettings);
    setWordsProgress(nextWords);
    setDailyState(nextDailyState);
    setGrammarProgress(nextGrammarProgress);
    setCourseProgress(nextCourseProgress);
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
    checkCourseAnswer,
    checkGrammarAnswer,
    courseLessons: COURSE_LESSONS,
    courseProgress,
    courseStats,
    selectCourseAnswer,
    dailyState: normalizedDailyState,
    dueWords,
    dailyPhrases,
    exportAppData,
    categoryInsights,
    grammarLessons: GRAMMAR_LESSONS,
    grammarProgress,
    handleWordAction,
    importAppData,
    pauseNewWordsForToday,
    phraseOfDay,
    recordPracticeResult,
    resetProgress,
    toggleCourseSample,
    selectGrammarAnswer,
    settings: normalizedSettings,
    studyInsights,
    stats,
    todayNewWords,
    updateCourseWriting,
    updateSettings,
    weakWords,
    wordsProgress,
    markCourseLessonComplete,
  };

  return (
    <Routes>
      <Route element={<AppLayout appContext={appContext} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/course" element={<Course />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/review" element={<Review />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/mistakes" element={<Mistakes />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
