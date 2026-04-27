export const GRAMMAR_LESSONS = [
  {
    id: "grammar-am-is-are",
    title: "am / is / are",
    level: "A1",
    description:
      "Используй am с I, is с he / she / it, are с you / we / they. Это базовая форма глагола to be.",
    examples: [
      { en: "I am a designer.", ru: "Я дизайнер." },
      { en: "She is at home.", ru: "Она дома." },
      { en: "They are busy today.", ru: "Они заняты сегодня." },
    ],
    exercise: {
      question: "Выбери правильный вариант: He ___ my client.",
      options: ["am", "is", "are"],
      correctAnswer: "is",
    },
  },
  {
    id: "grammar-do-does",
    title: "do / does",
    level: "A1",
    description:
      "В вопросах и коротких ответах do используется с I / you / we / they, а does с he / she / it.",
    examples: [
      { en: "Do you work in Webflow?", ru: "Ты работаешь в Webflow?" },
      { en: "Does he like this layout?", ru: "Ему нравится этот макет?" },
      { en: "I do, but she does not.", ru: "Я да, а она нет." },
    ],
    exercise: {
      question: "Выбери правильный вариант: ___ she need the link?",
      options: ["Do", "Does", "Is"],
      correctAnswer: "Does",
    },
  },
  {
    id: "grammar-dont-doesnt",
    title: "don't / doesn't",
    level: "A1",
    description:
      "Отрицание в Present Simple: don't для I / you / we / they и doesn't для he / she / it.",
    examples: [
      { en: "I don't know this word.", ru: "Я не знаю это слово." },
      { en: "They don't use this template.", ru: "Они не используют этот шаблон." },
      { en: "He doesn't like dark colors.", ru: "Ему не нравятся тёмные цвета." },
    ],
    exercise: {
      question: "Выбери правильный вариант: We ___ have a meeting today.",
      options: ["don't", "doesn't", "aren't"],
      correctAnswer: "don't",
    },
  },
  {
    id: "grammar-present-simple",
    title: "Present Simple",
    level: "A1",
    description:
      "Present Simple нужен для регулярных действий, привычек и простых фактов. После he / she / it глагол часто получает -s.",
    examples: [
      { en: "I work every day.", ru: "Я работаю каждый день." },
      { en: "She checks the CMS every morning.", ru: "Она проверяет CMS каждое утро." },
      { en: "We build websites for clients.", ru: "Мы делаем сайты для клиентов." },
    ],
    exercise: {
      question: "Выбери правильный вариант: He ___ the page every day.",
      options: ["check", "checks", "checking"],
      correctAnswer: "checks",
    },
  },
  {
    id: "grammar-simple-questions",
    title: "Простые вопросы",
    level: "A1",
    description:
      "Чтобы задать простой вопрос, часто ставим do / does или am / is / are в начало предложения.",
    examples: [
      { en: "Do you need help?", ru: "Тебе нужна помощь?" },
      { en: "Is the form ready?", ru: "Форма готова?" },
      { en: "Are they on the call now?", ru: "Они сейчас на созвоне?" },
    ],
    exercise: {
      question: "Выбери правильный вариант: ___ the button ready?",
      options: ["Do", "Is", "Does"],
      correctAnswer: "Is",
    },
  },
];

export default GRAMMAR_LESSONS;
