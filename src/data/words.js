import {
  BASIC_A1_SEED_TEXT,
  WEBFLOW_SEED_TEXT,
  CLIENT_COMM_SEED_TEXT,
  CLIENT_COMM_LEFTS,
  CLIENT_COMM_RIGHTS,
  DESIGN_QUALITY_LEFTS,
  DESIGN_QUALITY_RIGHTS,
  DESIGN_CONTEXT_LEFTS,
  DESIGN_CONTEXT_RIGHTS,
  DESIGN_STATUS_LEFTS,
  DESIGN_STATUS_RIGHTS,
  WEBFLOW_STRUCTURE_LEFTS,
  WEBFLOW_STRUCTURE_RIGHTS,
  WEBFLOW_INTERFACE_LEFTS,
  WEBFLOW_INTERFACE_RIGHTS,
} from "./wordBank.js";

const rawWords = [
  {
    id: "basic-hello",
    word: "hello",
    translation: "привет",
    transcription: "/həˈləʊ/",
    example: "Hello, I am Alex.",
    exampleTranslation: "Привет, я Алекс.",
    workExample: "Hello, the homepage draft is ready.",
    workExampleTranslation: "Привет, черновик главной страницы готов.",
    image: "👋",
    imagePrompt: "friendly greeting",
    mnemonic: "Hello звучит как дружелюбное «хеллоу» при встрече.",
    category: "Basic A1",
  },
  {
    id: "basic-today",
    word: "today",
    translation: "сегодня",
    transcription: "/təˈdeɪ/",
    example: "Today is Monday.",
    exampleTranslation: "Сегодня понедельник.",
    workExample: "Today I will update the contact page.",
    workExampleTranslation: "Сегодня я обновлю страницу контактов.",
    image: "📅",
    imagePrompt: "calendar marked today",
    mnemonic: "Today похоже на «ту дей» — день, который сейчас.",
    category: "Basic A1",
  },
  {
    id: "basic-help",
    word: "help",
    translation: "помощь; помочь",
    transcription: "/help/",
    example: "Can you help me?",
    exampleTranslation: "Ты можешь мне помочь?",
    workExample: "This guide will help the client use the CMS.",
    workExampleTranslation: "Этот гид поможет клиенту пользоваться CMS.",
    image: "🆘",
    imagePrompt: "help icon",
    mnemonic: "Help легко запомнить как «хелп» — когда нужна помощь.",
    category: "Basic A1",
  },
  {
    id: "basic-page",
    word: "page",
    translation: "страница",
    transcription: "/peɪdʒ/",
    example: "Open the first page.",
    exampleTranslation: "Открой первую страницу.",
    workExample: "The services page needs a new headline.",
    workExampleTranslation: "Странице услуг нужен новый заголовок.",
    image: "📄",
    imagePrompt: "website page",
    mnemonic: "Page похоже на «пейдж» — страница в книге или на сайте.",
    category: "Basic A1",
  },
  {
    id: "basic-text",
    word: "text",
    translation: "текст",
    transcription: "/tekst/",
    example: "The text is short.",
    exampleTranslation: "Текст короткий.",
    workExample: "Please check the hero text before publish.",
    workExampleTranslation: "Проверь текст в hero-блоке перед публикацией.",
    image: "📝",
    imagePrompt: "text lines",
    mnemonic: "Text почти как русское «текст».",
    category: "Basic A1",
  },
  {
    id: "basic-image",
    word: "image",
    translation: "изображение",
    transcription: "/ˈɪmɪdʒ/",
    example: "This image is big.",
    exampleTranslation: "Это изображение большое.",
    workExample: "The image on the about page loads slowly.",
    workExampleTranslation: "Изображение на странице about загружается медленно.",
    image: "🖼️",
    imagePrompt: "website image placeholder",
    mnemonic: "Image похоже на «имидж», то есть визуальный образ.",
    category: "Basic A1",
  },
  {
    id: "basic-color",
    word: "color",
    translation: "цвет",
    transcription: "/ˈkʌlər/",
    example: "My favorite color is blue.",
    exampleTranslation: "Мой любимый цвет — синий.",
    workExample: "The button color is too dark on mobile.",
    workExampleTranslation: "Цвет кнопки слишком тёмный на мобильной версии.",
    image: "🎨",
    imagePrompt: "color swatches",
    mnemonic: "Color — это цвет, как в палитре дизайна.",
    category: "Basic A1",
  },
  {
    id: "basic-button",
    word: "button",
    translation: "кнопка",
    transcription: "/ˈbʌtn/",
    example: "Click the green button.",
    exampleTranslation: "Нажми зелёную кнопку.",
    workExample: "The submit button is below the form.",
    workExampleTranslation: "Кнопка отправки находится под формой.",
    image: "🔘",
    imagePrompt: "button UI control",
    mnemonic: "Button — это «баттон», знакомое слово из интерфейсов.",
    category: "Basic A1",
  },
  {
    id: "basic-menu",
    word: "menu",
    translation: "меню",
    transcription: "/ˈmenjuː/",
    example: "The menu is open.",
    exampleTranslation: "Меню открыто.",
    workExample: "The mobile menu covers the logo.",
    workExampleTranslation: "Мобильное меню перекрывает логотип.",
    image: "📋",
    imagePrompt: "navigation menu",
    mnemonic: "Menu почти как русское «меню».",
    category: "Basic A1",
  },
  {
    id: "basic-form",
    word: "form",
    translation: "форма",
    transcription: "/fɔːm/",
    example: "The form is simple.",
    exampleTranslation: "Форма простая.",
    workExample: "The contact form does not send data.",
    workExampleTranslation: "Контактная форма не отправляет данные.",
    image: "🧾",
    imagePrompt: "contact form",
    mnemonic: "Form — это форма, особенно контактная форма на сайте.",
    category: "Basic A1",
  },
  {
    id: "basic-link",
    word: "link",
    translation: "ссылка",
    transcription: "/lɪŋk/",
    example: "This link is new.",
    exampleTranslation: "Эта ссылка новая.",
    workExample: "Please send me the Webflow link.",
    workExampleTranslation: "Пожалуйста, пришлите мне ссылку на Webflow.",
    image: "🔗",
    imagePrompt: "web link icon",
    mnemonic: "Link — это линк, то есть ссылка.",
    category: "Basic A1",
  },
  {
    id: "basic-client",
    word: "client",
    translation: "клиент",
    transcription: "/ˈklaɪənt/",
    example: "The client is happy.",
    exampleTranslation: "Клиент доволен.",
    workExample: "The client wants a cleaner landing page.",
    workExampleTranslation: "Клиент хочет более чистую landing page.",
    image: "🤝",
    imagePrompt: "client and designer",
    mnemonic: "Client напоминает слово «клиент».",
    category: "Basic A1",
  },
  {
    id: "basic-task",
    word: "task",
    translation: "задача",
    transcription: "/tɑːsk/",
    example: "This task is easy.",
    exampleTranslation: "Эта задача простая.",
    workExample: "My first task is to fix the footer.",
    workExampleTranslation: "Моя первая задача — исправить футер.",
    image: "✅",
    imagePrompt: "task checklist",
    mnemonic: "Task — это таск, рабочая задача.",
    category: "Basic A1",
  },
  {
    id: "webflow-section",
    word: "section",
    translation: "секция",
    transcription: "/ˈsekʃn/",
    example: "This section is short.",
    exampleTranslation: "Эта секция короткая.",
    workExample: "The hero section needs more spacing.",
    workExampleTranslation: "Hero-секции нужно больше отступов.",
    image: "📚",
    imagePrompt: "website section blocks",
    mnemonic: "Section — это секция, кусок страницы.",
    category: "Webflow",
  },
  {
    id: "webflow-container",
    word: "container",
    translation: "контейнер",
    transcription: "/kənˈteɪnə(r)/",
    example: "The container is wide.",
    exampleTranslation: "Контейнер широкий.",
    workExample: "Set the container max width to 1200 pixels.",
    workExampleTranslation: "Поставь контейнеру максимальную ширину 1200 пикселей.",
    image: "📦",
    imagePrompt: "layout container",
    mnemonic: "Container — это контейнер, блок для содержимого.",
    category: "Webflow",
  },
  {
    id: "webflow-grid",
    word: "grid",
    translation: "сетка",
    transcription: "/ɡrɪd/",
    example: "The grid has two columns.",
    exampleTranslation: "У сетки две колонки.",
    workExample: "Use a grid for the team cards.",
    workExampleTranslation: "Используй сетку для карточек команды.",
    image: "🔲",
    imagePrompt: "grid layout",
    mnemonic: "Grid напоминает решётку, то есть сетку.",
    category: "Webflow",
  },
  {
    id: "webflow-class",
    word: "class",
    translation: "класс",
    transcription: "/klɑːs/",
    example: "This class is new.",
    exampleTranslation: "Этот класс новый.",
    workExample: "Rename the class before you publish the page.",
    workExampleTranslation: "Переименуй класс перед публикацией страницы.",
    image: "🏷️",
    imagePrompt: "css class label",
    mnemonic: "Class — тот самый CSS-класс.",
    category: "Webflow",
  },
  {
    id: "webflow-publish",
    word: "publish",
    translation: "публиковать",
    transcription: "/ˈpʌblɪʃ/",
    example: "We publish today.",
    exampleTranslation: "Мы публикуем сегодня.",
    workExample: "Do not publish before the client review.",
    workExampleTranslation: "Не публикуй до проверки клиента.",
    image: "🚀",
    imagePrompt: "publish website",
    mnemonic: "Publish — это выпустить страницу в свет.",
    category: "Webflow",
  },
  {
    id: "webflow-breakpoint",
    word: "breakpoint",
    translation: "брейкпоинт",
    transcription: "/ˈbreɪkpɔɪnt/",
    example: "The tablet breakpoint is active.",
    exampleTranslation: "Планшетный брейкпоинт активен.",
    workExample: "Check the tablet breakpoint before handoff.",
    workExampleTranslation: "Проверь планшетный брейкпоинт перед сдачей.",
    image: "📱",
    imagePrompt: "responsive breakpoints",
    mnemonic: "Breakpoint — точка, где макет «ломается» на другой размер.",
    category: "Webflow",
  },
  {
    id: "webflow-component",
    word: "component",
    translation: "компонент",
    transcription: "/kəmˈpəʊnənt/",
    example: "This component is small.",
    exampleTranslation: "Этот компонент маленький.",
    workExample: "Make the card a reusable component.",
    workExampleTranslation: "Сделай карточку переиспользуемым компонентом.",
    image: "🧩",
    imagePrompt: "ui component",
    mnemonic: "Component — часть интерфейса, компонент.",
    category: "Webflow",
  },
  {
    id: "webflow-interaction",
    word: "interaction",
    translation: "анимация; интеракция",
    transcription: "/ˌɪntərˈækʃn/",
    example: "The interaction is smooth.",
    exampleTranslation: "Анимация плавная.",
    workExample: "Add a hover interaction to the CTA button.",
    workExampleTranslation: "Добавь hover-анимацию на CTA-кнопку.",
    image: "✨",
    imagePrompt: "website interaction",
    mnemonic: "Interaction — это то, как элемент реагирует на действие.",
    category: "Webflow",
  },
  {
    id: "webflow-navbar",
    word: "navbar",
    translation: "панель навигации",
    transcription: "/ˈnævbɑː(r)/",
    example: "The navbar is fixed.",
    exampleTranslation: "Навбар закреплён.",
    workExample: "The navbar logo is too small on desktop.",
    workExampleTranslation: "Логотип в навбаре слишком маленький на десктопе.",
    image: "🧭",
    imagePrompt: "website navbar",
    mnemonic: "Navbar = navigation bar, полоса навигации.",
    category: "Webflow",
  },
  {
    id: "webflow-collection",
    word: "collection",
    translation: "коллекция",
    transcription: "/kəˈlekʃn/",
    example: "The collection is empty.",
    exampleTranslation: "Коллекция пустая.",
    workExample: "Connect the blog card to the CMS collection.",
    workExampleTranslation: "Подключи карточку блога к CMS-коллекции.",
    image: "🗂️",
    imagePrompt: "cms collection list",
    mnemonic: "Collection — это набор элементов, коллекция.",
    category: "Webflow",
  },
  {
    id: "webflow-cms",
    word: "CMS",
    translation: "CMS",
    transcription: "/ˌsiː.emˈes/",
    audioText: "C M S",
    example: "The CMS is simple.",
    exampleTranslation: "CMS простая.",
    workExample: "The client edits testimonials in the CMS.",
    workExampleTranslation: "Клиент редактирует отзывы в CMS.",
    image: "🗃️",
    imagePrompt: "content management system",
    mnemonic: "CMS — система управления контентом.",
    category: "Webflow",
  },
  {
    id: "webflow-slug",
    word: "slug",
    translation: "адресный идентификатор",
    transcription: "/slʌɡ/",
    example: "The slug is short.",
    exampleTranslation: "Slug короткий.",
    workExample: "Change the blog post slug before launch.",
    workExampleTranslation: "Измени slug поста до запуска.",
    image: "🔠",
    imagePrompt: "url slug",
    mnemonic: "Slug — часть URL, короткое имя страницы.",
    category: "Webflow",
  },
  {
    id: "webflow-style",
    word: "style",
    translation: "стиль",
    transcription: "/staɪl/",
    example: "This style is clean.",
    exampleTranslation: "Этот стиль чистый.",
    workExample: "Copy the button style from the main page.",
    workExampleTranslation: "Скопируй стиль кнопки с главной страницы.",
    image: "🎛️",
    imagePrompt: "style settings",
    mnemonic: "Style — это стиль элемента.",
    category: "Webflow",
  },
  {
    id: "design-layout",
    word: "layout",
    translation: "макет; компоновка",
    transcription: "/ˈleɪaʊt/",
    example: "The layout is clean.",
    exampleTranslation: "Макет аккуратный.",
    workExample: "The mobile layout needs one more row.",
    workExampleTranslation: "Мобильному макету нужна ещё одна строка.",
    image: "📐",
    imagePrompt: "website layout",
    mnemonic: "Layout — это то, как всё разложено на странице.",
    category: "Design",
  },
  {
    id: "design-spacing",
    word: "spacing",
    translation: "отступы",
    transcription: "/ˈspeɪsɪŋ/",
    example: "The spacing looks nice.",
    exampleTranslation: "Отступы выглядят хорошо.",
    workExample: "Increase the spacing between cards.",
    workExampleTranslation: "Увеличь отступы между карточками.",
    image: "↔️",
    imagePrompt: "spacing between UI blocks",
    mnemonic: "Spacing связано со space, то есть свободным пространством.",
    category: "Design",
  },
  {
    id: "design-contrast",
    word: "contrast",
    translation: "контраст",
    transcription: "/ˈkɒntrɑːst/",
    example: "The contrast is low.",
    exampleTranslation: "Контраст низкий.",
    workExample: "The text contrast is weak on the hero image.",
    workExampleTranslation: "Контраст текста на hero-изображении слабый.",
    image: "⚫",
    imagePrompt: "high contrast colors",
    mnemonic: "Contrast — разница между светлым и тёмным.",
    category: "Design",
  },
  {
    id: "design-align",
    word: "align",
    translation: "выравнивать",
    transcription: "/əˈlaɪn/",
    example: "Align the title left.",
    exampleTranslation: "Выровняй заголовок по левому краю.",
    workExample: "Align the icons with the text labels.",
    workExampleTranslation: "Выровняй иконки по текстовым подписям.",
    image: "📏",
    imagePrompt: "align UI elements",
    mnemonic: "Align — поставить элементы на одну линию.",
    category: "Design",
  },
  {
    id: "design-font",
    word: "font",
    translation: "шрифт",
    transcription: "/fɒnt/",
    example: "This font is easy to read.",
    exampleTranslation: "Этот шрифт легко читать.",
    workExample: "Use the same font in the footer and hero.",
    workExampleTranslation: "Используй один и тот же шрифт в футере и hero.",
    image: "🔤",
    imagePrompt: "font sample",
    mnemonic: "Font — это шрифт в интерфейсе.",
    category: "Design",
  },
  {
    id: "design-icon",
    word: "icon",
    translation: "иконка",
    transcription: "/ˈaɪkɒn/",
    example: "The icon is small.",
    exampleTranslation: "Иконка маленькая.",
    workExample: "Replace the old social icon in the footer.",
    workExampleTranslation: "Замени старую иконку соцсети в футере.",
    image: "🔔",
    imagePrompt: "ui icon",
    mnemonic: "Icon — знакомая иконка.",
    category: "Design",
  },
  {
    id: "design-hero",
    word: "hero",
    translation: "главный экран; hero-блок",
    transcription: "/ˈhɪərəʊ/",
    example: "The hero is bright.",
    exampleTranslation: "Hero-блок яркий.",
    workExample: "The hero needs a stronger headline.",
    workExampleTranslation: "Hero-блоку нужен более сильный заголовок.",
    image: "🌟",
    imagePrompt: "hero section",
    mnemonic: "Hero — первый большой блок страницы, главный герой экрана.",
    category: "Design",
  },
  {
    id: "design-template",
    word: "template",
    translation: "шаблон",
    transcription: "/ˈtempleɪt/",
    example: "This template is simple.",
    exampleTranslation: "Этот шаблон простой.",
    workExample: "Use one template for all project pages.",
    workExampleTranslation: "Используй один шаблон для всех страниц проекта.",
    image: "📑",
    imagePrompt: "design template",
    mnemonic: "Template — это шаблон, заготовка.",
    category: "Design",
  },
  {
    id: "design-responsive",
    word: "responsive",
    translation: "адаптивный",
    transcription: "/rɪˈspɒnsɪv/",
    example: "The site is responsive.",
    exampleTranslation: "Сайт адаптивный.",
    workExample: "We need a responsive gallery for mobile.",
    workExampleTranslation: "Нам нужна адаптивная галерея для мобильных.",
    image: "📲",
    imagePrompt: "responsive website",
    mnemonic: "Responsive — значит хорошо реагирует на размер экрана.",
    category: "Design",
  },
  {
    id: "design-margin",
    word: "margin",
    translation: "внешний отступ",
    transcription: "/ˈmɑːdʒɪn/",
    example: "The margin is too big.",
    exampleTranslation: "Внешний отступ слишком большой.",
    workExample: "Reduce the top margin above the form.",
    workExampleTranslation: "Уменьши верхний внешний отступ над формой.",
    image: "⬜",
    imagePrompt: "margin around card",
    mnemonic: "Margin — это воздух вокруг блока.",
    category: "Design",
  },
  {
    id: "design-padding",
    word: "padding",
    translation: "внутренний отступ",
    transcription: "/ˈpædɪŋ/",
    example: "The padding is small.",
    exampleTranslation: "Внутренний отступ маленький.",
    workExample: "Add more padding inside the CTA card.",
    workExampleTranslation: "Добавь больше внутреннего отступа в CTA-карточку.",
    image: "🪟",
    imagePrompt: "padding inside box",
    mnemonic: "Padding — это мягкий внутренний отступ внутри блока.",
    category: "Design",
  },
  {
    id: "design-palette",
    word: "palette",
    translation: "палитра",
    transcription: "/ˈpælət/",
    example: "The palette is soft.",
    exampleTranslation: "Палитра мягкая.",
    workExample: "The new palette fits the brand better.",
    workExampleTranslation: "Новая палитра лучше подходит бренду.",
    image: "🖌️",
    imagePrompt: "color palette",
    mnemonic: "Palette — набор цветов дизайна.",
    category: "Design",
  },
  {
    id: "design-frame",
    word: "frame",
    translation: "фрейм; рамка",
    transcription: "/freɪm/",
    example: "The frame is large.",
    exampleTranslation: "Фрейм большой.",
    workExample: "Put the testimonial card inside one frame.",
    workExampleTranslation: "Помести карточку отзыва в один фрейм.",
    image: "🪟",
    imagePrompt: "design frame",
    mnemonic: "Frame — это рамка или рабочий фрейм в макете.",
    category: "Design",
  },
  {
    id: "comm-update",
    word: "update",
    translation: "обновление; обновить",
    transcription: "/ʌpˈdeɪt/",
    example: "I have an update.",
    exampleTranslation: "У меня есть обновление.",
    workExample: "I will update the layout today.",
    workExampleTranslation: "Я обновлю макет сегодня.",
    image: "🔄",
    imagePrompt: "project update",
    mnemonic: "Update — обновление проекта.",
    category: "Client Communication",
  },
  {
    id: "comm-approve",
    word: "approve",
    translation: "одобрить",
    transcription: "/əˈpruːv/",
    example: "They approve the plan.",
    exampleTranslation: "Они одобряют план.",
    workExample: "Please approve the new homepage design.",
    workExampleTranslation: "Пожалуйста, одобрите новый дизайн главной страницы.",
    image: "👍",
    imagePrompt: "approval icon",
    mnemonic: "Approve — сказать проекту «да».",
    category: "Client Communication",
  },
  {
    id: "comm-feedback",
    word: "feedback",
    translation: "обратная связь",
    transcription: "/ˈfiːdbæk/",
    example: "Your feedback is clear.",
    exampleTranslation: "Твоя обратная связь понятная.",
    workExample: "Thank you for the feedback on the pricing page.",
    workExampleTranslation: "Спасибо за обратную связь по странице pricing.",
    image: "💬",
    imagePrompt: "feedback comments",
    mnemonic: "Feedback — это комментарии и замечания.",
    category: "Client Communication",
  },
  {
    id: "comm-deadline",
    word: "deadline",
    translation: "дедлайн",
    transcription: "/ˈdedlaɪn/",
    example: "The deadline is Friday.",
    exampleTranslation: "Дедлайн в пятницу.",
    workExample: "We can finish the landing page before the deadline.",
    workExampleTranslation: "Мы можем закончить лендинг до дедлайна.",
    image: "⏰",
    imagePrompt: "deadline reminder",
    mnemonic: "Deadline — крайний срок проекта.",
    category: "Client Communication",
  },
  {
    id: "comm-invoice",
    word: "invoice",
    translation: "счёт",
    transcription: "/ˈɪnvɔɪs/",
    example: "The invoice is ready.",
    exampleTranslation: "Счёт готов.",
    workExample: "I will send the final invoice after launch.",
    workExampleTranslation: "Я отправлю финальный счёт после запуска.",
    image: "💳",
    imagePrompt: "invoice document",
    mnemonic: "Invoice — это счёт клиенту.",
    category: "Client Communication",
  },
  {
    id: "comm-call",
    word: "call",
    translation: "звонок; созвон",
    transcription: "/kɔːl/",
    example: "We have a call at six.",
    exampleTranslation: "У нас созвон в шесть.",
    workExample: "Let us discuss the brief on a short call.",
    workExampleTranslation: "Давай обсудим бриф на коротком созвоне.",
    image: "📞",
    imagePrompt: "phone call",
    mnemonic: "Call — это звонок или созвон.",
    category: "Client Communication",
  },
  {
    id: "comm-meeting",
    word: "meeting",
    translation: "встреча",
    transcription: "/ˈmiːtɪŋ/",
    example: "The meeting is online.",
    exampleTranslation: "Встреча онлайн.",
    workExample: "The design meeting starts in ten minutes.",
    workExampleTranslation: "Встреча по дизайну начнётся через десять минут.",
    image: "🗓️",
    imagePrompt: "online meeting",
    mnemonic: "Meeting — это встреча с клиентом или командой.",
    category: "Client Communication",
  },
  {
    id: "comm-revision",
    word: "revision",
    translation: "правка; ревизия",
    transcription: "/rɪˈvɪʒn/",
    example: "This revision is small.",
    exampleTranslation: "Эта правка небольшая.",
    workExample: "The client asked for one more revision of the hero.",
    workExampleTranslation: "Клиент попросил ещё одну правку hero-блока.",
    image: "✏️",
    imagePrompt: "design revision",
    mnemonic: "Revision — это правка или доработка.",
    category: "Client Communication",
  },
  {
    id: "comm-issue",
    word: "issue",
    translation: "проблема",
    transcription: "/ˈɪʃuː/",
    example: "There is one issue.",
    exampleTranslation: "Есть одна проблема.",
    workExample: "There is an issue with the form validation.",
    workExampleTranslation: "Есть проблема с валидацией формы.",
    image: "⚠️",
    imagePrompt: "project issue warning",
    mnemonic: "Issue — это проблема или вопрос, который надо решить.",
    category: "Client Communication",
  },
  {
    id: "comm-fix",
    word: "fix",
    translation: "исправить",
    transcription: "/fɪks/",
    example: "I can fix it.",
    exampleTranslation: "Я могу это исправить.",
    workExample: "I need to fix the mobile version.",
    workExampleTranslation: "Мне нужно исправить мобильную версию.",
    image: "🛠️",
    imagePrompt: "fix bug",
    mnemonic: "Fix — быстрое исправление ошибки.",
    category: "Client Communication",
  },
  {
    id: "comm-send",
    word: "send",
    translation: "отправить",
    transcription: "/send/",
    example: "Please send the file.",
    exampleTranslation: "Пожалуйста, отправь файл.",
    workExample: "Please send the final copy for the hero section.",
    workExampleTranslation: "Пожалуйста, отправь финальный текст для hero-секции.",
    image: "📤",
    imagePrompt: "send file",
    mnemonic: "Send — это отправить сообщение, файл или ссылку.",
    category: "Client Communication",
  },
  {
    id: "comm-reply",
    word: "reply",
    translation: "ответить",
    transcription: "/rɪˈplaɪ/",
    example: "I will reply later.",
    exampleTranslation: "Я отвечу позже.",
    workExample: "Please reply in the client thread today.",
    workExampleTranslation: "Пожалуйста, ответь сегодня в клиентской переписке.",
    image: "↩️",
    imagePrompt: "reply to message",
    mnemonic: "Reply — это дать ответ.",
    category: "Client Communication",
  },
  {
    id: "comm-confirm",
    word: "confirm",
    translation: "подтвердить",
    transcription: "/kənˈfɜːm/",
    example: "Can you confirm it?",
    exampleTranslation: "Ты можешь это подтвердить?",
    workExample: "Please confirm the deadline for the launch.",
    workExampleTranslation: "Пожалуйста, подтвердите дедлайн запуска.",
    image: "✔️",
    imagePrompt: "confirm action",
    mnemonic: "Confirm — сделать что-то официально подтверждённым.",
    category: "Client Communication",
  },
];

