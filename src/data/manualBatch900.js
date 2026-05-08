const DESIGN_NOUNS = {
  direction: ["направление", "общий визуальный вектор проекта"],
  system: ["система", "набор связанных правил, цветов, шрифтов и компонентов"],
  guide: ["гайд", "документ или набор правил для работы"],
  section: ["секция", "отдельный смысловой блок страницы"],
  component: ["компонент", "переиспользуемый элемент интерфейса"],
  grid: ["сетка", "колонки и ряды, на которых держится макет"],
  style: ["стиль", "визуальный характер решения"],
  layout: ["макет", "раскладка блоков на странице"],
  version: ["версия", "конкретный вариант решения"],
  concept: ["концепция", "главная идея визуального решения"],
};

const VERSION_NOUNS = {
  draft: ["черновик", "сырая версия, которую ещё можно менять"],
  revision: ["правка", "изменённая версия после комментариев"],
  version: ["версия", "один из сохранённых вариантов решения"],
  concept: ["концепция", "идея, вокруг которой строится макет"],
  mockup: ["мокап", "визуальный черновик экрана или страницы"],
  direction: ["направление", "выбранный визуальный путь"],
  palette: ["палитра", "набор цветов проекта"],
  option: ["вариант", "один выбор из нескольких решений"],
  frame: ["фрейм", "рамка или экран в Figma"],
  style: ["стиль", "визуальный характер решения"],
};

const PREFIXES = {
  creative: [
    "креативный",
    "creative - творческий, с идеей",
    "Представь лампочку над макетом: решение не просто аккуратное, а с интересной идеей.",
  ],
  typographic: [
    "типографический",
    "typographic связано с typography - шрифты и текст",
    "Представь экран, где главный герой - текст: заголовки, размеры, интервалы и ритм строк.",
  ],
  editorial: [
    "редакционный",
    "editorial связано с редактурой, журналом и контентом",
    "Представь журнальный разворот: крупный заголовок, аккуратные колонки и сильная подача текста.",
  ],
  first: [
    "первый",
    "first - первый в очереди",
    "Представь самую первую карточку в стопке вариантов с номером 1.",
  ],
  final: [
    "финальный",
    "final - финал, последний вариант",
    "Представь штамп FINAL на макете, который уже готов к отправке клиенту.",
  ],
  updated: [
    "обновлённый",
    "updated связано с update - обновить",
    "Представь макет после правок: старый слой сняли, новый слой подсвечен.",
  ],
  current: [
    "текущий",
    "current - то, что актуально сейчас",
    "Представь зелёную метку CURRENT на версии, с которой команда работает прямо сейчас.",
  ],
  previous: [
    "предыдущий",
    "previous - тот, что был раньше",
    "Представь старую карточку версии, которая лежит позади текущей.",
  ],
  primary: [
    "основной",
    "primary - главный, первый по важности",
    "Представь главный вариант, отмеченный яркой синей меткой PRIMARY.",
  ],
  secondary: [
    "вторичный",
    "secondary - дополнительный, не главный",
    "Представь второй вариант рядом с главным: он полезный, но не основной.",
  ],
  alternative: [
    "альтернативный",
    "alternative - другой вариант",
    "Представь развилку: основной путь идёт прямо, alternative уводит в сторону как запасной вариант.",
  ],
};

const DESIGN_GROUP_NOUNS = [
  "direction",
  "system",
  "guide",
  "section",
  "component",
  "grid",
  "style",
];

const FULL_DESIGN_NOUNS = [
  "layout",
  "version",
  "concept",
  "direction",
  "system",
  "guide",
  "section",
  "component",
  "grid",
  "style",
];

const FULL_VERSION_NOUNS = [
  "draft",
  "revision",
  "version",
  "concept",
  "mockup",
  "direction",
  "palette",
  "option",
  "frame",
  "style",
];

const SELECTED_TERMS = [
  ...DESIGN_GROUP_NOUNS.map((noun) => ["creative", noun]),
  ...FULL_DESIGN_NOUNS.map((noun) => ["typographic", noun]),
  ...FULL_DESIGN_NOUNS.map((noun) => ["editorial", noun]),
  ...FULL_VERSION_NOUNS.map((noun) => ["first", noun]),
  ...["version", "concept", "mockup", "direction", "palette", "option", "frame", "style"].map((noun) => ["final", noun]),
  ...FULL_VERSION_NOUNS.map((noun) => ["updated", noun]),
  ...FULL_VERSION_NOUNS.map((noun) => ["current", noun]),
  ...FULL_VERSION_NOUNS.map((noun) => ["previous", noun]),
  ...FULL_VERSION_NOUNS.map((noun) => ["primary", noun]),
  ...FULL_VERSION_NOUNS.map((noun) => ["secondary", noun]),
  ...["draft", "revision", "version", "concept", "mockup"].map((noun) => ["alternative", noun]),
];

const getNounData = (nounKey) => DESIGN_NOUNS[nounKey] || VERSION_NOUNS[nounKey];

const createEntry = ([prefixKey, nounKey]) => {
  const [prefixRu, hook, visual] = PREFIXES[prefixKey];
  const [nounRu, nounContext] = getNounData(nounKey);
  const word = `${prefixKey} ${nounKey}`;
  const translation = `${prefixRu} ${nounRu}`;
  const context = `Review the ${word} before sending it.`;

  return {
    word,
    mnemonic: `${word} = ${prefixRu} + ${nounRu}. ${visual}`,
    details: {
      lead: `Для выражения ${word} (${translation}) связываем качество ${prefixKey} с рабочим объектом ${nounKey}.`,
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        { label: prefixKey.toUpperCase(), text: hook },
        { label: nounKey.toUpperCase(), text: `Вторая часть - ${nounContext}.` },
      ],
      storyTitle: "Сюжет / Фраза",
      story: `${visual} Теперь представь, что эта метка приклеена именно к объекту «${nounKey}».`,
      visualTitle: "Визуальный образ",
      visual: `Представь Figma-файл со стопкой вариантов. Один слой подписан ${word}, и ты сразу понимаешь его роль.`,
      linkTitle: "Рабочая связка",
      linkLabel: context,
      linkText: `Повтори фразу: ${context}`,
      noteTitle: "Короткая формула",
      note: `${word} = ${translation}.`,
    },
  };
};

const ENTRIES = SELECTED_TERMS.map(createEntry);

export const BATCH_900_MNEMONICS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.mnemonic]),
);

export const BATCH_900_MNEMONIC_DETAILS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.details]),
);

