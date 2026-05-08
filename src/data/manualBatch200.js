const WEBFLOW_TERMS = [
  ["trigger type", "тип триггера", "Trigger type — тип события, которое запускает анимацию.", "The trigger type is set to hover.", "Тип триггера установлен на hover.", "Change the trigger type from click to scroll into view.", "Поменяй тип триггера с click на scroll into view.", "Представь переключатель: click, hover, scroll. Он решает, когда стартует анимация.", "scroll trigger type", "тип триггера scroll"],
  ["typography panel", "панель типографики", "Typography panel — панель для шрифтов, размеров и line-height.", "The typography panel controls the heading style.", "Панель типографики управляет стилем заголовка.", "Use the typography panel to reduce the line height on mobile.", "Используй панель типографики, чтобы уменьшить line-height на мобильной версии.", "Представь пульт управления буквами: шрифт, размер, вес, высота строки.", "typography panel settings", "настройки панели типографики"],
  ["undo history", "история undo", "Undo history — список шагов, которые можно откатить.", "The undo history shows the last change.", "История undo показывает последнее изменение.", "Check undo history if the layout changed by mistake.", "Проверь историю undo, если макет случайно изменился.", "Представь машину времени для правок: можно вернуться на шаг назад.", "undo history step", "шаг истории undo"],
  ["utility class", "утилитарный класс", "Utility class — маленький класс для одной частой задачи.", "This utility class adds margin.", "Этот утилитарный класс добавляет margin.", "Use a utility class for small spacing fixes.", "Используй утилитарный класс для небольших правок отступов.", "Представь маленький инструмент в ящике: один класс — одна полезная функция.", "spacing utility class", "утилитарный класс отступов"],
  ["variable mode", "режим переменных", "Variable mode — режим, где меняются значения дизайн-переменных.", "The variable mode changes the color theme.", "Режим переменных меняет цветовую тему.", "Use variable mode to switch between light and dark themes.", "Используй режим переменных для переключения светлой и тёмной темы.", "Представь панель, где один переключатель меняет набор цветов проекта.", "dark variable mode", "тёмный режим переменных"],
  ["visibility setting", "настройка видимости", "Visibility setting — настройка, показывать элемент или скрывать.", "The visibility setting hides the block on mobile.", "Настройка видимости скрывает блок на мобильной версии.", "Change the visibility setting for the desktop-only banner.", "Измени настройку видимости для баннера только на десктопе.", "Представь выключатель света для блока: видно или не видно.", "mobile visibility setting", "настройка видимости на мобильной версии"],
  ["webfont loader", "загрузчик веб-шрифтов", "Webfont loader — механизм загрузки шрифтов сайта.", "The webfont loader delays the first render.", "Загрузчик веб-шрифтов задерживает первый рендер.", "Check the webfont loader if the font flashes on page load.", "Проверь webfont loader, если шрифт мигает при загрузке страницы.", "Представь курьера, который приносит шрифты в браузер до показа страницы.", "webfont loader issue", "проблема загрузчика веб-шрифтов"],
  ["workflow state", "состояние workflow", "Workflow state — текущий этап процесса или автоматизации.", "The workflow state is pending.", "Состояние workflow — pending.", "Show the workflow state in the client dashboard.", "Покажи состояние workflow в клиентском dashboard.", "Представь статус на конвейере: pending, approved, completed.", "approved workflow state", "состояние workflow approved"],
  ["workspace access", "доступ к workspace", "Workspace access — права входа в рабочее пространство.", "Workspace access is limited.", "Доступ к workspace ограничен.", "Give the designer workspace access before the handoff.", "Дай дизайнеру доступ к workspace перед передачей проекта.", "Представь ключ-карту, которая открывает рабочее пространство проекта.", "client workspace access", "доступ клиента к workspace"],
  ["workspace role", "роль в workspace", "Workspace role — уровень прав пользователя в workspace.", "Her workspace role is editor.", "Её роль в workspace — editor.", "Set the client workspace role to editor, not admin.", "Поставь клиенту роль editor в workspace, а не admin.", "Представь бейдж на участнике: owner, admin, editor, viewer.", "editor workspace role", "роль editor в workspace"],
  ["z index", "z-index", "Z index — порядок слоёв по глубине.", "The z index puts the modal above the navbar.", "Z-index ставит модалку выше навбара.", "Increase the z index so the dropdown appears above the hero image.", "Увеличь z-index, чтобы dropdown был выше hero-изображения.", "Представь стопку прозрачных листов: z-index решает, какой лист сверху.", "modal z index", "z-index модального окна"],
  ["404 page", "страница 404", "404 page — страница для несуществующего адреса.", "The 404 page needs a link home.", "Странице 404 нужна ссылка на главную.", "Add a helpful message to the 404 page before launch.", "Добавь полезное сообщение на страницу 404 перед запуском.", "Представь пользователя у закрытой двери: адрес не найден, но есть путь назад.", "custom 404 page", "кастомная страница 404"],
  ["301 redirect", "редирект 301", "301 redirect — постоянное перенаправление со старого URL на новый.", "The 301 redirect works correctly.", "Редирект 301 работает корректно.", "Add a 301 redirect from the old services page to the new URL.", "Добавь редирект 301 со старой страницы услуг на новый URL.", "Представь дорожный знак: старый адрес закрыт, езжайте сюда.", "301 redirect rule", "правило редиректа 301"],
];