const CATEGORY_META = {
  "Basic A1": {
    image: "🗣️",
    imagePrompt: "basic everyday english vocabulary",
    difficulty: "easy",
  },
  Webflow: {
    image: "🧱",
    imagePrompt: "Webflow development vocabulary",
    difficulty: "medium",
  },
  Design: {
    image: "🎯",
    imagePrompt: "design vocabulary card",
    difficulty: "medium",
  },
  "Client Communication": {
    image: "💼",
    imagePrompt: "client communication vocabulary",
    difficulty: "medium",
  },
};

const RIGHT_GENDERS = {
  clientCommunication: {
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
  },
  designQuality: {
    layout: "m",
    style: "m",
    contrast: "m",
    hierarchy: "f",
    composition: "f",
    palette: "f",
    typography: "f",
    interface: "m",
    grid: "f",
    spacing: "m",
  },
  designContext: {
    layout: "m",
    version: "f",
    concept: "f",
    direction: "n",
    system: "f",
    guide: "m",
    section: "f",
    component: "m",
    grid: "f",
    style: "m",
  },
  designStatus: {
    draft: "m",
    revision: "f",
    version: "f",
    concept: "f",
    mockup: "m",
    direction: "n",
    palette: "f",
    option: "m",
    frame: "m",
    style: "m",
  },
  webflowStructure: {
    item: "m",
    field: "n",
    template: "m",
    page: "f",
    settings: "pl",
    class: "m",
    section: "f",
    component: "m",
    style: "m",
    layout: "m",
  },
  webflowInterface: {
    view: "m",
    mode: "m",
    settings: "pl",
    issue: "f",
    update: "n",
    state: "n",
    panel: "f",
    access: "m",
    version: "f",
    link: "f",
  },
};

