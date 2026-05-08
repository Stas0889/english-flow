const NOUNS = {
  direction: ["направление", "общий визуальный или рабочий вектор", "n"],
  palette: ["палитра", "набор цветов проекта", "f"],
  option: ["вариант", "один выбор из нескольких решений", "m"],
  frame: ["фрейм", "экран или рамка в Figma", "m"],
  style: ["стиль", "визуальный характер решения", "m"],
  field: ["поле", "поле CMS, формы или настройки", "n"],
  page: ["страница", "отдельная страница сайта", "f"],
  settings: ["настройки", "панель параметров", "pl"],
  class: ["класс", "CSS/Webflow-класс элемента", "m"],
  section: ["секция", "отдельный блок страницы", "f"],
  component: ["компонент", "переиспользуемый элемент интерфейса", "m"],
  layout: ["макет", "раскладка блоков на странице", "m"],
  item: ["элемент", "одна запись или один элемент списка", "m"],
  template: ["шаблон", "заготовка страницы или структуры", "m"],
  view: ["вид", "то, как интерфейс выглядит в конкретном режиме", "m"],
  mode: ["режим", "режим работы интерфейса", "m"],
  issue: ["проблема", "баг, ошибка или вопрос на проверку", "f"],
  update: ["обновление", "изменение или сообщение о прогрессе", "n"],
  state: ["состояние", "текущее состояние элемента или страницы", "n"],
  panel: ["панель", "боковая или рабочая панель интерфейса", "f"],
  access: ["доступ", "право открыть или редактировать что-то", "m"],
  link: ["ссылка", "URL или кликабельный переход", "f"],
  version: ["версия", "конкретный вариант проекта или страницы", "f"],
};

const PREFIXES = {
  alternative: [
    { m: "альтернативный", f: "альтернативная", n: "альтернативное", pl: "альтернативные" },
    "alternative - другой вариант, запасной путь",
    "Представь развилку: основной путь идёт прямо, а альтернативный вариант уходит в сторону.",
  ],
  cms: [
    { m: "CMS", f: "CMS", n: "CMS", pl: "CMS" },
    "CMS - место, где живут поля, коллекции и контент",
    "Представь таблицу CMS с записями, полями и настройками контента.",
  ],
  collection: [
    { m: "коллекционный", f: "коллекционная", n: "коллекционное", pl: "коллекционные" },
    "collection - коллекция CMS-записей",
    "Представь папку с однотипными карточками: статьи, кейсы, услуги или отзывы.",
  ],
  dynamic: [
    { m: "динамический", f: "динамическая", n: "динамическое", pl: "динамические" },
    "dynamic - подтягивается из данных, а не вводится вручную",
    "Представь блок, который сам берёт текст, картинку и ссылку из CMS.",
  ],
  static: [
    { m: "статический", f: "статическая", n: "статическое", pl: "статические" },
    "static - зафиксированный вручную",
    "Представь текст, который написан прямо на странице и не меняется из CMS.",
  ],
  custom: [
    { m: "кастомный", f: "кастомная", n: "кастомное", pl: "кастомные" },
    "custom - сделанный под конкретную задачу",
    "Представь элемент с собственной настройкой, которой нет в стандартном наборе.",
  ],
  global: [
    { m: "глобальный", f: "глобальная", n: "глобальное", pl: "глобальные" },
    "global - действует по всему проекту",
    "Представь главный переключатель, который меняет стиль сразу на всех страницах.",
  ],
  reusable: [
    { m: "переиспользуемый", f: "переиспользуемая", n: "переиспользуемое", pl: "переиспользуемые" },
    "reusable - можно использовать снова",
    "Представь блок-конструктор, который вставляется на разные страницы без пересборки.",
  ],
  mobile: [
    { m: "мобильный", f: "мобильная", n: "мобильное", pl: "мобильные" },
    "mobile - для телефона и маленького экрана",
    "Представь экран телефона, где всё должно читаться и нажиматься пальцем.",
  ],
  desktop: [
    { m: "десктопный", f: "десктопная", n: "десктопное", pl: "десктопные" },
    "desktop - для большого экрана компьютера",
    "Представь широкий монитор, где можно использовать колонки и больше воздуха.",
  ],
  editor: [
    { m: "редакторский", f: "редакторская", n: "редакторское", pl: "редакторские" },
    "editor - режим простого редактирования контента",
    "Представь клиента в Editor mode, где можно менять текст без дизайнерских панелей.",
  ],
  designer: [
    { m: "дизайнерский", f: "дизайнерская", n: "дизайнерское", pl: "дизайнерские" },
    "designer - рабочий режим дизайнера или Webflow-разработчика",
    "Представь Webflow Designer с панелями, стилями, классами и canvas.",
  ],
};

