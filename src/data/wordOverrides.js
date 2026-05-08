import { BATCH_100_WORD_OVERRIDES } from "./manualBatch100.js";
import { BATCH_200_WORD_OVERRIDES } from "./manualBatch200.js";
import { BATCH_300_WORD_OVERRIDES } from "./manualBatch300.js";

export const CUSTOM_WORD_OVERRIDES = {
  publish: {
    example: "Do not publish the page yet.",
    exampleTranslation: "Не публикуй страницу пока.",
    workExample:
      "We will publish the updated homepage after the client approves the final copy.",
    workExampleTranslation:
      "Мы опубликуем обновлённую главную после того, как клиент утвердит финальный текст.",
  },
  breakpoint: {
    example: "The mobile breakpoint starts here.",
    exampleTranslation: "Здесь начинается мобильный брейкпоинт.",
    workExample:
      "Check the tablet breakpoint before you send the site for review.",
    workExampleTranslation:
      "Проверь планшетный брейкпоинт перед тем, как отправлять сайт на ревью.",
  },
  component: {
    example: "This component is reused on every page.",
    exampleTranslation: "Этот компонент используется на каждой странице.",
    workExample:
      "Make the pricing card a component so we can update it once.",
    workExampleTranslation:
      "Сделай карточку тарифа компонентом, чтобы мы обновляли её в одном месте.",
  },
  collection: {
    example: "The blog collection has twelve items.",
    exampleTranslation: "В коллекции блога двенадцать элементов.",
    workExample:
      "Connect this card to the CMS collection for case studies.",
    workExampleTranslation:
      "Подключи эту карточку к CMS-коллекции кейсов.",
  },
  revision: {
    example: "This revision looks better.",
    exampleTranslation: "Эта правка выглядит лучше.",
    workExample:
      "The client asked for one more revision of the hero section.",
    workExampleTranslation:
      "Клиент попросил ещё одну правку hero-секции.",
  },
  reply: {
    example: "I will reply after lunch.",
    exampleTranslation: "Я отвечу после обеда.",
    workExample: "Please reply in the client thread before the call.",
    workExampleTranslation:
      "Пожалуйста, ответь в клиентской переписке до созвона.",
  },
  confirm: {
    example: "Please confirm the time.",
    exampleTranslation: "Пожалуйста, подтверди время.",
    workExample: "Please confirm that the launch date is still Friday.",
    workExampleTranslation:
      "Пожалуйста, подтверди, что дата запуска всё ещё пятница.",
  },
  call: {
    example: "We have a call in ten minutes.",
    exampleTranslation: "У нас созвон через десять минут.",
    workExample: "Let us keep this question for the client call.",
    workExampleTranslation:
      "Давай оставим этот вопрос на созвон с клиентом.",
  },
  meeting: {
    example: "The meeting starts at three.",
    exampleTranslation: "Встреча начинается в три.",
    workExample: "I will show the new layout during the design meeting.",
    workExampleTranslation:
      "Я покажу новый макет во время встречи по дизайну.",
  },
  fix: {
    example: "I can fix this today.",
    exampleTranslation: "Я могу исправить это сегодня.",
    workExample: "I need to fix the mobile menu before launch.",
    workExampleTranslation:
      "Мне нужно исправить мобильное меню до запуска.",
  },
  "asset panel": {
    example: "Open the asset panel first.",
    exampleTranslation: "Сначала открой панель ассетов.",
    workExample:
      "Upload the client logos to the asset panel before building the footer.",
    workExampleTranslation:
      "Загрузи логотипы клиента в панель ассетов до сборки футера.",
  },
  "background image": {
    example: "The background image is too dark.",
    exampleTranslation: "Фоновое изображение слишком тёмное.",
    workExample:
      "Replace the background image in the hero with the new brand photo.",
    workExampleTranslation:
      "Замени фоновое изображение в hero-блоке на новое бренд-фото.",
  },
  "base class": {
    example: "This button uses one base class.",
    exampleTranslation: "Эта кнопка использует один базовый класс.",
    workExample:
      "Keep the spacing in the base class and add color changes in modifiers.",
    workExampleTranslation:
      "Оставь отступы в базовом классе, а изменения цвета вынеси в модификаторы.",
  },
  "class manager": {
    example: "The class manager is open.",
    exampleTranslation: "Менеджер классов открыт.",
    workExample:
      "Use the class manager to find old utility classes before cleanup.",
    workExampleTranslation:
      "Используй менеджер классов, чтобы найти старые utility-классы перед чисткой.",
  },
  "class selector": {
    example: "Type the class name in the class selector.",
    exampleTranslation: "Введи имя класса в селектор классов.",
    workExample:
      "Open the class selector and check whether this block already has a combo class.",
    workExampleTranslation:
      "Открой селектор классов и проверь, есть ли у этого блока уже комбо-класс.",
  },
  "component property": {
    example: "This component property changes the title.",
    exampleTranslation: "Это свойство компонента меняет заголовок.",
    workExample:
      "Use a component property to switch the button label between 'Send' and 'Book a call'.",
    workExampleTranslation:
      "Используй свойство компонента, чтобы переключать текст кнопки между 'Send' и 'Book a call'.",
  },
  "component slot": {
    example: "The image goes into the component slot.",
    exampleTranslation: "Изображение вставляется в слот компонента.",
    workExample:
      "Drop the testimonial card into the content slot of the section component.",
    workExampleTranslation:
      "Вставь карточку отзыва в контентный слот компонента секции.",
  },
  "component variant": {
    example: "This component has two variants.",
    exampleTranslation: "У этого компонента два варианта.",
    workExample:
      "Create a dark component variant for the footer CTA.",
    workExampleTranslation:
      "Создай тёмный вариант компонента для CTA в футере.",
  },
  "custom code": {
    example: "This page needs custom code.",
    exampleTranslation: "Этой странице нужен кастомный код.",
    workExample:
      "Add the tracking script to custom code in the page settings.",
    workExampleTranslation:
      "Добавь tracking-скрипт в кастомный код в настройках страницы.",
  },
  "custom domain": {
    example: "The custom domain is connected.",
    exampleTranslation: "Кастомный домен подключён.",
    workExample:
      "Connect the custom domain before we remove the staging link from the client email.",
    workExampleTranslation:
      "Подключи кастомный домен до того, как мы уберём staging-ссылку из письма клиенту.",
  },
  "data attribute": {
    example: "This element has a data attribute.",
    exampleTranslation: "У этого элемента есть data-атрибут.",
    workExample:
      "Add a data attribute to the form button for the analytics event.",
    workExampleTranslation:
      "Добавь data-атрибут на кнопку формы для события аналитики.",
  },
  "designer mode": {
    example: "Designer mode is open.",
    exampleTranslation: "Режим Designer открыт.",
    workExample:
      "Use designer mode to adjust the spacing on the pricing section.",
    workExampleTranslation:
      "Используй режим Designer, чтобы настроить отступы в секции тарифов.",
  },
  "draft page": {
    example: "This is a draft page.",
    exampleTranslation: "Это страница-черновик.",
    workExample:
      "Keep the landing page as a draft page until the client approves the copy.",
    workExampleTranslation:
      "Оставь лендинг страницей-черновиком, пока клиент не утвердит текст.",
  },
  "anchor link": {
    example: "This button uses an anchor link.",
    exampleTranslation: "Эта кнопка использует якорную ссылку.",
    workExample:
      "Add an anchor link from the hero button to the pricing section.",
    workExampleTranslation:
      "Добавь якорную ссылку от кнопки в hero-блоке к секции тарифов.",
  },
  "collection list": {
    example: "The collection list shows blog posts.",
    exampleTranslation: "Список коллекции показывает посты блога.",
    workExample:
      "Use a collection list to show the latest case studies on the homepage.",
    workExampleTranslation:
      "Используй список коллекции, чтобы показать последние кейсы на главной.",
  },
  "collection page": {
    example: "Each blog post has a collection page.",
    exampleTranslation: "У каждого поста блога есть страница коллекции.",
    workExample:
      "Update the collection page template before publishing the new articles.",
    workExampleTranslation:
      "Обнови шаблон страницы коллекции перед публикацией новых статей.",
  },
  "editor mode": {
    example: "Editor mode is for simple content edits.",
    exampleTranslation: "Режим Editor нужен для простых правок контента.",
    workExample:
      "Show the client how to change testimonials in editor mode.",
    workExampleTranslation:
      "Покажи клиенту, как менять отзывы в режиме Editor.",
  },
  "embed block": {
    example: "The embed block contains custom HTML.",
    exampleTranslation: "Embed-блок содержит кастомный HTML.",
    workExample:
      "Place the booking widget inside an embed block on the contact page.",
    workExampleTranslation:
      "Помести виджет бронирования в embed-блок на странице контактов.",
  },
  "form block": {
    example: "The form block has three fields.",
    exampleTranslation: "В блоке формы три поля.",
    workExample:
      "Check the form block before launch to make sure leads are sent correctly.",
    workExampleTranslation:
      "Проверь блок формы до запуска, чтобы заявки отправлялись корректно.",
  },
  "interaction trigger": {
    example: "The interaction trigger starts on hover.",
    exampleTranslation: "Триггер интеракции запускается при hover.",
    workExample:
      "Set the interaction trigger to start when the pricing card enters the viewport.",
    workExampleTranslation:
      "Настрой триггер интеракции на запуск, когда карточка тарифа попадает в область просмотра.",
  },
};

Object.assign(CUSTOM_WORD_OVERRIDES, BATCH_100_WORD_OVERRIDES);
Object.assign(CUSTOM_WORD_OVERRIDES, BATCH_200_WORD_OVERRIDES);
Object.assign(CUSTOM_WORD_OVERRIDES, BATCH_300_WORD_OVERRIDES);

export default CUSTOM_WORD_OVERRIDES;
