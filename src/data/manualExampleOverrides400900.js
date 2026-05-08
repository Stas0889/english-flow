import { BATCH_400_MNEMONIC_DETAILS } from "./manualBatch400.js";
import { BATCH_500_MNEMONIC_DETAILS } from "./manualBatch500.js";
import { BATCH_600_MNEMONIC_DETAILS } from "./manualBatch600.js";
import { BATCH_700_MNEMONIC_DETAILS } from "./manualBatch700.js";
import { BATCH_800_MNEMONIC_DETAILS } from "./manualBatch800.js";
import { BATCH_900_MNEMONIC_DETAILS } from "./manualBatch900.js";

const BATCH_DETAILS = {
  ...BATCH_400_MNEMONIC_DETAILS,
  ...BATCH_500_MNEMONIC_DETAILS,
  ...BATCH_600_MNEMONIC_DETAILS,
  ...BATCH_700_MNEMONIC_DETAILS,
  ...BATCH_800_MNEMONIC_DETAILS,
  ...BATCH_900_MNEMONIC_DETAILS,
};

const ABSTRACT_WORDS = new Set([
  "advice",
  "activity",
  "balance",
  "care",
  "chance",
  "choice",
  "community",
  "condition",
  "conversation",
  "culture",
  "danger",
  "decision",
  "difference",
  "direction",
  "distance",
  "dream",
  "education",
  "effort",
  "energy",
  "environment",
  "event",
  "experience",
  "fashion",
  "fear",
  "future",
  "habit",
  "history",
  "idea",
  "information",
  "interest",
  "journey",
  "knowledge",
  "language",
  "matter",
  "memory",
  "nature",
  "practice",
  "quality",
  "science",
  "service",
  "signal",
  "skill",
  "success",
  "support",
  "surprise",
  "weather",
  "world",
]);

const VISUAL_WORDS = new Set([
  "beach",
  "boat",
  "bottle",
  "box",
  "bridge",
  "cafe",
  "camp",
  "church",
  "clothes",
  "coast",
  "factory",
  "farm",
  "festival",
  "field",
  "fire",
  "fish",
  "flight",
  "flower",
  "forest",
  "garden",
  "hospital",
  "island",
  "jacket",
  "kitchen",
  "lake",
  "laptop",
  "library",
  "machine",
  "magazine",
  "map",
  "mirror",
  "mountain",
  "movie",
  "museum",
  "newspaper",
  "ocean",
  "package",
  "park",
  "passport",
  "restaurant",
  "river",
  "road",
  "screen",
  "ship",
  "shirt",
  "shower",
  "snow",
  "station",
  "street",
  "suitcase",
  "telephone",
  "theater",
  "ticket",
  "tree",
  "village",
  "wallet",
  "wheel",
]);

const ACTION_WORDS = new Set([
  "accept",
  "begin",
  "believe",
  "carry",
  "catch",
  "check",
  "collect",
  "compare",
  "complete",
  "cover",
  "create",
  "discover",
  "include",
  "invite",
  "keep",
  "notice",
  "offer",
  "prepare",
  "protect",
  "reach",
  "recycle",
  "remember",
  "repeat",
  "save",
  "share",
  "solve",
  "understand",
  "wash",
]);