const SEED_SOURCE_CONFIG = [
  { text: BASIC_A1_SEED_TEXT, category: "Basic A1", prefix: "seed-basic" },
  { text: WEBFLOW_SEED_TEXT, category: "Webflow", prefix: "seed-webflow" },
  {
    text: CLIENT_COMM_SEED_TEXT,
    category: "Client Communication",
    prefix: "seed-client-communication",
  },
];

const CATEGORY_REFERENCE_LABELS = {
  word: { en: "word", ruNom: "слово", ruAcc: "слово", ruAdj: "полезно" },
  term: { en: "term", ruNom: "термин", ruAcc: "термин", ruAdj: "полезен" },
  phrase: { en: "phrase", ruNom: "фраза", ruAcc: "фразу", ruAdj: "полезна" },
  expression: {
    en: "expression",
    ruNom: "выражение",
    ruAcc: "выражение",
    ruAdj: "полезно",
  },
};

const RECIPE_SOURCE_CONFIG = [
  {
    lefts: CLIENT_COMM_LEFTS,
    rights: CLIENT_COMM_RIGHTS,
    category: "Client Communication",
    prefix: "pair-client-communication",
    genderMap: RIGHT_GENDERS.clientCommunication,
  },
  {
    lefts: DESIGN_QUALITY_LEFTS,
    rights: DESIGN_QUALITY_RIGHTS,
    category: "Design",
    prefix: "pair-design-quality",
    genderMap: RIGHT_GENDERS.designQuality,
  },
  {
    lefts: DESIGN_CONTEXT_LEFTS,
    rights: DESIGN_CONTEXT_RIGHTS,
    category: "Design",
    prefix: "pair-design-context",
    genderMap: RIGHT_GENDERS.designContext,
  },
  {
    lefts: DESIGN_STATUS_LEFTS,
    rights: DESIGN_STATUS_RIGHTS,
    category: "Design",
    prefix: "pair-design-status",
    genderMap: RIGHT_GENDERS.designStatus,
  },
  {
    lefts: WEBFLOW_STRUCTURE_LEFTS,
    rights: WEBFLOW_STRUCTURE_RIGHTS,
    category: "Webflow",
    prefix: "pair-webflow-structure",
    genderMap: RIGHT_GENDERS.webflowStructure,
  },
  {
    lefts: WEBFLOW_INTERFACE_LEFTS,
    rights: WEBFLOW_INTERFACE_RIGHTS,
    category: "Webflow",
    prefix: "pair-webflow-interface",
    genderMap: RIGHT_GENDERS.webflowInterface,
  },
];

