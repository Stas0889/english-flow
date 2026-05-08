const SIMPLE_TERMS = [
  ["quiet", "тихий", "квайет", "Тихая комната quiet, где даже курсор двигается без звука.", "Quiet - тихий, спокойный.", "Keep the page quiet and clean."],
  ["race", "гонка", "рэйс", "Две кнопки устроили race и бегут к финишу.", "Race - гонка или соревнование.", "The race page needs a countdown."],
  ["railway", "железная дорога", "рэйлвэй", "Железная дорога railway уходит рельсами через весь экран.", "Railway - дорога с рельсами.", "The railway map is hard to read."],
  ["reach", "достигать", "рич", "Рука тянется reach до высокой кнопки.", "Reach - дотянуться или достичь.", "We need to reach more users."],
  ["recycle", "перерабатывать", "рисайкл", "Иконка recycle крутит старые блоки в новые.", "Recycle - использовать повторно, перерабатывать.", "Recycle this layout for the next page."],
  ["relax", "расслабляться", "рилакс", "Кнопка relax лежит в гамаке и ничего не делает.", "Relax - расслабиться.", "The visual style should feel relaxed."],
  ["remember", "помнить", "римэмбер", "Память ставит стикер remember на важное слово.", "Remember - помнить.", "Remember to check the form."],
  ["repeat", "повторять", "рипит", "Попугай repeat снова и снова повторяет слово.", "Repeat - повторить.", "Repeat this phrase aloud."],
  ["restaurant", "ресторан", "рэсторант", "Ресторан restaurant открывает меню на сайте.", "Restaurant почти совпадает с русским «ресторан».", "The restaurant menu needs photos."],
  ["river", "река", "ривер", "Река river течёт между двумя секциями.", "River - река.", "Use a river photo for the hero."],
  ["road", "дорога", "роуд", "Дорога road ведёт пользователя к кнопке CTA.", "Road - дорога.", "The road map should be simple."],
  ["safe", "безопасный", "сэйф", "Сейф safe закрывает данные клиента.", "Safe - безопасный или сейф.", "Make the payment flow safe."],
  ["save", "сохранять", "сэйв", "Дискета save сохраняет все изменения.", "Save - сохранить.", "Save the draft before closing."],
  ["science", "наука", "сайенс", "Колбы science кипят в научной лаборатории.", "Science - наука.", "The science page needs diagrams."],
  ["screen", "экран", "скрин", "Экран screen показывает мобильную версию.", "Screen почти как русское «скрин».", "Check the screen size."],
  ["season", "сезон", "сизон", "Календарь season меняет лето на зиму.", "Season - сезон.", "Update the season banner."],
  ["service", "услуга, сервис", "сервис", "Сервис service встречает клиента у стойки.", "Service почти совпадает с русским «сервис».", "This service needs a landing page."],
  ["share", "делиться", "шэр", "Кнопка share раздаёт ссылку всем вокруг.", "Share - поделиться.", "Share the preview link."],
  ["ship", "корабль", "шип", "Корабль ship плывёт по волнам.", "Ship - корабль; в работе ещё означает отправить релиз.", "Ship the update today."],
  ["shirt", "рубашка", "шёрт", "Рубашка shirt висит на карточке товара.", "Shirt - рубашка.", "The shirt product card needs sizes."],
  ["shower", "душ", "шауэр", "Душ shower льёт воду на иконки.", "Shower - душ.", "The shower product image is too small."],
  ["signal", "сигнал", "сигнал", "Зелёный signal показывает, что форма работает.", "Signal почти совпадает с русским «сигнал».", "The signal icon should be visible."],
  ["simple", "простой", "симпл", "Простой блок simple без лишних деталей.", "Simple - простой.", "Keep the form simple."],
  ["skill", "навык", "скилл", "Скилл skill растёт как шкала прогресса.", "Skill - навык.", "This skill needs daily practice."],
  ["sleep", "спать", "слип", "Луна sleep усыпляет весь интерфейс.", "Sleep - спать.", "The app should not sleep during audio."],
  ["smile", "улыбка", "смайл", "Улыбка smile превращается в иконку.", "Smile - улыбаться или улыбка.", "Use a friendly smile in the photo."],
  ["snow", "снег", "сноу", "Снег snow падает на зимний баннер.", "Snow - снег.", "The snow image fits winter."],
  ["social", "социальный", "соушл", "Социальные иконки social стоят в футере.", "Social - социальный.", "Add social links to the footer."],
  ["solve", "решать", "солв", "Гаечный ключ solve решает проблему в форме.", "Solve - решить проблему.", "We need to solve this issue."],
  ["speaker", "динамик, спикер", "спикер", "Спикер speaker говорит в микрофон.", "Speaker - человек, который говорит, или динамик.", "The speaker card needs a bio."],
  ["sport", "спорт", "спорт", "Спорт sport показывает беговые карточки.", "Sport почти совпадает с русским «спорт».", "The sport page needs categories."],
  ["station", "станция", "стэйшн", "Станция station показывает расписание поездов.", "Station - станция.", "The station map is outdated."],
  ["stomach", "желудок", "стомак", "Желудок stomach бурчит перед ужином.", "Stomach - желудок.", "The stomach pain page needs warnings."],
  ["street", "улица", "стрит", "Улица street ведёт к офису клиента.", "Street - улица.", "Add the street address."],
  ["student", "студент", "стьюдент", "Студент student открывает урок English Flow.", "Student почти совпадает с русским «студент».", "The student dashboard is simple."],
  ["subject", "предмет, тема", "сабджект", "В письме subject подсвечивает тему сообщения.", "Subject - тема письма или учебный предмет.", "Write a clear subject line."],
  ["success", "успех", "саксэс", "Зелёный экран success появляется после отправки формы.", "Success - успех.", "Show a success message after submit."],
  ["suitcase", "чемодан", "сьюткейс", "Чемодан suitcase раскрывается с вещами для поездки.", "Suitcase - чемодан.", "The suitcase icon is for travel."],
  ["summer", "лето", "саммер", "Лето summer светит ярким солнцем.", "Summer - лето.", "Use summer colors for this campaign."],
  ["support", "поддержка", "саппорт", "Служба support держит сайт, чтобы он не упал.", "Support - поддержка.", "Contact support if the form fails."],
  ["surprise", "сюрприз", "сёрпрайз", "Коробка surprise открывается неожиданно.", "Surprise почти совпадает с «сюрприз».", "Add a small surprise for users."],
  ["swimming", "плавание", "свимминг", "Человек swimming плывёт через бассейн.", "Swimming - плавание.", "The swimming class page needs a schedule."],
  ["teacher", "учитель", "тичер", "Учитель teacher пишет слово на доске.", "Teacher - учитель.", "The teacher profile needs credentials."],
  ["telephone", "телефон", "телефон", "Телефон telephone звонит на странице контактов.", "Telephone почти совпадает с русским «телефон».", "Add the telephone number."],
  ["temperature", "температура", "темпрэчер", "Термометр temperature показывает жару.", "Temperature почти совпадает с «температура».", "Show the temperature in Celsius."],
  ["theater", "театр", "сиэтер", "Театр theater открывает занавес.", "Theater - театр.", "The theater page needs event cards."],
  ["ticket", "билет", "тикет", "Билет ticket лежит рядом с QR-кодом.", "Ticket - билет или заявка.", "Create a support ticket."],
  ["tool", "инструмент", "тул", "Инструмент tool лежит в панели рядом с иконками.", "Tool - инструмент.", "This tool saves time."],
  ["tourist", "турист", "турист", "Турист tourist держит карту и камеру.", "Tourist почти совпадает с русским «турист».", "The tourist guide needs filters."],
  ["travel", "путешествовать", "трэвел", "Чемодан travel катится по карте мира.", "Travel - путешествие или путешествовать.", "The travel page needs a booking form."],
  ["tree", "дерево", "три", "Три дерева стоят рядом и напоминают tree.", "Tree - дерево.", "Use a tree icon for nature."],
  ["understand", "понимать", "андерстэнд", "Человек стоит under - под схемой, и наконец понимает stand.", "Understand - понять.", "I understand the request."],
  ["useful", "полезный", "юсфул", "Ящик useful полон полезных инструментов.", "Useful - полезный.", "This tip is useful."],
  ["vacation", "отпуск", "вакэйшн", "Календарь vacation закрывает рабочие задачи пляжем.", "Vacation - отпуск.", "The vacation rental page needs photos."],
  ["village", "деревня", "вилледж", "Деревня village с маленькими домами на холме.", "Village - деревня.", "The village tour page needs a map."],
  ["voice", "голос", "войс", "Голос voice выходит из динамика.", "Voice - голос.", "Record a short voice note."],
  ["wallet", "кошелёк", "воллет", "Кошелёк wallet раскрывается с картами.", "Wallet - кошелёк.", "The wallet icon means payment."],
  ["wash", "мыть", "вош", "Вода wash смывает грязь с экрана.", "Wash - мыть.", "Wash the product before the photo."],
  ["weak", "слабый", "вик", "Слабая батарейка weak еле светится.", "Weak - слабый.", "This headline is weak."],
  ["wedding", "свадьба", "вэддинг", "Свадьба wedding с кольцами и белым баннером.", "Wedding - свадьба.", "The wedding page needs a gallery."],
  ["weather", "погода", "вэзер", "Погода weather меняет солнце на дождь.", "Weather - погода.", "Show the weather forecast."],
  ["wheel", "колесо", "вил", "Колесо wheel крутится как загрузчик.", "Wheel - колесо.", "The wheel icon should spin."],
  ["white", "белый", "уайт", "Белый white фон делает текст чище.", "White - белый.", "Use white space around the card."],
  ["wind", "ветер", "винд", "Ветер wind сдувает карточки со страницы.", "Wind - ветер.", "The wind animation is too strong."],
  ["winter", "зима", "винтер", "Зима winter покрывает экран снегом.", "Winter - зима.", "The winter collection is live."],
  ["woman", "женщина", "вуман", "Женщина woman смотрит профиль на сайте.", "Woman - женщина.", "The woman in the photo looks confident."],
  ["world", "мир", "ворлд", "Планета world вращается в hero-блоке.", "World - мир.", "The product works around the world."],
  ["writer", "писатель", "райтер", "Писатель writer печатает текст для сайта.", "Writer - автор текста.", "Ask the writer for final copy."],
  ["yellow", "жёлтый", "йеллоу", "Жёлтая yellow кнопка светится как солнце.", "Yellow - жёлтый.", "The yellow badge is too bright."],
  ["yesterday", "вчера", "йестердэй", "Календарь yesterday показывает вчерашний день.", "Yesterday - вчера.", "I sent the update yesterday."],
  ["young", "молодой", "янг", "Молодой young дизайнер держит свежий макет.", "Young - молодой.", "The brand feels young."],
];

