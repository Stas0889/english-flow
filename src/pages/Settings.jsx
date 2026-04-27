import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const CATEGORY_OPTIONS = [
  "Basic A1",
  "Webflow",
  "Design",
  "Client Communication",
];

const Settings = () => {
  const { exportAppData, importAppData, resetProgress, settings, updateSettings } =
    useOutletContext();
  const [message, setMessage] = useState("");

  const handleExport = () => {
    const backup = exportAppData();
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "english-flow-backup.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Экспорт выполнен.");
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      importAppData(JSON.parse(text));
      setMessage("Импорт выполнен.");
    } catch (error) {
      setMessage("Не удалось импортировать JSON.");
    } finally {
      event.target.value = "";
    }
  };

  const handleReset = () => {
    if (window.confirm("Сбросить весь прогресс приложения?")) {
      resetProgress();
      setMessage("Прогресс сброшен.");
    }
  };

  const handleCategoryToggle = (category) => {
    const activeCategories = settings.activeCategories || [];

    if (activeCategories.includes(category) && activeCategories.length === 1) {
      setMessage("Нужна хотя бы одна активная категория.");
      return;
    }

    const nextCategories = activeCategories.includes(category)
      ? activeCategories.filter((item) => item !== category)
      : [...activeCategories, category];

    updateSettings({ activeCategories: nextCategories });
    setMessage("");
  };

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Управление</p>
          <h2>Настройки</h2>
          <p className="page-hero-text">
            Базовые параметры приложения и резервное копирование localStorage.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            {settings.newWordsPerDay} слов в день
          </span>
          <span className="summary-pill">{settings.voiceAccent}</span>
        </div>
      </div>

      <div className="settings-grid settings-grid-advanced">
        <article className="card settings-card">
          <div className="settings-section-head">
            <h3>Режим обучения</h3>
            <p className="muted">
              Настрой темп новых слов и озвучку под свой режим.
            </p>
          </div>

          <div className="detail-block">
            <strong>Быстрый выбор темпа</strong>
            <div className="segmented-group">
              {[3, 5, 7, 10].map((count) => (
                <button
                  key={count}
                  type="button"
                  className={
                    settings.newWordsPerDay === count
                      ? "segment-button segment-button-active"
                      : "segment-button"
                  }
                  onClick={() => updateSettings({ newWordsPerDay: count })}
                >
                  {count} слов
                </button>
              ))}
            </div>
          </div>

          <label className="form-field">
            <span>Новых слов в день</span>
            <input
              type="number"
              min="0"
              max="20"
              className="input"
              value={settings.newWordsPerDay}
              onChange={(event) =>
                updateSettings({
                  newWordsPerDay: Math.max(
                    0,
                    Math.min(20, Number(event.target.value) || 0),
                  ),
                })
              }
            />
          </label>

          <div className="detail-block">
            <strong>Акцент озвучки</strong>
            <div className="segmented-group">
              {["en-US", "en-GB"].map((accent) => (
                <button
                  key={accent}
                  type="button"
                  className={
                    settings.voiceAccent === accent
                      ? "segment-button segment-button-active"
                      : "segment-button"
                  }
                  onClick={() => updateSettings({ voiceAccent: accent })}
                >
                  {accent}
                </button>
              ))}
            </div>
          </div>

          <div className="toggle-grid">
            <button
              type="button"
              className={
                settings.phraseOfTheDay
                  ? "toggle-card toggle-card-active"
                  : "toggle-card"
              }
              onClick={() =>
                updateSettings({ phraseOfTheDay: !settings.phraseOfTheDay })
              }
            >
              <strong>Фраза дня</strong>
              <span>
                {settings.phraseOfTheDay ? "Включена" : "Выключена"}
              </span>
            </button>
            <button
              type="button"
              className={
                settings.grammarEnabled
                  ? "toggle-card toggle-card-active"
                  : "toggle-card"
              }
              onClick={() =>
                updateSettings({ grammarEnabled: !settings.grammarEnabled })
              }
            >
              <strong>Грамматика</strong>
              <span>
                {settings.grammarEnabled ? "Доступна" : "Скрыта"}
              </span>
            </button>
          </div>
        </article>

        <article className="card settings-card">
          <div className="settings-section-head">
            <h3>Активные категории</h3>
            <p className="muted">
              Они влияют на то, какие слова попадут в ежедневную сессию.
            </p>
          </div>

          <div className="category-toggle-grid">
            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  settings.activeCategories.includes(category)
                    ? "category-toggle category-toggle-active"
                    : "category-toggle"
                }
                onClick={() => handleCategoryToggle(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="muted">
            Активно: {settings.activeCategories.length} из {CATEGORY_OPTIONS.length}.
          </p>
        </article>

        <article className="card settings-card settings-card-wide">
          <div className="settings-section-head">
            <h3>Данные и резервная копия</h3>
            <p className="muted">
              Экспортируй данные, восстанови JSON или очисти прогресс.
            </p>
          </div>

          <div className="button-row">
            <button type="button" className="button" onClick={handleExport}>
              Экспорт в JSON
            </button>
            <label className="button button-secondary file-button">
              Импорт JSON
              <input type="file" accept="application/json" onChange={handleImport} />
            </label>
            <button
              type="button"
              className="button button-danger"
              onClick={handleReset}
            >
              Сбросить прогресс
            </button>
          </div>

          {message ? <p className="notice">{message}</p> : null}
        </article>
      </div>
    </section>
  );
};

export default Settings;
