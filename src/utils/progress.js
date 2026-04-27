import { getTodayDateKey, isDueTodayOrPast } from "./dates";

export const getDueWords = (words, referenceDate = getTodayDateKey()) =>
  words
    .filter(
      (word) =>
        Boolean(word.nextReviewDate) &&
        word.status !== "backlog" &&
        isDueTodayOrPast(word.nextReviewDate, referenceDate),
    )
    .sort((left, right) => {
      const dateCompare = String(left.nextReviewDate).localeCompare(
        String(right.nextReviewDate),
      );

      if (dateCompare !== 0) {
        return dateCompare;
      }

      return (right.errorCount || 0) - (left.errorCount || 0);
    });

export const getWordStatusLabel = (word) => {
  if (word.status === "learned") {
    return "Выучено";
  }

  if (word.status === "backlog") {
    return "Отложено";
  }

  if (word.status === "mistake") {
    return "Ошибка";
  }

  if (word.status === "reviewing" || word.nextReviewDate) {
    return "Повторение";
  }

  return "Новое";
};

export const getProgressSummary = (words, completedReviews = 0) => {
  const newWords = words.filter((word) => word.status === "new").length;
  const learnedWords = words.filter((word) => word.status === "learned").length;
  const backlogWords = words.filter((word) => word.status === "backlog").length;
  const mistakeWords = words.filter((word) => (word.errorCount || 0) > 0).length;
  const reviewingWords = words.filter(
    (word) =>
      word.status === "reviewing" ||
      word.status === "mistake" ||
      (Boolean(word.nextReviewDate) &&
        word.status !== "learned" &&
        word.status !== "backlog"),
  ).length;

  return {
    totalWords: words.length,
    newWords,
    reviewingWords,
    learnedWords,
    mistakeWords,
    backlogWords,
    completedReviews,
  };
};