const PAIR_NOUNS = {
  draft: ["черновик", "Share this {term} before approval.", "Отправь {termRu} перед утверждением."],
  message: ["сообщение", "Keep this {term} clear and short.", "Сделай {termRu} понятным и коротким."],
  reply: ["ответ", "Send this {term} in the same thread.", "Отправь {termRu} в той же ветке."],
  question: ["вопрос", "Answer this {term} before the call.", "Ответь на {termRu} до созвона."],
  meeting: ["встреча", "Prepare notes for this {term}.", "Подготовь заметки для {termRu}."],
  brief: ["бриф", "Use this {term} to define the scope.", "Используй {termRu}, чтобы определить объём работ."],
  report: ["отчёт", "Send this {term} with screenshots.", "Отправь {termRu} со скриншотами."],
  revision: ["правка", "Track this {term} in the change list.", "Зафиксируй {termRu} в списке изменений."],
  reminder: ["напоминание", "Send this {term} before the deadline.", "Отправь {termRu} перед дедлайном."],
  call: ["созвон", "Use this {term} to align the team.", "Используй {termRu}, чтобы синхронизировать команду."],
  update: ["обновление", "Send this {term} after the task is done.", "Отправь {termRu}, когда задача готова."],
  request: ["запрос", "Clarify this {term} before work starts.", "Уточни {termRu} до начала работы."],
  feedback: ["обратная связь", "Group this {term} by page.", "Сгруппируй {termRu} по страницам."],
  timeline: ["таймлайн", "Check this {term} before confirming dates.", "Проверь {termRu} перед подтверждением дат."],
  invoice: ["счёт", "Send this {term} after approval.", "Отправь {termRu} после утверждения."],
  note: ["заметка", "Save this {term} in the shared document.", "Сохрани {termRu} в общем документе."],
  summary: ["сводка", "Send this {term} after the meeting.", "Отправь {termRu} после встречи."],
  review: ["ревью", "Use this {term} to find final issues.", "Используй {termRu}, чтобы найти финальные проблемы."],
};