const EXAMPLE_BUILDERS = {
  "Basic A1": [
    (word, _translation, reference) => ({
      example: `The ${reference.en} "${word}" often appears in simple English.`,
      exampleTranslation: `${reference.ruNom === "выражение" ? "Выражение" : "Слово"} "${word}" часто встречается в простом английском.`,
      workExample: `You may see the ${reference.en} "${word}" in a short work message.`,
      workExampleTranslation: `Ты можешь встретить ${reference.ruAcc} "${word}" в коротком рабочем сообщении.`,
    }),
    (word, _translation, reference) => ({
      example: `The ${reference.en} "${word}" is useful for beginner English.`,
      exampleTranslation: `${reference.ruNom === "выражение" ? "Выражение" : "Слово"} "${word}" ${reference.ruAdj} для начинающего уровня английского.`,
      workExample: `I added the ${reference.en} "${word}" to today's study list.`,
      workExampleTranslation: `Я добавил ${reference.ruAcc} "${word}" в сегодняшний список для изучения.`,
    }),
    (word, _translation, reference) => ({
      example: `I want to remember the ${reference.en} "${word}" today.`,
      exampleTranslation: `Я хочу запомнить ${reference.ruAcc} "${word}" сегодня.`,
      workExample: `The ${reference.en} "${word}" can appear in a simple client chat.`,
      workExampleTranslation: `${reference.ruNom === "выражение" ? "Выражение" : "Слово"} "${word}" может встретиться в простом чате с клиентом.`,
    }),
  ],
  Webflow: [
    (word, _translation, reference) => ({
      example: `The ${reference.en} "${word}" is common in Webflow.`,
      exampleTranslation: `Термин "${word}" часто встречается в Webflow.`,
      workExample: `We discussed the ${reference.en} "${word}" while updating a Webflow project.`,
      workExampleTranslation: `Мы обсуждали ${reference.ruAcc} "${word}", когда обновляли проект в Webflow.`,
    }),
    (word, _translation, reference) => ({
      example: `You may see the ${reference.en} "${word}" in the Webflow interface.`,
      exampleTranslation: `Ты можешь увидеть ${reference.ruAcc} "${word}" в интерфейсе Webflow.`,
      workExample: `The team checked the ${reference.en} "${word}" before publishing the site.`,
      workExampleTranslation: `Команда проверила ${reference.ruAcc} "${word}" перед публикацией сайта.`,
    }),
    (word, _translation, reference) => ({
      example: `The ${reference.en} "${word}" appears in many Webflow tasks.`,
      exampleTranslation: `Термин "${word}" встречается во многих задачах по Webflow.`,
      workExample: `I noted the ${reference.en} "${word}" while preparing the handoff in Webflow.`,
      workExampleTranslation: `Я отметил ${reference.ruAcc} "${word}", когда готовил передачу проекта в Webflow.`,
    }),
  ],
  Design: [
    (word, _translation, reference) => ({
      example: `The ${reference.en} "${word}" is useful in design discussions.`,
      exampleTranslation: `Термин "${word}" полезен в обсуждениях дизайна.`,
      workExample: `We mentioned the ${reference.en} "${word}" while reviewing the layout.`,
      workExampleTranslation: `Мы упомянули ${reference.ruAcc} "${word}", когда проверяли макет.`,
    }),
    (word, _translation, reference) => ({
      example: `Designers often use the ${reference.en} "${word}".`,
      exampleTranslation: `Дизайнеры часто используют ${reference.ruAcc} "${word}".`,
      workExample: `I used the ${reference.en} "${word}" in feedback about the interface.`,
      workExampleTranslation: `Я использовал ${reference.ruAcc} "${word}" в комментарии по интерфейсу.`,
    }),
    (word, _translation, reference) => ({
      example: `I want to remember the ${reference.en} "${word}" for design discussions.`,
      exampleTranslation: `Я хочу запомнить ${reference.ruAcc} "${word}" для обсуждений дизайна.`,
      workExample: `The designer wrote about the ${reference.en} "${word}" in the latest comment.`,
      workExampleTranslation: `Дизайнер написал про ${reference.ruAcc} "${word}" в последнем комментарии.`,
    }),
  ],
  "Client Communication": [
    (word, _translation, reference) => ({
      example: `The ${reference.en} "${word}" is useful in client messages.`,
      exampleTranslation: `${reference.ruNom === "слово" ? "Слово" : "Фраза"} "${word}" ${reference.ruAdj} в сообщениях клиенту.`,
      workExample: `I used the ${reference.en} "${word}" in a message to the client today.`,
      workExampleTranslation: `Я использовал ${reference.ruAcc} "${word}" в сообщении клиенту сегодня.`,
    }),
    (word, _translation, reference) => ({
      example: `We often hear the ${reference.en} "${word}" on project calls.`,
      exampleTranslation: `Мы часто слышим ${reference.ruAcc} "${word}" на проектных созвонах.`,
      workExample: `The client asked about the ${reference.en} "${word}" during the project review.`,
      workExampleTranslation: `Клиент спросил про ${reference.ruAcc} "${word}" во время ревью проекта.`,
    }),
    (word, _translation, reference) => ({
      example: `The ${reference.en} "${word}" appears in work chats.`,
      exampleTranslation: `${reference.ruNom === "слово" ? "Слово" : "Фраза"} "${word}" встречается в рабочих чатах.`,
      workExample: `I saved the ${reference.en} "${word}" for the next client follow-up.`,
      workExampleTranslation: `Я сохранил ${reference.ruAcc} "${word}" для следующего сообщения клиенту.`,
    }),
  ],
};

