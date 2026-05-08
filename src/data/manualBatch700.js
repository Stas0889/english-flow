const WORK_NOUNS = {
  call: ["созвон", "Use this {term} to agree on the next step.", "Используй {termRu}, чтобы согласовать следующий шаг."],
  update: ["обновление", "Send this {term} after the task is done.", "Отправь {termRu}, когда задача готова."],
  request: ["запрос", "Clarify this {term} before starting work.", "Уточни {termRu} перед началом работы."],
  feedback: ["обратная связь", "Group this {term} by page.", "Сгруппируй {termRu} по страницам."],
  timeline: ["таймлайн", "Check this {term} before confirming dates.", "Проверь {termRu} перед подтверждением дат."],
  invoice: ["счёт", "Send this {term} after approval.", "Отправь {termRu} после утверждения."],
  note: ["заметка", "Save this {term} in the shared document.", "Сохрани {termRu} в общем документе."],
  summary: ["сводка", "Send this {term} after the meeting.", "Отправь {termRu} после встречи."],
  review: ["ревью", "Use this {term} to find final issues.", "Используй {termRu}, чтобы найти финальные проблемы."],
  draft: ["черновик", "Share this {term} before approval.", "Отправь {termRu} перед утверждением."],
  message: ["сообщение", "Keep this {term} short and clear.", "Сделай {termRu} коротким и понятным."],
  reply: ["ответ", "Send this {term} in the same thread.", "Отправь {termRu} в той же ветке."],
  question: ["вопрос", "Answer this {term} before the call.", "Ответь на {termRu} до созвона."],
  meeting: ["встреча", "Prepare notes for this {term}.", "Подготовь заметки для {termRu}."],
  brief: ["бриф", "Use this {term} to define the scope.", "Используй {termRu}, чтобы определить объём работ."],
  report: ["отчёт", "Send this {term} with screenshots.", "Отправь {termRu} со скриншотами."],
  revision: ["правка", "Track this {term} in the change list.", "Зафиксируй {termRu} в списке изменений."],
  reminder: ["напоминание", "Send this {term} before the deadline.", "Отправь {termRu} перед дедлайном."],
};

const WORK_PREFIXES = {
  design: ["дизайн", "design почти как русское «дизайн»", "Представь Figma-макет с сеткой, цветами и комментариями."],
  "follow-up": ["последующий", "follow-up - сообщение или действие вдогонку после встречи", "Представь письмо, которое догоняет клиента после созвона и фиксирует следующий шаг."],
  team: ["командный", "team - команда", "Представь общий командный чат, где все участники проекта видят задачу."],
  legal: ["юридический", "legal связано с законом и договором", "Представь PDF-договор с печатью, подписью и выделенным пунктом."],
};

const DESIGN_NOUNS = [
  "feedback",
  "timeline",
  "invoice",
  "note",
  "summary",
  "draft",
  "message",
  "reply",
  "question",
  "meeting",
  "brief",
  "report",
  "revision",
  "reminder",
];

const FOLLOW_UP_NOUNS = [
  "call",
  "update",
  "request",
  "feedback",
  "timeline",
  "invoice",
  "note",
  "summary",
  "review",
  "draft",
  "reply",
  "question",
  "meeting",
  "brief",
  "report",
  "revision",
  "reminder",
];

const FULL_NOUNS = Object.keys(WORK_NOUNS);

const QUALITY_NOUNS = [
  "layout",
  "style",
  "contrast",
  "hierarchy",
  "composition",
  "palette",
  "typography",
  "interface",
  "grid",
  "spacing",
];

const QUALITY_PREFIXES = {
  clean: ["чистый", "clean - чистый, без визуального шума", "Представь макет, с которого стерли все лишние линии, пятна и случайные элементы."],
  modern: ["современный", "modern - современный, актуальный", "Представь свежий интерфейс без устаревших теней, перегруза и старых паттернов."],
  minimal: ["минимальный", "minimal - минимум деталей", "Представь экран, где остались только нужные элементы, воздух и понятная структура."],
  balanced: ["сбалансированный", "balanced - ровный по весу и композиции", "Представь весы: текст, изображение и кнопка стоят так, что макет не заваливается."],
};