const SPECIAL_SINGLE_OVERRIDES = {
  accept: {
    example: "We need to accept this today.",
    exampleTranslation: "Нам нужно принять это сегодня.",
    workExample: "Please accept this before the client call.",
    workExampleTranslation: "Пожалуйста, прими это до созвона с клиентом.",
  },
  arrive: {
    example: "The client will arrive at ten.",
    exampleTranslation: "Клиент прибудет в десять.",
    workExample: "The client will arrive before the project review.",
    workExampleTranslation: "Клиент прибудет до ревью проекта.",
  },
  happen: {
    example: "Mistakes can happen.",
    exampleTranslation: "Ошибки могут случаться.",
    workExample: "Small layout issues can happen after a CMS update.",
    workExampleTranslation:
      "Небольшие проблемы с макетом могут случиться после обновления CMS.",
  },
  jump: {
    example: "Do not jump too fast.",
    exampleTranslation: "Не прыгай слишком быстро.",
    workExample: "The layout should not jump when the image loads.",
    workExampleTranslation:
      "Макет не должен прыгать, когда загружается изображение.",
  },
  relax: {
    example: "Try to relax.",
    exampleTranslation: "Попробуй расслабиться.",
    workExample: "Use more spacing so the page feels relaxed.",
    workExampleTranslation:
      "Добавь больше отступов, чтобы страница ощущалась спокойнее.",
  },
  effort: {
    example: "Effort is important here.",
    exampleTranslation: "Здесь важно усилие.",
    workExample: "This project needs more effort.",
    workExampleTranslation: "Этому проекту нужно больше усилий.",
  },
  advice: {
    example: "I need your advice.",
    exampleTranslation: "Мне нужен твой совет.",
    workExample: "I need your advice on the mobile layout.",
    workExampleTranslation: "Мне нужен твой совет по мобильному макету.",
  },
  condition: {
    example: "This condition is important.",
    exampleTranslation: "Это условие важно.",
    workExample: "Check this condition before the form is published.",
    workExampleTranslation: "Проверь это условие до публикации формы.",
  },
  conversation: {
    example: "This conversation is useful.",
    exampleTranslation: "Этот разговор полезен.",
    workExample: "Keep the client conversation polite and clear.",
    workExampleTranslation:
      "Сохраняй переписку с клиентом вежливой и понятной.",
  },
  danger: {
    example: "There is danger here.",
    exampleTranslation: "Здесь есть опасность.",
    workExample: "Use red only when there is real danger for the user.",
    workExampleTranslation:
      "Используй красный цвет только там, где для пользователя есть реальная опасность.",
  },
  decision: {
    example: "We need a decision.",
    exampleTranslation: "Нам нужно решение.",
    workExample: "We need a decision on the final layout today.",
    workExampleTranslation:
      "Сегодня нам нужно решение по финальному макету.",
  },
  difference: {
    example: "I can see the difference.",
    exampleTranslation: "Я вижу разницу.",
    workExample: "Show the difference between the old and new pricing cards.",
    workExampleTranslation:
      "Покажи разницу между старой и новой карточкой тарифов.",
  },
  education: {
    example: "Education is important.",
    exampleTranslation: "Образование важно.",
    workExample: "The education page should show lessons, prices, and results.",
    workExampleTranslation:
      "Страница обучения должна показывать уроки, цены и результаты.",
  },
  energy: {
    example: "This page has energy.",
    exampleTranslation: "У этой страницы есть энергия.",
    workExample: "The hero section needs more energy and a clearer headline.",
    workExampleTranslation:
      "Hero-секции нужно больше энергии и более понятный заголовок.",
  },
  environment: {
    example: "This environment is safe.",
    exampleTranslation: "Эта среда безопасна.",
    workExample: "Test the form in the staging environment before launch.",
    workExampleTranslation:
      "Проверь форму в staging-среде перед запуском.",
  },
  experience: {
    example: "Experience helps a lot.",
    exampleTranslation: "Опыт очень помогает.",
    workExample: "Improve the user experience on the checkout page.",
    workExampleTranslation:
      "Улучши пользовательский опыт на странице оплаты.",
  },
  fear: {
    example: "Fear can stop people.",
    exampleTranslation: "Страх может останавливать людей.",
    workExample: "A long payment form can create fear before checkout.",
    workExampleTranslation:
      "Длинная форма оплаты может вызвать страх перед оформлением заказа.",
  },
  information: {
    example: "This information is useful.",
    exampleTranslation: "Эта информация полезна.",
    workExample: "Put the contact information near the form.",
    workExampleTranslation:
      "Размести контактную информацию рядом с формой.",
  },
  memory: {
    example: "Memory gets better with practice.",
    exampleTranslation: "Память становится лучше с практикой.",
    workExample: "Use short review sessions to train memory.",
    workExampleTranslation:
      "Используй короткие сессии повторения, чтобы тренировать память.",
  },
  quality: {
    example: "Quality is important.",
    exampleTranslation: "Качество важно.",
    workExample: "Check the quality of the mobile version before launch.",
    workExampleTranslation:
      "Проверь качество мобильной версии перед запуском.",
  },
  quick: {
    example: "This is quick.",
    exampleTranslation: "Это быстро.",
    workExample: "Keep the client message quick.",
    workExampleTranslation: "Сделай сообщение клиенту коротким и быстрым.",
  },
  service: {
    example: "This service is helpful.",
    exampleTranslation: "Эта услуга полезна.",
    workExample: "Explain the service in one short paragraph.",
    workExampleTranslation:
      "Объясни услугу в одном коротком абзаце.",
  },
  skill: {
    example: "This skill takes time.",
    exampleTranslation: "Этот навык требует времени.",
    workExample: "Writing short client updates is an important skill.",
    workExampleTranslation:
      "Умение писать короткие обновления для клиента - важный навык.",
  },
  success: {
    example: "Success takes practice.",
    exampleTranslation: "Успех требует практики.",
    workExample: "Show a success message after the form is submitted.",
    workExampleTranslation:
      "Покажи сообщение об успехе после отправки формы.",
  },
  support: {
    example: "Support is available today.",
    exampleTranslation: "Поддержка доступна сегодня.",
    workExample: "Add a support link near the pricing section.",
    workExampleTranslation:
      "Добавь ссылку на поддержку рядом с секцией тарифов.",
  },
};