const CLIENT_CORE_TERMS = [
  ["availability", "доступность", "Availability — когда человек свободен для созвона или работы.", "What is your availability this week?", "Какая у тебя доступность на этой неделе?", "Please share your availability for a short review call.", "Пожалуйста, пришли свою доступность для короткого ревью-созвона.", "Представь календарь с зелёными свободными слотами.", "weekly availability", "доступность на неделю"],
  ["clarification", "уточнение", "Clarification связано с clear: сделать туманный вопрос ясным.", "I need one clarification.", "Мне нужно одно уточнение.", "Can you send a clarification about the mobile menu behavior?", "Можешь прислать уточнение по поведению мобильного меню?", "Представь мутное стекло, которое протирают до полной ясности.", "quick clarification", "быстрое уточнение"],
  ["confirmation", "подтверждение", "Confirmation — письменное «да, всё верно».", "Thank you for the confirmation.", "Спасибо за подтверждение.", "I need confirmation before I publish the page.", "Мне нужно подтверждение перед публикацией страницы.", "Представь зелёную галочку рядом с датой запуска.", "final confirmation", "финальное подтверждение"],
  ["consultation", "консультация", "Consultation — разговор, где эксперт помогает выбрать решение.", "The consultation starts at noon.", "Консультация начинается в полдень.", "We can discuss the CMS structure during the consultation.", "Мы можем обсудить структуру CMS во время консультации.", "Представь созвон, где вопрос раскладывают по полочкам.", "design consultation", "консультация по дизайну"],
  ["discovery call", "ознакомительный созвон", "Discovery call — первый созвон, где вы открываете вводные проекта.", "The discovery call is tomorrow.", "Ознакомительный созвон завтра.", "Prepare questions for the discovery call with the client.", "Подготовь вопросы для ознакомительного созвона с клиентом.", "Представь карту проекта, которую вы впервые разворачиваете на столе.", "client discovery call", "ознакомительный созвон с клиентом"],
  ["escalation", "эскалация", "Escalation — когда вопрос поднимают выше, потому что он стал серьёзнее.", "This issue needs escalation.", "Эта проблема требует эскалации.", "Escalate the payment issue if the client does not reply.", "Эскалируй вопрос оплаты, если клиент не ответит.", "Представь лифт, который поднимает проблему на уровень менеджера.", "issue escalation", "эскалация проблемы"],
  ["expectation", "ожидание", "Expectation — то, чего клиент ждёт от результата.", "The expectation is clear.", "Ожидание понятно.", "Set the right expectation about the launch timeline.", "Сформируй правильное ожидание по срокам запуска.", "Представь табличку «что клиент ждёт» перед стартом работы.", "client expectation", "ожидание клиента"],
  ["invoice reminder", "напоминание о счёте", "Invoice reminder — вежливое напоминание оплатить счёт.", "I sent an invoice reminder.", "Я отправил напоминание о счёте.", "Send an invoice reminder if payment is not received by Friday.", "Отправь напоминание о счёте, если оплата не поступит до пятницы.", "Представь мягкий будильник рядом с PDF-счётом.", "polite invoice reminder", "вежливое напоминание о счёте"],
  ["kickoff", "старт проекта", "Kickoff — официальный старт работы.", "The kickoff is scheduled for Monday.", "Старт проекта запланирован на понедельник.", "Create a kickoff checklist for the Webflow project.", "Создай checklist старта для Webflow-проекта.", "Представь первый удар по мячу: проект начинается.", "project kickoff", "старт проекта"],
  ["launch notice", "уведомление о запуске", "Launch notice — сообщение, что сайт запускается или уже запущен.", "The launch notice is ready.", "Уведомление о запуске готово.", "Send a launch notice after the domain is connected.", "Отправь уведомление о запуске после подключения домена.", "Представь короткое письмо: сайт уже live.", "site launch notice", "уведомление о запуске сайта"],
  ["maintenance", "поддержка", "Maintenance — регулярное обслуживание сайта после запуска.", "The site needs maintenance.", "Сайту нужна поддержка.", "Offer monthly maintenance after the launch.", "Предложи ежемесячную поддержку после запуска.", "Представь техосмотр сайта: обновления, мелкие правки, проверки.", "monthly maintenance", "ежемесячная поддержка"],
  ["meeting link", "ссылка на встречу", "Meeting link — ссылка, по которой все заходят на созвон.", "Please send the meeting link.", "Пожалуйста, пришли ссылку на встречу.", "Add the meeting link to the calendar invite.", "Добавь ссылку на встречу в приглашение календаря.", "Представь дверь в Zoom или Google Meet.", "Zoom meeting link", "ссылка на Zoom-встречу"],
  ["next step", "следующий шаг", "Next step — что делаем дальше после обсуждения.", "What is the next step?", "Какой следующий шаг?", "The next step is to approve the homepage copy.", "Следующий шаг — утвердить текст главной страницы.", "Представь лестницу проекта: после одной ступени видна следующая.", "clear next step", "понятный следующий шаг"],
  ["offboarding", "завершение сотрудничества", "Offboarding — аккуратное завершение работы и передача всего нужного.", "Offboarding starts after launch.", "Завершение сотрудничества начинается после запуска.", "Prepare offboarding notes for the client.", "Подготовь заметки по завершению сотрудничества для клиента.", "Представь финальную коробку: доступы, инструкции, ссылки.", "client offboarding", "завершение сотрудничества с клиентом"],
  ["onboarding", "онбординг", "Onboarding — ввод человека в проект.", "The onboarding is simple.", "Онбординг простой.", "Send the onboarding guide before the first call.", "Отправь onboarding-гид перед первым созвоном.", "Представь посадку на борт проекта: человеку дают карту и правила.", "client onboarding", "онбординг клиента"],
  ["payment proof", "подтверждение оплаты", "Payment proof — доказательство, что оплата прошла.", "Please send payment proof.", "Пожалуйста, пришли подтверждение оплаты.", "Upload the payment proof to the shared document.", "Загрузи подтверждение оплаты в общий документ.", "Представь скриншот платежа с суммой и датой.", "payment proof screenshot", "скриншот подтверждения оплаты"],
  ["progress check", "проверка прогресса", "Progress check — короткая сверка, что уже сделано.", "Let us do a progress check.", "Давай сделаем проверку прогресса.", "Schedule a progress check before the design review.", "Запланируй проверку прогресса перед дизайн-ревью.", "Представь контрольную точку на дороге проекта.", "weekly progress check", "еженедельная проверка прогресса"],
  ["retainer", "ретейнер", "Retainer — постоянная поддержка за фиксированную оплату.", "The retainer covers small updates.", "Ретейнер покрывает небольшие обновления.", "Offer a retainer for monthly Webflow support.", "Предложи ретейнер для ежемесячной поддержки Webflow.", "Представь абонемент на регулярные правки сайта.", "monthly retainer", "ежемесячный ретейнер"],
  ["review cycle", "цикл ревью", "Review cycle — круг: показать, получить комментарии, исправить.", "The review cycle is short.", "Цикл ревью короткий.", "Limit the project to two review cycles.", "Ограничь проект двумя циклами ревью.", "Представь круг правок: send, feedback, fix, review again.", "second review cycle", "второй цикл ревью"],
  ["revision round", "раунд правок", "Revision round — отдельный заход правок.", "This is the final revision round.", "Это финальный раунд правок.", "Start the next revision round after client feedback.", "Начни следующий раунд правок после обратной связи клиента.", "Представь боксерский раунд, только вместо ударов — комментарии и исправления.", "final revision round", "финальный раунд правок"],
  ["screen recording", "запись экрана", "Screen recording — видео с экрана, чтобы показать баг или процесс.", "The screen recording shows the issue.", "Запись экрана показывает проблему.", "Send a screen recording of the mobile menu bug.", "Отправь запись экрана с багом мобильного меню.", "Представь камеру, которая снимает всё, что происходит на экране.", "bug screen recording", "запись экрана с багом"],
  ["shared document", "общий документ", "Shared document — документ, доступный всем участникам.", "The shared document has the brief.", "В общем документе есть бриф.", "Add the launch checklist to the shared document.", "Добавь checklist запуска в общий документ.", "Представь один документ, где команда и клиент видят одни и те же заметки.", "shared project document", "общий документ проекта"],
  ["status check", "проверка статуса", "Status check — быстрый вопрос: где мы сейчас.", "Can we do a status check?", "Можем сделать проверку статуса?", "Send a status check before the weekly call.", "Отправь проверку статуса перед еженедельным созвоном.", "Представь табло проекта: pending, in progress, done.", "quick status check", "быстрая проверка статуса"],
  ["support window", "окно поддержки", "Support window — период, когда ты поддерживаешь проект после запуска.", "The support window is two weeks.", "Окно поддержки — две недели.", "Define the support window in the proposal.", "Определи окно поддержки в предложении.", "Представь временное окно после запуска, когда мелкие правки ещё входят в работу.", "two-week support window", "двухнедельное окно поддержки"],
  ["turnaround", "срок выполнения", "Turnaround — время от запроса до готового результата.", "The turnaround is two days.", "Срок выполнения — два дня.", "Confirm the turnaround for urgent CMS updates.", "Подтверди срок выполнения срочных CMS-обновлений.", "Представь задачу как бумеранг: улетела и вернулась готовой.", "fast turnaround", "быстрый срок выполнения"],
  ["urgency", "срочность", "Urgency — насколько быстро нужно реагировать.", "The urgency is high.", "Срочность высокая.", "Ask the client to confirm the urgency of this request.", "Попроси клиента подтвердить срочность этого запроса.", "Представь красный маркер рядом с задачей в списке.", "high urgency", "высокая срочность"],
  ["voice note", "голосовая заметка", "Voice note — короткое голосовое сообщение.", "I sent a voice note.", "Я отправил голосовую заметку.", "Send a voice note if the explanation is easier to say.", "Отправь голосовую заметку, если объяснение проще проговорить.", "Представь маленькую аудиоволну в чате клиента.", "short voice note", "короткая голосовая заметка"],
  ["action item", "пункт действия", "Action item — конкретный пункт, который надо выполнить.", "This action item is for today.", "Этот пункт действия на сегодня.", "Add each action item to the follow-up message.", "Добавь каждый пункт действия в follow-up сообщение.", "Представь checkbox после встречи: не мысль, а конкретное действие.", "meeting action item", "пункт действия после встречи"],
  ["deadline shift", "сдвиг дедлайна", "Deadline shift — перенос крайнего срока.", "The deadline shift is approved.", "Сдвиг дедлайна одобрен.", "Explain the deadline shift before the next client call.", "Объясни сдвиг дедлайна перед следующим созвоном с клиентом.", "Представь дату в календаре, которую двигают вправо.", "approved deadline shift", "одобренный сдвиг дедлайна"],
  ["contract term", "условие договора", "Contract term — конкретное условие в договоре.", "This contract term covers revisions.", "Это условие договора покрывает правки.", "Check the contract term about payment before sending the invoice.", "Проверь условие договора об оплате перед отправкой счёта.", "Представь пункт договора с выделенной строкой.", "payment contract term", "условие договора об оплате"],
  ["client portal", "клиентский портал", "Client portal — личный кабинет или пространство для клиента.", "The client portal has all files.", "В клиентском портале есть все файлы.", "Upload the final handoff files to the client portal.", "Загрузи финальные файлы передачи в клиентский портал.", "Представь закрытую комнату клиента со ссылками, файлами и статусом проекта.", "client portal access", "доступ к клиентскому порталу"],
  ["bug report", "отчёт об ошибке", "Bug report — описание бага со шагами и контекстом.", "The bug report includes a screenshot.", "Отчёт об ошибке включает скриншот.", "Ask for a bug report before debugging the form issue.", "Попроси отчёт об ошибке перед отладкой проблемы формы.", "Представь карточку бага: что случилось, где, как повторить.", "form bug report", "отчёт об ошибке формы"],
  ["approval chain", "цепочка согласования", "Approval chain — люди, через которых проходит утверждение.", "The approval chain is long.", "Цепочка согласования длинная.", "Clarify the approval chain before the design review.", "Уточни цепочку согласования перед дизайн-ревью.", "Представь цепочку людей, каждый ставит свою галочку.", "design approval chain", "цепочка согласования дизайна"],
  ["payment schedule", "график оплаты", "Payment schedule — даты и суммы оплат.", "The payment schedule is in the proposal.", "График оплаты в предложении.", "Add the second milestone to the payment schedule.", "Добавь вторую веху в график оплаты.", "Представь календарь с датами и суммами платежей.", "project payment schedule", "график оплаты проекта"],
];