const QUALITY_TRANSLATIONS = {
  layout: "макет",
  style: "стиль",
  contrast: "контраст",
  hierarchy: "иерархия",
  composition: "композиция",
  palette: "палитра",
  typography: "типографика",
  interface: "интерфейс",
  grid: "сетка",
  spacing: "отступы",
};

const SELECTED_WORK_TERMS = [
  ...DESIGN_NOUNS.map((noun) => ["design", noun]),
  ...FOLLOW_UP_NOUNS.map((noun) => ["follow-up", noun]),
  ...FULL_NOUNS.map((noun) => ["team", noun]),
  ...FULL_NOUNS.map((noun) => ["legal", noun]),
];

const SELECTED_QUALITY_TERMS = [
  ...QUALITY_NOUNS.map((noun) => ["clean", noun]),
  ...QUALITY_NOUNS.map((noun) => ["modern", noun]),
  ...QUALITY_NOUNS.map((noun) => ["minimal", noun]),
  ...["layout", "style", "contrast"].map((noun) => ["balanced", noun]),
];

const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

const createWorkEntry = ([prefixKey, nounKey]) => {
  const [prefixRu, hook, visual] = WORK_PREFIXES[prefixKey];
  const [nounRu, action, actionRu] = WORK_NOUNS[nounKey];
  const word = `${prefixKey} ${nounKey}`;
  const translation = `${prefixRu} ${nounRu}`;
  const context = fill(action, { term: word });

  return {
    word,
    mnemonic: `${word} = ${prefixRu} + ${nounRu}. ${visual}`,
    details: {
      lead: `Для выражения ${word} (${translation}) разложи его на ${prefixKey} + ${nounKey}.`,
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        { label: prefixKey.toUpperCase(), text: hook },
        { label: nounKey.toUpperCase(), text: `Вторая часть даёт рабочий предмет: ${nounRu}.` },
      ],
      storyTitle: "Сюжет / Фраза",
      story: `${visual} Рядом лежит карточка «${nounKey}», которую нужно обработать.`,
      visualTitle: "Визуальный образ",
      visual: `${visual} Сделай сцену конкретной: открой чат, документ или макет и найди там ${nounRu}.`,
      linkTitle: "Рабочая связка",
      linkLabel: context,
      linkText: fill(actionRu, { termRu: translation }),
      noteTitle: "Короткая формула",
      note: `${word} = ${translation}.`,
    },
  };
};

const createQualityEntry = ([prefixKey, nounKey]) => {
  const [prefixRu, hook, visual] = QUALITY_PREFIXES[prefixKey];
  const nounRu = QUALITY_TRANSLATIONS[nounKey];
  const word = `${prefixKey} ${nounKey}`;
  const translation = `${prefixRu} ${nounRu}`;
  const context = `Use a ${word} for this page.`;

  return {
    word,
    mnemonic: `${word} = ${prefixRu} + ${nounRu}. ${visual}`,
    details: {
      lead: `Для выражения ${word} (${translation}) связываем качество ${prefixKey} с дизайн-элементом ${nounKey}.`,
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        { label: prefixKey.toUpperCase(), text: hook },
        { label: nounKey.toUpperCase(), text: `Вторая часть - конкретный элемент дизайна: ${nounRu}.` },
      ],
      storyTitle: "Сюжет / Фраза",
      story: `${visual} Теперь примени это качество именно к ${nounRu}.`,
      visualTitle: "Визуальный образ",
      visual: `Представь экран до и после: сначала хаос, потом ${translation}, который сразу легче читать.`,
      linkTitle: "Рабочая связка",
      linkLabel: context,
      linkText: `Повтори фразу: ${context}`,
      noteTitle: "Короткая формула",
      note: `${word} = ${translation}.`,
    },
  };
};

const ENTRIES = [
  ...SELECTED_WORK_TERMS.map(createWorkEntry),
  ...SELECTED_QUALITY_TERMS.map(createQualityEntry),
];

export const BATCH_700_MNEMONICS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.mnemonic]),
);

export const BATCH_700_MNEMONIC_DETAILS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.details]),
);

