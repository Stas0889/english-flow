import { addDays, getTodayDateKey } from "./dates";

export const REVIEW_INTERVALS = [0, 1, 3, 7, 14, 30];
export const LAST_REVIEW_STAGE = REVIEW_INTERVALS.length - 1;

export const getNextReviewDateForStage = (
  stage,
  referenceDate = getTodayDateKey(),
) => {
  if (stage < 0 || stage > LAST_REVIEW_STAGE) {
    return null;
  }

  return addDays(referenceDate, REVIEW_INTERVALS[stage]);
};

export const applySrsAction = (
  word,
  actionType,
  referenceDate = getTodayDateKey(),
) => {
  const safeWord = {
    ...word,
    reviewStage: Number(word.reviewStage) || 0,
    errorCount: Number(word.errorCount) || 0,
  };

  switch (actionType) {
    case "know": {
      const nextStage = safeWord.reviewStage + 1;

      if (nextStage > LAST_REVIEW_STAGE) {
        return {
          updatedWord: {
            ...safeWord,
            reviewStage: nextStage,
            nextReviewDate: null,
            status: "learned",
          },
          completedReviewsDelta: 1,
        };
      }

      return {
        updatedWord: {
          ...safeWord,
          reviewStage: nextStage,
          nextReviewDate: getNextReviewDateForStage(nextStage, referenceDate),
          status: "reviewing",
        },
        completedReviewsDelta: 1,
      };
    }
    case "hard":
      return {
        updatedWord: {
          ...safeWord,
          errorCount: safeWord.errorCount + 1,
          nextReviewDate: addDays(referenceDate, 1),
          status: "mistake",
        },
        completedReviewsDelta: 0,
      };
    case "forgot":
      return {
        updatedWord: {
          ...safeWord,
          errorCount: safeWord.errorCount + 1,
          reviewStage: 1,
          nextReviewDate: addDays(referenceDate, 1),
          status: "mistake",
        },
        completedReviewsDelta: 0,
      };
    case "postpone":
      return {
        updatedWord: {
          ...safeWord,
          status: "backlog",
          nextReviewDate: null,
        },
        completedReviewsDelta: 0,
      };
    case "reviewNow":
      return {
        updatedWord: {
          ...safeWord,
          nextReviewDate: referenceDate,
          status: "reviewing",
        },
        completedReviewsDelta: 0,
      };
    default:
      return {
        updatedWord: safeWord,
        completedReviewsDelta: 0,
      };
  }
};
