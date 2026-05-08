const PAIR_NOUNS = {
  call: {
    translation: "созвон",
    gender: "m",
    action: "Use this {term} to agree on the next action.",
    actionRu: "Используй {termRu}, чтобы согласовать следующий шаг.",
    context: "созвон с клиентом или командой",
  },
  update: {
    translation: "обновление",
    gender: "n",
    action: "Send this {term} after the task is complete.",
    actionRu: "Отправь {termRu}, когда задача будет готова.",
    context: "короткое сообщение о прогрессе",
  },
  request: {
    translation: "запрос",
    gender: "m",
    action: "Clarify this {term} before starting work.",
    actionRu: "Уточни {termRu} перед началом работы.",
    context: "просьба или задача от клиента",
  },
  feedback: {
    translation: "обратная связь",
    gender: "f",
    action: "Group this {term} by page.",
    actionRu: "Сгруппируй {termRu} по страницам.",
    context: "комментарии по макету или сайту",
  },
  timeline: {
    translation: "таймлайн",
    gender: "m",
    action: "Review this {term} before confirming dates.",
    actionRu: "Проверь {termRu} перед подтверждением дат.",
    context: "план сроков по проекту",
  },
  invoice: {
    translation: "счёт",
    gender: "m",
    action: "Send this {term} after approval.",
    actionRu: "Отправь {termRu} после утверждения.",
    context: "документ на оплату",
  },
  note: {
    translation: "заметка",
    gender: "f",
    action: "Save this {term} in the shared document.",
    actionRu: "Сохрани {termRu} в общем документе.",
    context: "короткая рабочая запись",
  },
  summary: {
    translation: "сводка",
    gender: "f",
    action: "Send this {term} after the meeting.",
    actionRu: "Отправь {termRu} после встречи.",
    context: "краткий итог обсуждения",
  },
  review: {
    translation: "ревью",
    gender: "n",
    action: "Use this {term} to catch final issues.",
    actionRu: "Используй {termRu}, чтобы найти финальные проблемы.",
    context: "проверка дизайна, сайта или текста",
  },
  draft: {
    translation: "черновик",
    gender: "m",
    action: "Share this {term} before publishing.",
    actionRu: "Отправь {termRu} перед публикацией.",
    context: "предварительная версия материала",
  },
  message: {
    translation: "сообщение",
    gender: "n",
    action: "Keep this {term} short and clear.",
    actionRu: "Сделай {termRu} коротким и понятным.",
    context: "письмо или сообщение в чате",
  },
  reply: {
    translation: "ответ",
    gender: "m",
    action: "Send this {term} in the same thread.",
    actionRu: "Отправь {termRu} в той же ветке переписки.",
    context: "ответ на сообщение клиента",
  },
  question: {
    translation: "вопрос",
    gender: "m",
    action: "Answer this {term} before the next step.",
    actionRu: "Ответь на {termRu} перед следующим шагом.",
    context: "уточнение перед работой",
  },
  meeting: {
    translation: "встреча",
    gender: "f",
    action: "Prepare a short agenda for this {term}.",
    actionRu: "Подготовь короткую повестку для {termRu}.",
    context: "рабочая встреча по проекту",
  },
  brief: {
    translation: "бриф",
    gender: "m",
    action: "Use this {term} to define the scope.",
    actionRu: "Используй {termRu}, чтобы определить объём работ.",
    context: "описание задачи, цели и ограничений",
  },
  report: {
    translation: "отчёт",
    gender: "m",
    action: "Send this {term} with screenshots.",
    actionRu: "Отправь {termRu} со скриншотами.",
    context: "отчёт о проделанной работе",
  },
  revision: {
    translation: "правка",
    gender: "f",
    action: "Track this {term} in the change list.",
    actionRu: "Зафиксируй {termRu} в списке изменений.",
    context: "изменение после ревью",
  },
  reminder: {
    translation: "напоминание",
    gender: "n",
    action: "Send this {term} before the deadline.",
    actionRu: "Отправь {termRu} перед дедлайном.",
    context: "короткое напоминание о действии",
  },
};

const PAIR_PREFIXES = {
  urgent: {
    translation: "срочный",
    forms: { m: "срочный", f: "срочная", n: "срочное" },
    hook: "urgent похоже на «уржент» и звучит как красная метка срочности",
    visual: "Представь сообщение с красной плашкой URGENT, которое нельзя откладывать.",
    phrase: "urgent = срочно, нужно быстро отреагировать.",
  },
  weekly: {
    translation: "еженедельный",
    forms: { m: "еженедельный", f: "еженедельная", n: "еженедельное" },
    hook: "weekly связано с week: то, что повторяется каждую неделю",
    visual: "Представь календарь, где один и тот же рабочий пункт подсвечен каждую неделю.",
    phrase: "weekly = еженедельно, один раз в неделю.",
  },
  internal: {
    translation: "внутренний",
    forms: { m: "внутренний", f: "внутренняя", n: "внутреннее" },
    hook: "internal связано с inside: внутри команды, без клиента",
    visual: "Представь закрытый командный чат, куда клиент не видит переписку.",
    phrase: "internal = внутренний, только для команды.",
  },
  budget: {
    translation: "бюджетный",
    forms: { m: "бюджетный", f: "бюджетная", n: "бюджетное" },
    hook: "budget звучит как «баджет» и сразу ведёт к деньгам проекта",
    visual: "Представь таблицу с суммой, часами и лимитом расходов.",
    phrase: "budget = бюджет, деньги и рамки оплаты.",
  },
  contract: {
    translation: "договорной",
    forms: { m: "договорной", f: "договорная", n: "договорное" },
    hook: "contract похоже на «контракт»: документ с условиями",
    visual: "Представь PDF-договор, где жёлтым выделен важный пункт.",
    phrase: "contract = договор, официальные условия работы.",
  },
  payment: {
    translation: "платёжный",
    forms: { m: "платёжный", f: "платёжная", n: "платёжное" },
    hook: "payment связано с pay: платить",
    visual: "Представь счёт, дату оплаты и зелёный статус Paid.",
    phrase: "payment = оплата или платёж.",
  },
};