const MNEMONIC_BUILDERS = {
  "Basic A1": [
    (word, translation) =>
      `Проговори "${word}" вслух и свяжи его с переводом "${translation}".`,
    (word, translation) =>
      `Представь простой диалог, где встречается "${word}", и вспомни перевод "${translation}".`,
  ],
  Webflow: [
    (word, translation) =>
      `Представь задачу в Webflow, где нужен термин "${word}", и повтори "${translation}".`,
    (word, translation) =>
      `Свяжи "${word}" с экраном Webflow и запомни перевод "${translation}".`,
  ],
  Design: [
    (word, translation) =>
      `Представь экран или макет, где нужен "${word}", и повтори "${translation}".`,
    (word, translation) =>
      `Свяжи "${word}" с обсуждением дизайна и запомни перевод "${translation}".`,
  ],
  "Client Communication": [
    (word, translation) =>
      `Представь сообщение клиенту с фразой "${word}" и свяжи её с переводом "${translation}".`,
    (word, translation) =>
      `Проговори "${word}" как часть рабочего чата и запомни перевод "${translation}".`,
  ],
};

const ADJECTIVE_ENDINGS = {
  m: "",
  f: "ая",
  n: "ое",
  pl: "ые",
};

const SOFT_ADJECTIVE_ENDINGS = {
  m: "",
  f: "яя",
  n: "ее",
  pl: "ие",
};

