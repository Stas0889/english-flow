import { getTodayDateKey } from "./dates.js";

const normalizeText = (value = "") => String(value).replace(/\s+/g, " ").trim();

const normalizeKey = (value = "") => normalizeText(value).toLowerCase();

const slugify = (value = "") =>
  normalizeKey(value)
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

const createFallbackMnemonic = (word, translation) =>
  `${word} связано с переводом «${translation}». Проговори слово вслух и представь рабочую ситуацию, где тебе нужно использовать именно это слово.`;

const createFallbackDetails = (word, translation) => ({
  lead: `Это пользовательское слово: ${word} (${translation}).`,
  phoneticTitle: "Как запоминать",
  phonetic: [
    {
      label: word,
      text: "Произнеси слово вслух несколько раз и свяжи звучание с конкретной рабочей ситуацией.",
    },
    {
      label: translation,
      text: `Главный смысл слова: ${translation}.`,
    },
  ],
  storyTitle: "Сюжет",
  story: `Представь, что в переписке с клиентом тебе срочно нужно использовать слово ${word}.`,
  visualTitle: "Визуальный образ",
  visual: `На экране открыта карточка слова ${word}, рядом перевод «${translation}» и короткий пример.`,
  noteTitle: "Короткая формула",
  note: `${word} = ${translation}.`,
});

export const normalizeCustomWords = (customWords) => {
  if (!Array.isArray(customWords)) {
    return [];
  }

  const seenIds = new Set();

  return customWords
    .filter((word) => word && typeof word === "object")
    .map((word) => {
      const normalizedWord = normalizeText(word.word);
      const normalizedTranslation = normalizeText(word.translation);
      const id =
        normalizeText(word.id) ||
        `custom-${slugify(normalizedWord)}-${Date.now().toString(36)}`;

      return {
        id,
        word: normalizedWord,
        translation: normalizedTranslation,
        transcription: normalizeText(word.transcription) || "/custom/",
        audioText: normalizeText(word.audioText) || normalizedWord,
        example:
          normalizeText(word.example) || `I want to use "${normalizedWord}" today.`,
        exampleTranslation:
          normalizeText(word.exampleTranslation) ||
          `Я хочу использовать «${normalizedTranslation}» сегодня.`,
        workExample:
          normalizeText(word.workExample) ||
          `I need to use "${normalizedWord}" in a client message.`,
        workExampleTranslation:
          normalizeText(word.workExampleTranslation) ||
          `Мне нужно использовать «${normalizedTranslation}» в сообщении клиенту.`,
        image: normalizeText(word.image) || "✍️",
        imagePrompt:
          normalizeText(word.imagePrompt) ||
          `Simple visual mnemonic for ${normalizedWord}`,
        mnemonic:
          normalizeText(word.mnemonic) ||
          createFallbackMnemonic(normalizedWord, normalizedTranslation),
        mnemonicDetails:
          word.mnemonicDetails ||
          createFallbackDetails(normalizedWord, normalizedTranslation),
        category: normalizeText(word.category) || "Custom",
        level: normalizeText(word.level) || "A1",
        difficulty: normalizeText(word.difficulty) || "medium",
        reviewStage: Number(word.reviewStage) || 0,
        nextReviewDate:
          Object.prototype.hasOwnProperty.call(word, "nextReviewDate")
            ? word.nextReviewDate
            : getTodayDateKey(),
        errorCount: Number(word.errorCount) || 0,
        status: normalizeText(word.status) || "reviewing",
        createdAt: normalizeText(word.createdAt) || getTodayDateKey(),
        source: "custom",
      };
    })
    .filter((word) => {
      const key = normalizeKey(word.word);
      if (!key || !word.translation || seenIds.has(word.id)) {
        return false;
      }

      seenIds.add(word.id);
      return true;
    });
};

export const createCustomWord = ({
  word,
  translation,
  transcription,
  category,
  level,
  example,
  exampleTranslation,
  workExample,
  workExampleTranslation,
  mnemonic,
}) => {
  const normalizedWord = normalizeText(word);
  const normalizedTranslation = normalizeText(translation);
  const today = getTodayDateKey();

  return normalizeCustomWords([
    {
      id: `custom-${slugify(normalizedWord)}-${Date.now().toString(36)}`,
      word: normalizedWord,
      translation: normalizedTranslation,
      transcription,
      audioText: normalizedWord,
      example,
      exampleTranslation,
      workExample,
      workExampleTranslation,
      image: "✍️",
      imagePrompt: `User added word ${normalizedWord}`,
      mnemonic:
        normalizeText(mnemonic) ||
        createFallbackMnemonic(normalizedWord, normalizedTranslation),
      mnemonicDetails: createFallbackDetails(normalizedWord, normalizedTranslation),
      category: category || "Custom",
      level: level || "A1",
      difficulty: "medium",
      reviewStage: 0,
      nextReviewDate: today,
      errorCount: 0,
      status: "reviewing",
      createdAt: today,
      source: "custom",
    },
  ])[0];
};

export const findWordByText = (words, query) => {
  const normalizedQuery = normalizeKey(query);

  if (!normalizedQuery) {
    return null;
  }

  return (
    words.find((word) => normalizeKey(word.word) === normalizedQuery) ||
    words.find((word) => normalizeKey(word.translation) === normalizedQuery) ||
    null
  );
};