const PAIR_NOUNS = {
  call: ["созвон", "Use this call to resolve one clear question.", "Используй этот созвон, чтобы решить один конкретный вопрос."],
  update: ["обновление", "Send this update after the main task is done.", "Отправь это обновление после выполнения основной задачи."],
  request: ["запрос", "Clarify this request before starting the work.", "Уточни этот запрос перед началом работы."],
  feedback: ["обратная связь", "Group this feedback by page before making changes.", "Сгруппируй эту обратную связь по страницам перед внесением правок."],
  timeline: ["таймлайн", "Review this timeline before confirming the deadline.", "Проверь этот таймлайн перед подтверждением дедлайна."],
  invoice: ["счёт", "Send this invoice after the milestone is approved.", "Отправь этот счёт после утверждения вехи."],
  note: ["заметка", "Save this note in the shared document.", "Сохрани эту заметку в общем документе."],
  summary: ["сводка", "Send this summary after the meeting.", "Отправь эту сводку после встречи."],
  review: ["ревью", "Use this review to catch final issues.", "Используй это ревью, чтобы поймать финальные проблемы."],
  draft: ["черновик", "Share this draft before publishing anything.", "Отправь этот черновик перед любой публикацией."],
  message: ["сообщение", "Keep this message short and clear.", "Сделай это сообщение коротким и понятным."],
  reply: ["ответ", "Send this reply in the same thread.", "Отправь этот ответ в той же ветке."],
  question: ["вопрос", "Answer this question before the next step.", "Ответь на этот вопрос перед следующим шагом."],
  meeting: ["встреча", "Prepare the agenda for this meeting.", "Подготовь agenda для этой встречи."],
  brief: ["бриф", "Use this brief to define the scope.", "Используй этот бриф, чтобы определить объём работ."],
  report: ["отчёт", "Send this report with screenshots.", "Отправь этот отчёт со скриншотами."],
  revision: ["правка", "Track this revision in the change list.", "Зафиксируй эту правку в списке изменений."],
  reminder: ["напоминание", "Send this reminder before the deadline.", "Отправь это напоминание перед дедлайном."],
};

