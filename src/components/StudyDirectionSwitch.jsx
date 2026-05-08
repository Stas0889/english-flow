const StudyDirectionSwitch = ({
  value,
  onChange,
  description = "RU → EN тренирует вспоминание слова для речи и переписки.",
}) => (
  <div className="study-mode-panel" aria-label="Режим изучения слов">
    <div>
      <strong>Режим карточек</strong>
      <p className="muted">{description}</p>
    </div>
    <div className="study-mode-switch" role="group" aria-label="Направление перевода">
      <button
        type="button"
        className={value === "en-ru" ? "active" : ""}
        onClick={() => onChange("en-ru")}
        aria-pressed={value === "en-ru"}
      >
        EN → RU
      </button>
      <button
        type="button"
        className={value === "ru-en" ? "active" : ""}
        onClick={() => onChange("ru-en")}
        aria-pressed={value === "ru-en"}
      >
        RU → EN
      </button>
    </div>
  </div>
);

export default StudyDirectionSwitch;