const normalizeWhitespace = (value = "") =>
  value.replace(/\s+/g, " ").trim();

const normalizeWordKey = (value = "") => normalizeWhitespace(value).toLowerCase();

const slugifyWord = (value = "") => {
  const slug = normalizeWordKey(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "term";
};

const createPseudoTranscription = (value = "") => {
  const cleaned = normalizeWordKey(value)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ");
  return cleaned ? `/${cleaned}/` : "/term/";
};

const createGeneratedCreatedAt = (index) => {
  const month = (Math.floor(index / 28) % 12) + 1;
  const year = 2026 + Math.floor(index / (28 * 12));
  const day = (index % 28) + 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const chooseTemplate = (templates, index) =>
  templates[index % templates.length];

const getReferenceLabels = (word, category) => {
  const hasSpace = /\s|-/.test(word);
  if (category === "Client Communication") {
    return hasSpace
      ? CATEGORY_REFERENCE_LABELS.phrase
      : CATEGORY_REFERENCE_LABELS.word;
  }

  if (category === "Webflow" || category === "Design") {
    return CATEGORY_REFERENCE_LABELS.term;
  }

  return hasSpace
    ? CATEGORY_REFERENCE_LABELS.expression
    : CATEGORY_REFERENCE_LABELS.word;
};

const buildMnemonic = (word, translation, category, index) => {
  const templates = MNEMONIC_BUILDERS[category] ?? MNEMONIC_BUILDERS["Basic A1"];
  return chooseTemplate(templates, index)(word, translation);
};

const buildExamples = (word, translation, category, index) => {
  const templates = EXAMPLE_BUILDERS[category] ?? EXAMPLE_BUILDERS["Basic A1"];
  return chooseTemplate(templates, index)(
    word,
    translation,
    getReferenceLabels(word, category),
  );
};

const inflectRussianAdjective = (adjective, gender) => {
  if (!gender) {
    return adjective;
  }

  if (gender === "m") {
    return adjective;
  }

  if (adjective.endsWith("ский")) {
    const base = adjective.slice(0, -4);
    return `${base}${{ f: "ская", n: "ское", pl: "ские" }[gender]}`;
  }

  if (adjective.endsWith("нний")) {
    const base = adjective.slice(0, -4);
    return `${base}${{ f: "нняя", n: "ннее", pl: "нние" }[gender]}`;
  }

  if (adjective.endsWith("щий")) {
    const base = adjective.slice(0, -3);
    return `${base}${{ f: "щая", n: "щее", pl: "щие" }[gender]}`;
  }

  if (adjective.endsWith("ий")) {
    const base = adjective.slice(0, -2);
    return `${base}${SOFT_ADJECTIVE_ENDINGS[gender]}`;
  }

  if (adjective.endsWith("ый") || adjective.endsWith("ой")) {
    const base = adjective.slice(0, -2);
    return `${base}${ADJECTIVE_ENDINGS[gender]}`;
  }

  return adjective;
};

const createPairTranslation = (left, right, genderMap = {}) => {
  const gender = genderMap[right.en];
  const nounLikeLeft = /[A-Z]/.test(left.ru) ||
    ["collection", "editor", "designer", "preview", "staging"].includes(
      left.ru,
    );

  if (left.ru === "дизайн") {
    return `${right.ru} по дизайну`;
  }

  if (nounLikeLeft) {
    return `${left.ru}-${right.ru}`;
  }

  return `${inflectRussianAdjective(left.ru, gender)} ${right.ru}`;
};

const buildGeneratedWord = ({
  word,
  translation,
  category,
  prefix,
  index,
}) => {
  const cleanWord = normalizeWhitespace(word);
  const cleanTranslation = normalizeWhitespace(translation);
  const meta = CATEGORY_META[category] ?? CATEGORY_META["Basic A1"];
  const examples = buildExamples(cleanWord, cleanTranslation, category, index);

  return {
    id: `${prefix}-${slugifyWord(cleanWord)}`,
    word: cleanWord,
    translation: cleanTranslation,
    transcription: createPseudoTranscription(cleanWord),
    audioText: cleanWord,
    example: examples.example,
    exampleTranslation: examples.exampleTranslation,
    workExample: examples.workExample,
    workExampleTranslation: examples.workExampleTranslation,
    image: meta.image,
    imagePrompt: meta.imagePrompt,
    mnemonic: buildMnemonic(cleanWord, cleanTranslation, category, index),
    category,
    difficulty: meta.difficulty,
  };
};

const parseSeedWords = ({ text, category, prefix }) =>
  text
    .split("\n")
    .map((line) => normalizeWhitespace(line))
    .filter(Boolean)
    .map((line, index) => {
      const [word, translation] = line.split("|").map((part) => part?.trim());
      return buildGeneratedWord({
        word,
        translation,
        category,
        prefix,
        index,
      });
    });

const generatePairWords = ({
  lefts,
  rights,
  category,
  prefix,
  genderMap,
}) => {
  const items = [];

  lefts.forEach((left, leftIndex) => {
    rights.forEach((right, rightIndex) => {
      items.push(
        buildGeneratedWord({
          word: `${left.en} ${right.en}`,
          translation: createPairTranslation(left, right, genderMap),
          category,
          prefix,
          index: leftIndex * rights.length + rightIndex,
        }),
      );
    });
  });

  return items;
};

const generatedSeedWords = SEED_SOURCE_CONFIG.flatMap(parseSeedWords);
const generatedPairWords = RECIPE_SOURCE_CONFIG.flatMap(generatePairWords);

const uniqueWords = [];
const seenWords = new Set();

[...rawWords, ...generatedSeedWords, ...generatedPairWords].forEach((item) => {
  const key = normalizeWordKey(item.word);
  if (seenWords.has(key)) {
    return;
  }

  seenWords.add(key);
  uniqueWords.push(item);
});

export const WORDS_DATA = uniqueWords.map((item, index) => ({
  audioText: item.audioText ?? item.word,
  difficulty: item.difficulty ?? "easy",
  reviewStage: item.reviewStage ?? 0,
  nextReviewDate: item.nextReviewDate ?? null,
  errorCount: item.errorCount ?? 0,
  status: item.status ?? "new",
  createdAt: item.createdAt ?? createGeneratedCreatedAt(index),
  ...item,
}));

export default WORDS_DATA;