const PAIR_PREFIXES = {
  client: ["клиентский", "клиентская", "клиентское", "от клиента", "Представь сообщение или действие, которое напрямую связано с клиентом."],
  project: ["проектный", "проектная", "проектное", "по проекту", "Представь рабочий контекст всего проекта: сроки, задачи, ревью и статус."],
  final: ["финальный", "финальная", "финальное", "на финальном этапе", "Представь последний этап перед сдачей или публикацией."],
};

const PAIR_GENDER = {
  call: "m",
  update: "n",
  request: "m",
  feedback: "f",
  timeline: "m",
  invoice: "m",
  note: "f",
  summary: "f",
  review: "n",
  draft: "m",
  message: "n",
  reply: "m",
  question: "m",
  meeting: "f",
  brief: "m",
  report: "m",
  revision: "f",
  reminder: "n",
};

const selectAdjective = (prefix, noun) => {
  const gender = PAIR_GENDER[noun];
  const forms = PAIR_PREFIXES[prefix];
  if (gender === "f") return forms[1];
  if (gender === "n") return forms[2];
  return forms[0];
};

const createPairTerm = (prefix, noun) => {
  const [translation, workExample, workExampleTranslation] = PAIR_NOUNS[noun];
  const prefixForms = PAIR_PREFIXES[prefix];
  const adjective = selectAdjective(prefix, noun);
  const word = `${prefix} ${noun}`;
  const ru = `${adjective} ${translation}`;

  return {
    word,
    translation: ru,
    mnemonic: `${word} = ${prefix} + ${noun}. ${prefixForms[4]}`,
    example: `This ${noun} is important.`,
    exampleTranslation: `Этот элемент коммуникации важен: ${ru}.`,
    workExample,
    workExampleTranslation,
    story: `${prefixForms[4]} Свяжи ${word} с ситуацией ${prefixForms[3]}: ${ru}.`,
    visual: `Представь карточку в рабочем чате с подписью "${word}" и коротким действием по проекту.`,
    phrase: word,
    phraseRu: ru,
  };
};

