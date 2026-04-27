import { addDays, getTodayDateKey, parseDateKey } from "./dates";

const ACTIVITY_FIELDS = [
  "totalActions",
  "reviewActions",
  "newWordActions",
  "practiceActions",
  "correctPracticeActions",
  "wordQuizActions",
  "phraseBuilderActions",
  "communicationActions",
  "knownActions",
  "hardActions",
  "forgotActions",
  "postponedActions",
  "learnedActions",
];

const createEmptyActivity = (date) => ({
  date,
  totalActions: 0,
  reviewActions: 0,
  newWordActions: 0,
  practiceActions: 0,
  correctPracticeActions: 0,
  wordQuizActions: 0,
  phraseBuilderActions: 0,
  communicationActions: 0,
  knownActions: 0,
  hardActions: 0,
  forgotActions: 0,
  postponedActions: 0,
  learnedActions: 0,
});

const normalizeNumber = (value) => Math.max(0, Number(value) || 0);

export const normalizeActivityLog = (activityLog) => {
  const safeLog = Array.isArray(activityLog) ? activityLog : [];
  const merged = new Map();

  safeLog.forEach((entry) => {
    if (!entry?.date) {
      return;
    }

    const existing = merged.get(entry.date) ?? createEmptyActivity(entry.date);
    const nextEntry = { ...existing, date: entry.date };

    ACTIVITY_FIELDS.forEach((field) => {
      nextEntry[field] =
        normalizeNumber(existing[field]) + normalizeNumber(entry[field]);
    });

    merged.set(entry.date, nextEntry);
  });

  return Array.from(merged.values())
    .filter((entry) => entry.totalActions > 0)
    .sort((left, right) => left.date.localeCompare(right.date))
    .slice(-365);
};

export const updateActivityLog = (activityLog, date, patch) => {
  const normalized = normalizeActivityLog(activityLog);
  const map = new Map(normalized.map((entry) => [entry.date, entry]));
  const current = map.get(date) ?? createEmptyActivity(date);
  const nextEntry = { ...current, date };

  ACTIVITY_FIELDS.forEach((field) => {
    nextEntry[field] =
      normalizeNumber(current[field]) + normalizeNumber(patch?.[field]);
  });

  map.set(date, nextEntry);

  return normalizeActivityLog(Array.from(map.values()));
};

const formatShortDate = (dateKey) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
  }).format(parseDateKey(dateKey));

export const getStudyInsights = (
  activityLog,
  today = getTodayDateKey(),
  windowSize = 7,
) => {
  const normalized = normalizeActivityLog(activityLog);
  const entriesByDate = new Map(normalized.map((entry) => [entry.date, entry]));
  const todayActivity = entriesByDate.get(today) ?? createEmptyActivity(today);

  let streakDays = 0;
  let cursor = today;

  while ((entriesByDate.get(cursor)?.totalActions || 0) > 0) {
    streakDays += 1;
    cursor = addDays(cursor, -1);
  }

  const recentWindow = Array.from({ length: windowSize }, (_, index) => {
    const date = addDays(today, index - (windowSize - 1));
    const entry = entriesByDate.get(date) ?? createEmptyActivity(date);

    return {
      ...entry,
      label: formatShortDate(date),
    };
  });

  const totalActionsLast7Days = recentWindow.reduce(
    (sum, entry) => sum + normalizeNumber(entry.totalActions),
    0,
  );
  const activeDaysLast7Days = recentWindow.filter(
    (entry) => entry.totalActions > 0,
  ).length;

  return {
    todayActivity,
    streakDays,
    totalStudyDays: normalized.length,
    totalActionsLast7Days,
    activeDaysLast7Days,
    recentWindow,
  };
};

export const getWeakWords = (words, limit = 5) =>
  words
    .filter(
      (word) =>
        (word.errorCount || 0) > 0 &&
        word.status !== "backlog" &&
        word.status !== "learned",
    )
    .sort((left, right) => {
      const errorDelta = (right.errorCount || 0) - (left.errorCount || 0);
      if (errorDelta !== 0) {
        return errorDelta;
      }

      const leftIsMistake = left.status === "mistake" ? 1 : 0;
      const rightIsMistake = right.status === "mistake" ? 1 : 0;
      if (rightIsMistake !== leftIsMistake) {
        return rightIsMistake - leftIsMistake;
      }

      return String(left.word).localeCompare(String(right.word));
    })
    .slice(0, limit);

export const getCategoryInsights = (words, activeCategories = []) => {
  const categories = Array.from(
    new Set([...activeCategories, ...words.map((word) => word.category)]),
  );

  return categories
    .map((category) => {
      const categoryWords = words.filter((word) => word.category === category);
      const total = categoryWords.length;
      const learned = categoryWords.filter(
        (word) => word.status === "learned",
      ).length;
      const mistakes = categoryWords.filter(
        (word) => (word.errorCount || 0) > 0,
      ).length;
      const reviewing = categoryWords.filter(
        (word) =>
          word.status === "reviewing" ||
          word.status === "mistake" ||
          (Boolean(word.nextReviewDate) &&
            word.status !== "learned" &&
            word.status !== "backlog"),
      ).length;
      const newWords = categoryWords.filter((word) => word.status === "new").length;
      const completionPercent = total ? Math.round((learned / total) * 100) : 0;

      return {
        category,
        total,
        learned,
        mistakes,
        reviewing,
        newWords,
        completionPercent,
        isActive: activeCategories.includes(category),
      };
    })
    .sort((left, right) => right.total - left.total);
};

export const getDailyPhraseSet = (
  phrases,
  today = getTodayDateKey(),
  activeCategories = [],
  size = 3,
) => {
  const safePhrases = Array.isArray(phrases) ? phrases : [];
  if (!safePhrases.length) {
    return [];
  }

  const filtered =
    activeCategories.length > 0
      ? safePhrases.filter((phrase) => activeCategories.includes(phrase.category))
      : safePhrases;
  const source = filtered.length ? filtered : safePhrases;

  const baseIndex =
    Math.abs(Math.floor(parseDateKey(today).getTime() / 86400000)) % source.length;

  return Array.from({ length: Math.min(size, source.length) }, (_, index) => {
    const phraseIndex = (baseIndex + index) % source.length;
    return source[phraseIndex];
  });
};