const SELECTED_TERMS = [
  ...["direction", "palette", "option", "frame", "style"].map((noun) => ["alternative", noun]),
  ...["field", "page", "settings", "class", "section", "component", "style", "layout"].map((noun) => ["cms", noun]),
  ...["item", "template", "settings", "class", "section", "component", "style", "layout"].map((noun) => ["collection", noun]),
  ...["item", "field", "template", "page", "settings", "class", "section", "component", "style", "layout"].map((noun) => ["dynamic", noun]),
  ...["item", "field", "template", "page", "settings", "class", "section", "component", "style", "layout"].map((noun) => ["static", noun]),
  ...["item", "field", "template", "page", "settings", "class", "section", "component", "style", "layout"].map((noun) => ["custom", noun]),
  ...["item", "field", "template", "page", "settings", "class", "section", "component", "style", "layout"].map((noun) => ["global", noun]),
  ...["item", "field", "template", "page", "settings", "class", "section", "component", "style", "layout"].map((noun) => ["reusable", noun]),
  ...["view", "mode", "settings", "issue", "update", "state", "panel", "access", "link"].map((noun) => ["mobile", noun]),
  ...["view", "mode", "settings", "issue", "update", "state", "panel", "access", "link"].map((noun) => ["desktop", noun]),
  ...["view", "settings", "issue", "update", "state", "panel", "access", "version"].map((noun) => ["editor", noun]),
  ...["view", "settings", "issue"].map((noun) => ["designer", noun]),
];

const createEntry = ([prefixKey, nounKey]) => {
  const [prefixForms, hook, visual] = PREFIXES[prefixKey];
  const [nounRu, nounContext, nounGender] = NOUNS[nounKey];
  const word = `${prefixKey} ${nounKey}`;
  const prefixRu = prefixForms[nounGender] || prefixForms.m;
  const translation = `${prefixRu} ${nounRu}`;
  const context = `Check the ${word} before the client review.`;

  return {
    word,
    translation,
    mnemonic: `${word} = ${prefixRu} + ${nounRu}. ${visual}`,
    details: {
      lead: `Для выражения ${word} (${translation}) разложи его на две части: ${prefixKey} + ${nounKey}.`,
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        { label: prefixKey.toUpperCase(), text: hook },
        { label: nounKey.toUpperCase(), text: `Вторая часть - ${nounContext}.` },
      ],
      storyTitle: "Сюжет / Фраза",
      story: `${visual} Теперь приклей эту метку к объекту «${nounKey}».`,
      visualTitle: "Визуальный образ",
      visual: `Представь рабочий экран Webflow или Figma, где выбран именно ${word}, и команда обсуждает его перед отправкой клиенту.`,
      linkTitle: "Рабочая связка",
      linkLabel: context,
      linkText: `Повтори фразу: ${context}`,
      noteTitle: "Короткая формула",
      note: `${word} = ${translation}.`,
    },
    override: {
      example: `This is the ${word}.`,
      exampleTranslation: `Это рабочий элемент: ${translation}.`,
      workExample: context,
      workExampleTranslation: `Проверь рабочий элемент «${translation}» перед клиентским ревью.`,
    },
  };
};

const ENTRIES = SELECTED_TERMS.map(createEntry);

export const BATCH_1000_MNEMONICS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.mnemonic]),
);

export const BATCH_1000_MNEMONIC_DETAILS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.details]),
);

export const BATCH_1000_WORD_OVERRIDES = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.override]),
);
