const normalizeWhitespace = (value = "") =>
  String(value).replace(/\s+/g, " ").trim();

export const shuffleItems = (items) => {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextItems[index], nextItems[swapIndex]] = [
      nextItems[swapIndex],
      nextItems[index],
    ];
  }

  return nextItems;
};

export const getUniqueWords = (words) => {
  const seenIds = new Set();
  return words.filter((word) => {
    if (!word?.id || seenIds.has(word.id)) {
      return false;
    }

    seenIds.add(word.id);
    return true;
  });
};

const getTranslationDistractors = (words, targetWord) => {
  const sameCategory = words.filter(
    (word) =>
      word.id !== targetWord.id &&
      word.category === targetWord.category &&
      word.translation !== targetWord.translation,
  );
  const fallback = words.filter(
    (word) =>
      word.id !== targetWord.id && word.translation !== targetWord.translation,
  );
  const uniqueByTranslation = [];
  const seenTranslations = new Set();

  [...sameCategory, ...fallback].forEach((word) => {
    const translationKey = normalizeWhitespace(word.translation).toLowerCase();
    if (!translationKey || seenTranslations.has(translationKey)) {
      return;
    }

    seenTranslations.add(translationKey);
    uniqueByTranslation.push(word);
  });

  return uniqueByTranslation.slice(0, 3);
};

const getWordDistractors = (words, targetWord) => {
  const sameCategory = words.filter(
    (word) =>
      word.id !== targetWord.id &&
      word.category === targetWord.category &&
      word.word !== targetWord.word,
  );
  const fallback = words.filter(
    (word) => word.id !== targetWord.id && word.word !== targetWord.word,
  );
  const uniqueByWord = [];
  const seenWords = new Set();

  [...sameCategory, ...fallback].forEach((word) => {
    const wordKey = normalizeWhitespace(word.word).toLowerCase();
    if (!wordKey || seenWords.has(wordKey)) {
      return;
    }

    seenWords.add(wordKey);
    uniqueByWord.push(word);
  });

  return uniqueByWord.slice(0, 3);
};

export const buildWordQuizQuestion = (words, index = 0, direction = "en-ru") => {
  if (!Array.isArray(words) || !words.length) {
    return null;
  }

  const targetWord = words[index % words.length];
  const isReverseMode = direction === "ru-en";
  const distractors = isReverseMode
    ? getWordDistractors(words, targetWord)
    : getTranslationDistractors(words, targetWord);
  const correctAnswer = isReverseMode ? targetWord.word : targetWord.translation;
  const options = shuffleItems([
    correctAnswer,
    ...distractors.map((word) =>
      isReverseMode ? word.word : word.translation,
    ),
  ]);

  return {
    id: `${targetWord.id}-quiz-${direction}-${index}`,
    direction,
    targetWord,
    options,
    correctAnswer,
  };
};

export const buildPhraseBuilderExercise = (phrases, index = 0) => {
  if (!Array.isArray(phrases) || !phrases.length) {
    return null;
  }

  const phrase = phrases[index % phrases.length];
  const tokens = phrase.phrase.split(" ").map((token, tokenIndex) => ({
    id: `${phrase.id}-token-${tokenIndex}`,
    label: token,
  }));

  return {
    id: `${phrase.id}-builder-${index}`,
    phrase,
    shuffledTokens: shuffleItems(tokens),
  };
};

export const isPhraseBuilderCorrect = (tokens, phraseText) =>
  normalizeWhitespace(tokens.map((token) => token.label).join(" ")) ===
  normalizeWhitespace(phraseText);

export const buildScenarioQuestion = (scenarios, index = 0) => {
  if (!Array.isArray(scenarios) || !scenarios.length) {
    return null;
  }

  const scenario = scenarios[index % scenarios.length];

  return {
    ...scenario,
    options: shuffleItems(scenario.options),
  };
};