const PAIR_TERMS = [
  ...Object.keys(PAIR_NOUNS).map((noun) => createPairTerm("client", noun)),
  ...Object.keys(PAIR_NOUNS).map((noun) => createPairTerm("project", noun)),
  ...Object.keys(PAIR_NOUNS)
    .slice(0, 17)
    .map((noun) => createPairTerm("final", noun)),
];

const createWebflowDetails = (entry) => ({
  lead: `Для выражения ${entry.word} лучше всего работает рабочий образ: ${entry.mnemonic}`,
  phoneticTitle: "Фонетическая привязка",
  phonetic: [
    { label: entry.phrase.toUpperCase(), text: entry.mnemonic },
    { label: "РАБОЧИЙ ОБРАЗ", text: entry.visual },
  ],
  storyTitle: "Сюжет / Фраза",
  story: entry.story,
  visualTitle: "Визуальный образ",
  visual: entry.visual,
  linkTitle: "Связка",
  linkLabel: entry.phrase,
  linkText: `${entry.phrase} = ${entry.phraseRu}.`,
  noteTitle: "Рабочий контекст",
  note: `В Webflow это помогает точнее обсуждать ${entry.translation} без длинных объяснений.`,
});

const createClientDetails = (entry) => ({
  lead: `Для выражения ${entry.word} лучше всего работает рабочая сцена: ${entry.mnemonic}`,
  phoneticTitle: "Фонетическая привязка",
  phonetic: [
    { label: entry.word.toUpperCase(), text: entry.mnemonic },
    { label: "РАБОЧИЙ ОБРАЗ", text: entry.visual },
  ],
  storyTitle: "Сюжет / Фраза",
  story: entry.story,
  visualTitle: "Визуальный образ",
  visual: entry.visual,
  linkTitle: "Связка",
  linkLabel: entry.phrase,
  linkText: `${entry.phrase} = ${entry.phraseRu}.`,
  noteTitle: "Рабочий контекст",
  note: `В клиентской коммуникации это помогает коротко назвать ${entry.translation} и не объяснять мысль длинной фразой.`,
});

