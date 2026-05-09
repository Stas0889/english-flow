export const MNEMONIC_IMAGE_OVERRIDES = {
  fish: {
    mnemonicImage: "mnemonics/fish.svg",
    mnemonicImageAlt: "Рыба, покрытая яркими фишками из казино",
    mnemonicImageDescription:
      "Fish звучит как «фиш». Представь рыбу, у которой вместо чешуи яркие фишки из казино.",
  },
  habit: {
    mnemonicImage: "mnemonics/habit.svg",
    mnemonicImageAlt: "Хоббит с бейсбольной битой",
    mnemonicImageDescription:
      "Habit цепляем за «хоббит + бита»: у хоббита странная привычка - везде носить с собой биту.",
  },
  baker: {
    mnemonicImage: "mnemonics/baker.svg",
    mnemonicImageAlt: "Байкер в пекарне едет верхом на багете",
    mnemonicImageDescription:
      "Baker звучит как «байкер». Представь байкера, который вместо мотоцикла едет на огромном багете: baker = пекарь.",
  },
  flower: {
    mnemonicImage: "mnemonics/flower.svg",
    mnemonicImageAlt: "Цветок из флакона и вееров",
    mnemonicImageDescription:
      "Flower запоминаем как ФЛАкон + ВЕЕР: стебель-флакон, лепестки-веера.",
  },
  field: {
    mnemonicImage: "mnemonics/field.svg",
    mnemonicImageAlt: "Поле, сделанное из рыбного филе",
    mnemonicImageDescription:
      "Field звучит как «филе». Представь поле, где вместо травы лежат куски рыбного филе.",
  },
  forest: {
    mnemonicImage: "mnemonics/forest.svg",
    mnemonicImageAlt: "Лес, сделанный из открытых форточек",
    mnemonicImageDescription:
      "Forest цепляем за «форточки»: лес, где каждое дерево - огромная открытая форточка.",
  },
};

export const getMnemonicImageOverride = (wordKey) =>
  MNEMONIC_IMAGE_OVERRIDES[wordKey];

export default MNEMONIC_IMAGE_OVERRIDES;