const ADJECTIVE_WORDS = new Set([
  "average",
  "beautiful",
  "best",
  "better",
  "deep",
  "early",
  "general",
  "hungry",
  "important",
  "inside",
  "natural",
  "nervous",
  "normal",
  "perfect",
  "popular",
  "public",
  "quick",
  "quiet",
  "safe",
  "simple",
  "social",
  "useful",
  "weak",
  "white",
  "yellow",
  "young",
]);

const RU_BY_WORD_OVERRIDES = {
  "balanced hierarchy": "сбалансированную иерархию",
  "balanced composition": "сбалансированную композицию",
  "balanced palette": "сбалансированную палитру",
  "balanced typography": "сбалансированную типографику",
  "balanced interface": "сбалансированный интерфейс",
  "balanced grid": "сбалансированную сетку",
  "balanced spacing": "сбалансированные отступы",
};

const extractTranslation = (word, details) => {
  const note = details?.note || "";
  const marker = `${word} = `;

  if (note.startsWith(marker)) {
    return note.slice(marker.length).replace(/\.$/, "").trim();
  }

  return word;
};

const cleanRuObject = (word, translation) =>
  RU_BY_WORD_OVERRIDES[word] || translation;

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const createPhraseOverride = (word, translation) => ({
  example: `This is the ${word}.`,
  exampleTranslation: `Это рабочий элемент: ${translation}.`,
  workExample: `Please review the ${word} before we send it to the client.`,
  workExampleTranslation: `Пожалуйста, проверь рабочий элемент «${translation}» перед отправкой клиенту.`,
});

const createSingleWordOverride = (word, translation) => {
  if (SPECIAL_SINGLE_OVERRIDES[word]) {
    return SPECIAL_SINGLE_OVERRIDES[word];
  }

  if (ACTION_WORDS.has(word)) {
    return {
      example: `We need to ${word} this today.`,
      exampleTranslation: `Сегодня нужно выполнить действие: «${translation}».`,
      workExample: `Please ${word} this before the client call.`,
      workExampleTranslation: `Пожалуйста, выполни действие «${translation}» до созвона с клиентом.`,
    };
  }

  if (ADJECTIVE_WORDS.has(word)) {
    return {
      example: `This is ${word}.`,
      exampleTranslation: `Это ${translation}.`,
      workExample: `Keep the client message ${word}.`,
      workExampleTranslation: `Сделай сообщение клиенту в стиле «${translation}».`,
    };
  }

  if (ABSTRACT_WORDS.has(word)) {
    return {
      example: `${capitalize(word)} is important here.`,
      exampleTranslation: `${capitalize(translation)} здесь важно.`,
      workExample: `This project needs more ${word}.`,
      workExampleTranslation: `Этому проекту нужно больше: ${translation}.`,
    };
  }

  if (VISUAL_WORDS.has(word)) {
    return {
      example: `This ${word} looks clear.`,
      exampleTranslation: `Этот объект понятен: ${translation}.`,
      workExample: `Use a ${word} image on the client page.`,
      workExampleTranslation: `Используй изображение с темой «${translation}» на странице клиента.`,
    };
  }

  return {
    example: `This ${word} is useful.`,
    exampleTranslation: `Это полезно: ${translation}.`,
    workExample: `Use ${word} in a short client message.`,
    workExampleTranslation: `Используй «${word}» в коротком сообщении клиенту.`,
  };
};

export const BATCH_400_900_WORD_OVERRIDES = Object.fromEntries(
  Object.entries(BATCH_DETAILS).map(([word, details]) => {
    const translation = cleanRuObject(word, extractTranslation(word, details));
    const override = word.includes(" ")
      ? createPhraseOverride(word, translation)
      : createSingleWordOverride(word, translation);

    return [word, override];
  }),
);
