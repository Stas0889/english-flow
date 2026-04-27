const CATEGORY_WEIGHTS = {
  "Basic A1": 3,
  "Client Communication": 3,
  Webflow: 2,
  Design: 2,
};

const CATEGORY_PRIORITY = {
  "Basic A1": 40,
  "Client Communication": 34,
  Webflow: 24,
  Design: 20,
};

const HIGH_FREQUENCY_WORDS = new Set([
  "hello",
  "today",
  "help",
  "page",
  "text",
  "image",
  "color",
  "button",
  "menu",
  "form",
  "link",
  "client",
  "task",
  "project",
  "update",
  "send",
  "reply",
  "confirm",
  "issue",
  "fix",
  "call",
  "meeting",
  "approve",
  "feedback",
  "deadline",
  "section",
  "container",
  "grid",
  "class",
  "component",
  "style",
  "layout",
  "spacing",
  "contrast",
  "font",
  "responsive",
  "publish",
  "cms",
  "collection",
  "content",
  "access",
  "file",
  "headline",
  "mobile",
  "review",
  "message",
]);

const MEDIUM_FREQUENCY_WORDS = new Set([
  "hero",
  "template",
  "breakpoint",
  "navbar",
  "slug",
  "revision",
  "invoice",
  "status",
  "available",
  "support",
  "service",
  "screen",
  "share",
  "save",
  "check",
  "complete",
  "important",
  "simple",
  "useful",
  "manager",
  "customer",
  "computer",
  "language",
  "laptop",
  "guide",
  "practice",
  "quality",
  "tool",
  "website",
]);

const normalizeWord = (value = "") => String(value).trim().toLowerCase();

const deterministicHash = (value = "") => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 1000003;
  }

  return hash;
};

const getSourcePriority = (word) => {
  if (!word?.id) {
    return 0;
  }

  if (
    word.id.startsWith("basic-") ||
    word.id.startsWith("webflow-") ||
    word.id.startsWith("design-") ||
    word.id.startsWith("comm-")
  ) {
    return 220;
  }

  if (word.id.startsWith("seed-basic")) {
    return 170;
  }

  if (word.id.startsWith("seed-client-communication")) {
    return 160;
  }

  if (word.id.startsWith("seed-webflow")) {
    return 145;
  }

  if (word.id.startsWith("pair-client-communication")) {
    return 120;
  }

  if (word.id.startsWith("pair-design")) {
    return 105;
  }

  if (word.id.startsWith("pair-webflow")) {
    return 95;
  }

  return 80;
};

const getWordFrequencyPriority = (word) => {
  const normalizedWord = normalizeWord(word.word);

  if (HIGH_FREQUENCY_WORDS.has(normalizedWord)) {
    return 120;
  }

  if (MEDIUM_FREQUENCY_WORDS.has(normalizedWord)) {
    return 70;
  }

  return 0;
};

const getStructurePriority = (word) => {
  const normalizedWord = normalizeWord(word.word);
  const tokenCount = normalizedWord.split(/\s+/).filter(Boolean).length;
  const hyphenCount = (normalizedWord.match(/-/g) || []).length;

  let score = tokenCount === 1 ? 40 : 12;

  if (normalizedWord.length <= 6) {
    score += 14;
  } else if (normalizedWord.length <= 10) {
    score += 8;
  }

  if (hyphenCount > 0) {
    score -= 6;
  }

  return score;
};

export const getWordLearningScore = (word) =>
  getSourcePriority(word) +
  (CATEGORY_PRIORITY[word.category] || 0) +
  getWordFrequencyPriority(word) +
  getStructurePriority(word);

export const sortWordsForLearning = (words) =>
  [...words].sort((left, right) => {
    const scoreDelta = getWordLearningScore(right) - getWordLearningScore(left);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    const hashDelta =
      deterministicHash(String(left.id || left.word)) -
      deterministicHash(String(right.id || right.word));

    if (hashDelta !== 0) {
      return hashDelta;
    }

    return String(left.word).localeCompare(String(right.word));
  });

export const getRecommendedNewWords = (
  words,
  activeCategories = [],
  limit = Number.POSITIVE_INFINITY,
) => {
  const activeSet = new Set(activeCategories);
  const categoryQueues = new Map();

  activeCategories.forEach((category) => {
    const categoryWords = sortWordsForLearning(
      words.filter(
        (word) => word.status === "new" && activeSet.has(word.category),
      ),
    );
    categoryQueues.set(category, categoryWords);
  });

  const pickedWords = [];
  const pickedIds = new Set();
  const maxRounds = Math.max(
    1,
    ...activeCategories.map((category) => CATEGORY_WEIGHTS[category] || 1),
  );

  for (let round = 0; round < maxRounds && pickedWords.length < limit; round += 1) {
    let addedInRound = false;

    for (const category of activeCategories) {
      if (round >= (CATEGORY_WEIGHTS[category] || 1)) {
        continue;
      }

      const queue = categoryQueues.get(category) || [];
      const nextWord = queue.find((word) => !pickedIds.has(word.id));

      if (!nextWord) {
        continue;
      }

      pickedWords.push(nextWord);
      pickedIds.add(nextWord.id);
      addedInRound = true;

      if (pickedWords.length >= limit) {
        break;
      }
    }

    if (!addedInRound) {
      break;
    }
  }

  if (pickedWords.length >= limit) {
    return pickedWords.slice(0, limit);
  }

  const remainingWords = sortWordsForLearning(
    words.filter(
      (word) =>
        word.status === "new" &&
        activeSet.has(word.category) &&
        !pickedIds.has(word.id),
    ),
  );

  return [...pickedWords, ...remainingWords].slice(0, limit);
};

export default getRecommendedNewWords;