const NOUN_ORDER = Object.keys(PAIR_NOUNS);

const SINGLE_TERMS = [
  {
    word: "final reminder",
    translation: "финальное напоминание",
    example: "This is the final reminder.",
    exampleTranslation: "Это финальное напоминание.",
    workExample: "Send the final reminder before we close the review window.",
    workExampleTranslation:
      "Отправь финальное напоминание перед закрытием окна ревью.",
    mnemonic:
      "Final reminder = последнее напоминание. Представь последнюю красную заметку перед дедлайном: после неё уже нужно действовать.",
    detail: {
      lead:
        "Для выражения Final reminder лучше всего работает прямой разбор: final - последний, reminder - напоминание.",
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        {
          label: "FINAL = ФИНАЛ",
          text:
            "Final почти как «финал»: это последний момент перед завершением.",
        },
        {
          label: "REMINDER = НАПОМИНАНИЕ",
          text:
            "Reminder связано с remind - напомнить. Вместе это последнее напоминание перед действием.",
        },
      ],
      storyTitle: "Сюжет / Фраза",
      story:
        "Окно для правок закрывается вечером, и ты отправляешь клиенту последнее короткое сообщение: final reminder.",
      visualTitle: "Визуальный образ",
      visual:
        "Представь календарь с дедлайном и последнюю заметку с красной точкой: после неё времени почти не осталось.",
      linkTitle: "Связка",
      linkLabel: "Send the final reminder",
      linkText:
        "Представь финальное сообщение перед закрытием этапа ревью.",
      noteTitle: "Рабочий контекст",
      note:
        "Final reminder удобно использовать перед дедлайном, оплатой, созвоном или финальным ревью.",
    },
  },
];

const PAIR_GROUPS = [
  ...NOUN_ORDER.map((noun) => ["urgent", noun]),
  ...NOUN_ORDER.map((noun) => ["weekly", noun]),
  ...NOUN_ORDER.map((noun) => ["internal", noun]),
  ...NOUN_ORDER.map((noun) => ["budget", noun]),
  ...NOUN_ORDER.map((noun) => ["contract", noun]),
  ...NOUN_ORDER.slice(0, 9).map((noun) => ["payment", noun]),
];

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

const createPairTerm = ([prefixKey, nounKey]) => {
  const prefix = PAIR_PREFIXES[prefixKey];
  const noun = PAIR_NOUNS[nounKey];
  const word = `${prefixKey} ${nounKey}`;
  const translation = `${prefix.forms[noun.gender]} ${noun.translation}`;
  const capitalizedWord = capitalize(word);

  return {
    word,
    translation,
    example: `${capitalizedWord} is important.`,
    exampleTranslation: `${capitalize(translation)} важен в рабочем контексте.`,
    workExample: fill(noun.action, { term: word }),
    workExampleTranslation: fill(noun.actionRu, { termRu: translation }),
    mnemonic: `${capitalizedWord} = ${prefix.translation} + ${noun.translation}. ${prefix.visual}`,
    detail: {
      lead: `Для выражения ${capitalizedWord} удобно разложить слово на две части: ${prefixKey} + ${nounKey}.`,
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        {
          label: `${prefixKey.toUpperCase()} = ${prefix.translation.toUpperCase()}`,
          text: prefix.hook,
        },
        {
          label: `${nounKey.toUpperCase()} = ${noun.translation.toUpperCase()}`,
          text: `Вторая часть даёт предмет: ${noun.context}.`,
        },
        {
          label: `${capitalizedWord} = ${translation}`,
          text: `${prefix.phrase} Добавь ${noun.translation}, и получишь рабочее выражение.`,
        },
      ],
      storyTitle: "Сюжет / Фраза",
      story: `Представь проектный чат: появляется ${translation}, и ты сразу понимаешь, что это связано с контекстом "${prefixKey}" и темой "${nounKey}".`,
      visualTitle: "Визуальный образ",
      visual: `${prefix.visual} Рядом лежит карточка "${nounKey}" - ${noun.context}.`,
      linkTitle: "Связка",
      linkLabel: capitalize(fill(noun.action, { term: word })),
      linkText: fill(noun.actionRu, { termRu: translation }),
      noteTitle: "Рабочий контекст",
      note: `${capitalizedWord} часто встречается в переписке с клиентами, когда нужно обсуждать ${noun.context}.`,
    },
  };
};

const BATCH_300_TERMS = [...SINGLE_TERMS, ...PAIR_GROUPS.map(createPairTerm)];

export const BATCH_300_WORD_OVERRIDES = Object.fromEntries(
  BATCH_300_TERMS.map(
    ({ word, example, exampleTranslation, workExample, workExampleTranslation }) => [
      word,
      { example, exampleTranslation, workExample, workExampleTranslation },
    ],
  ),
);

export const BATCH_300_MNEMONICS = Object.fromEntries(
  BATCH_300_TERMS.map(({ word, mnemonic }) => [word, mnemonic]),
);

export const BATCH_300_MNEMONIC_DETAILS = Object.fromEntries(
  BATCH_300_TERMS.map(({ word, detail }) => [word, detail]),
);

