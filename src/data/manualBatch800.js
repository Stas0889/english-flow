const DESIGN_NOUNS = {
  layout: ["макет", "общая раскладка блоков на странице"],
  style: ["стиль", "визуальный характер элемента или страницы"],
  contrast: ["контраст", "разница между светлым, тёмным, крупным и мелким"],
  hierarchy: ["иерархия", "порядок важности заголовков, текста и кнопок"],
  composition: ["композиция", "то, как элементы собраны в один экран"],
  palette: ["палитра", "набор цветов проекта"],
  typography: ["типографика", "шрифты, размеры и текстовая система"],
  interface: ["интерфейс", "то, с чем взаимодействует пользователь"],
  grid: ["сетка", "невидимая система колонок и рядов"],
  spacing: ["отступы", "воздух между элементами"],
  version: ["версия", "конкретный вариант макета или решения"],
  concept: ["концепция", "главная идея визуального решения"],
  direction: ["направление", "общий вектор дизайна"],
  system: ["система", "связанный набор правил и компонентов"],
  guide: ["гайд", "инструкция или визуальное руководство"],
  section: ["секция", "отдельный блок страницы"],
  component: ["компонент", "переиспользуемый элемент интерфейса"],
};

const DESIGN_PREFIXES = {
  balanced: [
    "сбалансированный",
    "balanced - ровный по визуальному весу",
    "Представь весы: текст, картинка и кнопка стоят так, что экран не заваливается ни в одну сторону.",
  ],
  strong: [
    "сильный",
    "strong - сильный, уверенный, заметный",
    "Представь макет как крепкую стену: заголовок держит внимание, кнопка заметна, структура не разваливается.",
  ],
  clear: [
    "понятный",
    "clear - ясный, без тумана",
    "Представь, что с экрана сняли мутное стекло, и сразу стало понятно, куда смотреть и что нажимать.",
  ],
  dark: [
    "тёмный",
    "dark - тёмный",
    "Представь интерфейс в ночном режиме: тёмный фон, светлый текст и строгий контраст.",
  ],
  light: [
    "светлый",
    "light - светлый или лёгкий",
    "Представь светлый экран с большим количеством воздуха, где ничего не давит на пользователя.",
  ],
  visual: [
    "визуальный",
    "visual - то, что видно глазами",
    "Представь глаз, который оценивает макет целиком: цвет, сетку, композицию и настроение.",
  ],
  brand: [
    "брендовый",
    "brand - бренд, узнаваемый образ компании",
    "Представь фирменную коробку бренда: цвета, шрифты и тон собраны в один узнаваемый стиль.",
  ],
  mobile: [
    "мобильный",
    "mobile - телефонный, для маленького экрана",
    "Представь экран телефона, где каждый блок должен поместиться, читаться и нажиматься пальцем.",
  ],
  desktop: [
    "десктопный",
    "desktop - большой экран компьютера",
    "Представь широкий монитор, где у макета больше места для колонок, сетки и деталей.",
  ],
  responsive: [
    "адаптивный",
    "responsive - отвечающий на размер экрана",
    "Представь макет, который сжимается и перестраивается: desktop, tablet, mobile.",
  ],
  creative: [
    "креативный",
    "creative - творческий, с идеей",
    "Представь лампочку над макетом: решение не просто аккуратное, а с интересной идеей.",
  ],
};

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

const SYSTEM_NOUNS = [
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

const SELECTED_TERMS = [
  ...[
    "hierarchy",
    "composition",
    "palette",
    "typography",
    "interface",
    "grid",
    "spacing",
  ].map((noun) => ["balanced", noun]),
  ...QUALITY_NOUNS.map((noun) => ["strong", noun]),
  ...QUALITY_NOUNS.map((noun) => ["clear", noun]),
  ...QUALITY_NOUNS.map((noun) => ["dark", noun]),
  ...QUALITY_NOUNS.map((noun) => ["light", noun]),
  ...SYSTEM_NOUNS.map((noun) => ["visual", noun]),
  ...SYSTEM_NOUNS.map((noun) => ["brand", noun]),
  ...SYSTEM_NOUNS.map((noun) => ["mobile", noun]),
  ...SYSTEM_NOUNS.map((noun) => ["desktop", noun]),
  ...SYSTEM_NOUNS.map((noun) => ["responsive", noun]),
  ...["layout", "version", "concept"].map((noun) => ["creative", noun]),
];

const createEntry = ([prefixKey, nounKey]) => {
  const [prefixRu, hook, visual] = DESIGN_PREFIXES[prefixKey];
  const [nounRu, nounContext] = DESIGN_NOUNS[nounKey];
  const word = `${prefixKey} ${nounKey}`;
  const translation = `${prefixRu} ${nounRu}`;
  const context = `Use a ${word} for this project.`;

  return {
    word,
    mnemonic: `${word} = ${prefixRu} + ${nounRu}. ${visual}`,
    details: {
      lead: `Для выражения ${word} (${translation}) связываем качество ${prefixKey} с дизайн-элементом ${nounKey}.`,
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        { label: prefixKey.toUpperCase(), text: hook },
        { label: nounKey.toUpperCase(), text: `Вторая часть - ${nounContext}.` },
      ],
      storyTitle: "Сюжет / Фраза",
      story: `${visual} Теперь примени это качество к элементу «${nounKey}».`,
      visualTitle: "Визуальный образ",
      visual: `Представь экран до и после: сначала он сырой, потом появляется ${translation}, и решение становится понятнее.`,
      linkTitle: "Рабочая связка",
      linkLabel: context,
      linkText: `Повтори фразу: ${context}`,
      noteTitle: "Короткая формула",
      note: `${word} = ${translation}.`,
    },
  };
};

const ENTRIES = SELECTED_TERMS.map(createEntry);

export const BATCH_800_MNEMONICS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.mnemonic]),
);

export const BATCH_800_MNEMONIC_DETAILS = Object.fromEntries(
  ENTRIES.map((entry) => [entry.word, entry.details]),
);