const PREFIXES = {
  payment: ["платёжный", "payment связано с pay - платить", "Представь счёт, карту и зелёную отметку Paid."],
  technical: ["технический", "technical похоже на «техника»", "Представь панель с кодом, настройками и технической задачей."],
  design: ["дизайн", "design почти как «дизайн»", "Представь макет в Figma с сеткой, цветами и карточками."],
};

const PAIR_TERMS = [
  ...["draft", "message", "reply", "question", "meeting", "brief", "report", "revision", "reminder"].map((noun) => ["payment", noun]),
  ...["call", "update", "request", "feedback", "timeline", "invoice", "note", "summary", "review", "draft", "message", "reply", "meeting", "brief", "report", "revision", "reminder"].map((noun) => ["technical", noun]),
  ...["call", "update", "request"].map((noun) => ["design", noun]),
];

const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

const createSimpleDetails = ([word, translation, sound, image, phrase, context]) => ({
  lead: `Для слова ${word} (${translation}) используем короткую звуковую привязку и яркую сцену.`,
  phoneticTitle: "Фонетическая привязка",
  phonetic: [
    { label: sound, text: `Произнеси ${word} и зацепись за звучание «${sound}».` },
    { label: translation, text: phrase },
  ],
  storyTitle: "Сюжет / Фраза",
  story: image,
  visualTitle: "Визуальный образ",
  visual: `Представь крупно: ${image}`,
  linkTitle: "Рабочая связка",
  linkLabel: context,
  linkText: `Повтори фразу: ${context}`,
  noteTitle: "Короткая формула",
  note: `${word} = ${translation}.`,
});

