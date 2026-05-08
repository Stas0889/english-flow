import WORDS_DATA from "../data/words.js";

const hasOwn = Object.prototype.hasOwnProperty;

const WORD_DEFAULTS_MAP = new Map(WORDS_DATA.map((word) => [word.id, word]));

const normalizeNumber = (value, fallback = 0) => Number(value ?? fallback) || 0;

const getDefaultWord = (wordId) =>
  WORD_DEFAULTS_MAP.get(wordId) ?? {
    reviewStage: 0,
    nextReviewDate: null,
    errorCount: 0,
    status: "new",
  };

const compactProgressEntry = (sourceEntry = {}, defaultWord = {}) => {
  const reviewStage = normalizeNumber(
    sourceEntry.reviewStage,
    defaultWord.reviewStage ?? 0,
  );
  const nextReviewDate = hasOwn.call(sourceEntry, "nextReviewDate")
    ? sourceEntry.nextReviewDate ?? null
    : defaultWord.nextReviewDate ?? null;
  const errorCount = normalizeNumber(
    sourceEntry.errorCount,
    defaultWord.errorCount ?? 0,
  );
  const status = sourceEntry.status ?? defaultWord.status ?? "new";

  const compactEntry = {};

  if (reviewStage !== normalizeNumber(defaultWord.reviewStage, 0)) {
    compactEntry.reviewStage = reviewStage;
  }

  if (nextReviewDate !== (defaultWord.nextReviewDate ?? null)) {
    compactEntry.nextReviewDate = nextReviewDate;
  }

  if (errorCount !== normalizeNumber(defaultWord.errorCount, 0)) {
    compactEntry.errorCount = errorCount;
  }

  if (status !== (defaultWord.status ?? "new")) {
    compactEntry.status = status;
  }

  return compactEntry;
};

export const createWordsProgressSnapshot = (words) => {
  const safeWords = Array.isArray(words) ? words : [];
  const snapshot = {};

  safeWords.forEach((word) => {
    if (!word?.id || !WORD_DEFAULTS_MAP.has(word.id)) {
      return;
    }

    const compactEntry = compactProgressEntry(word, getDefaultWord(word.id));

    if (Object.keys(compactEntry).length > 0) {
      snapshot[word.id] = compactEntry;
    }
  });

  return snapshot;
};

export const normalizeStoredWordsProgress = (storedProgress) => {
  if (Array.isArray(storedProgress)) {
    return createWordsProgressSnapshot(storedProgress);
  }

  if (!storedProgress || typeof storedProgress !== "object") {
    return {};
  }

  const normalizedSnapshot = {};

  Object.entries(storedProgress).forEach(([wordId, storedEntry]) => {
    if (!WORD_DEFAULTS_MAP.has(wordId)) {
      return;
    }

    const compactEntry = compactProgressEntry(
      storedEntry && typeof storedEntry === "object" ? storedEntry : {},
      getDefaultWord(wordId),
    );

    if (Object.keys(compactEntry).length > 0) {
      normalizedSnapshot[wordId] = compactEntry;
    }
  });

  return normalizedSnapshot;
};

export const mergeWordsWithDefaults = (storedProgress) => {
  const normalizedSnapshot = normalizeStoredWordsProgress(storedProgress);

  return WORDS_DATA.map((word) => {
    const storedEntry = normalizedSnapshot[word.id] ?? {};

    return {
      ...word,
      reviewStage: normalizeNumber(storedEntry.reviewStage, word.reviewStage),
      nextReviewDate: hasOwn.call(storedEntry, "nextReviewDate")
        ? storedEntry.nextReviewDate
        : word.nextReviewDate ?? null,
      errorCount: normalizeNumber(storedEntry.errorCount, word.errorCount),
      status: storedEntry.status ?? word.status,
    };
  });
};

export default mergeWordsWithDefaults;
