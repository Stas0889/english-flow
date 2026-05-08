import WORDS_DATA from "../data/words.js";

const hasOwn = Object.prototype.hasOwnProperty;

const createWordDefaultsMap = (customWords = []) =>
  new Map(
    [...WORDS_DATA, ...(Array.isArray(customWords) ? customWords : [])].map(
      (word) => [word.id, word],
    ),
  );

const normalizeNumber = (value, fallback = 0) => Number(value ?? fallback) || 0;

const getDefaultWord = (wordId, wordDefaultsMap = createWordDefaultsMap()) =>
  wordDefaultsMap.get(wordId) ?? {
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

export const createWordsProgressSnapshot = (words, customWords = []) => {
  const safeWords = Array.isArray(words) ? words : [];
  const wordDefaultsMap = createWordDefaultsMap(customWords);
  const snapshot = {};

  safeWords.forEach((word) => {
    if (!word?.id || !wordDefaultsMap.has(word.id)) {
      return;
    }

    const compactEntry = compactProgressEntry(
      word,
      getDefaultWord(word.id, wordDefaultsMap),
    );

    if (Object.keys(compactEntry).length > 0) {
      snapshot[word.id] = compactEntry;
    }
  });

  return snapshot;
};

export const normalizeStoredWordsProgress = (storedProgress, customWords = []) => {
  if (Array.isArray(storedProgress)) {
    return createWordsProgressSnapshot(storedProgress, customWords);
  }

  if (!storedProgress || typeof storedProgress !== "object") {
    return {};
  }

  const wordDefaultsMap = createWordDefaultsMap(customWords);
  const normalizedSnapshot = {};

  Object.entries(storedProgress).forEach(([wordId, storedEntry]) => {
    if (!wordDefaultsMap.has(wordId)) {
      return;
    }

    const compactEntry = compactProgressEntry(
      storedEntry && typeof storedEntry === "object" ? storedEntry : {},
      getDefaultWord(wordId, wordDefaultsMap),
    );

    if (Object.keys(compactEntry).length > 0) {
      normalizedSnapshot[wordId] = compactEntry;
    }
  });

  return normalizedSnapshot;
};

export const mergeWordsWithDefaults = (storedProgress, customWords = []) => {
  const safeCustomWords = Array.isArray(customWords) ? customWords : [];
  const normalizedSnapshot = normalizeStoredWordsProgress(
    storedProgress,
    safeCustomWords,
  );

  return [...WORDS_DATA, ...safeCustomWords].map((word) => {
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