const toEntry = (item) => ({
  word: item[0],
  translation: item[1],
  mnemonic: item[2],
  example: item[3],
  exampleTranslation: item[4],
  workExample: item[5],
  workExampleTranslation: item[6],
  story: item[7],
  visual: item[7],
  phrase: item[8],
  phraseRu: item[9],
  type: "webflow",
});

const BATCH_200_TERMS = [
  ...WEBFLOW_TERMS.map(toEntry),
  ...CLIENT_CORE_TERMS.map((item) => ({ ...toEntry(item), type: "client" })),
  ...PAIR_TERMS.map((item) => ({ ...item, type: "client" })),
];

export const BATCH_200_WORD_OVERRIDES = Object.fromEntries(
  BATCH_200_TERMS.map((entry) => [
    entry.word.toLowerCase(),
    {
      example: entry.example,
      exampleTranslation: entry.exampleTranslation,
      workExample: entry.workExample,
      workExampleTranslation: entry.workExampleTranslation,
    },
  ]),
);

export const BATCH_200_MNEMONICS = Object.fromEntries(
  BATCH_200_TERMS.map((entry) => [entry.word.toLowerCase(), entry.mnemonic]),
);

export const BATCH_200_MNEMONIC_DETAILS = Object.fromEntries(
  BATCH_200_TERMS.map((entry) => [
    entry.word.toLowerCase(),
    entry.type === "webflow"
      ? createWebflowDetails(entry)
      : createClientDetails(entry),
  ]),
);

export default BATCH_200_MNEMONICS;