const createPairEntry = ([prefixKey, nounKey]) => {
  const [prefixRu, hook, visual] = PREFIXES[prefixKey];
  const [nounRu, action, actionRu] = PAIR_NOUNS[nounKey];
  const word = `${prefixKey} ${nounKey}`;
  const translation = `${prefixRu} ${nounRu}`;
  const context = fill(action, { term: word });
  return {
    word,
    translation,
    mnemonic: `${word} = ${prefixRu} + ${nounRu}. ${visual}`,
    details: {
      lead: `Для выражения ${word} (${translation}) разложи его на две части: ${prefixKey} + ${nounKey}.`,
      phoneticTitle: "Фонетическая привязка",
      phonetic: [
        { label: prefixKey.toUpperCase(), text: hook },
        { label: nounKey.toUpperCase(), text: `Вторая часть даёт предмет: ${nounRu}.` },
      ],
      storyTitle: "Сюжет / Фраза",
      story: `${visual} Рядом лежит рабочая карточка «${nounKey}», которую нужно обработать.`,
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

const SIMPLE_MNEMONICS = Object.fromEntries(
  SIMPLE_TERMS.map(([word, translation, sound, image, phrase]) => [
    word,
    `${word} звучит как «${sound}». ${image} ${phrase}`,
  ]),
);

const SIMPLE_DETAILS = Object.fromEntries(
  SIMPLE_TERMS.map((entry) => [entry[0], createSimpleDetails(entry)]),
);

const PAIR_ENTRIES = PAIR_TERMS.map(createPairEntry);

export const BATCH_600_MNEMONICS = {
  ...SIMPLE_MNEMONICS,
  ...Object.fromEntries(PAIR_ENTRIES.map((entry) => [entry.word, entry.mnemonic])),
};

export const BATCH_600_MNEMONIC_DETAILS = {
  ...SIMPLE_DETAILS,
  ...Object.fromEntries(PAIR_ENTRIES.map((entry) => [entry.word, entry.details])),
};

