import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const CATEGORY_OPTIONS = [
  "Basic A1",
  "Webflow",
  "Design",
  "Client Communication",
];

const Settings = () => {
  const {
    auth,
    exportAppData,
    importAppData,
    loadCloudState,
    resetProgress,
    saveCloudState,
    settings,
    updateSettings,
  } = useOutletContext();
  const [message, setMessage] = useState("");
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [cloudBusy, setCloudBusy] = useState(false);

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

  const handleAuthSubmit = async (mode) => {
    setCloudBusy(true);
    setMessage("");

    try {
      if (mode === "signup") {
        await auth.signUp(authForm);
        setMessage("Аккаунт создан. Если Supabase попросит подтверждение, проверь почту.");
      } else {
        await auth.signIn(authForm);
        setMessage("Вход выполнен.");
      }
    } catch (error) {
      setMessage(error.message || "Не удалось выполнить вход.");
    } finally {
      setCloudBusy(false);
    }
  };

  const handleCloudSave = async () => {
    setCloudBusy(true);
    setMessage("");

    try {
      await saveCloudState();
      setMessage("Прогресс сохранён в облако.");
    } catch (error) {
      setMessage(error.message || "Не удалось сохранить прогресс.");
    } finally {
      setCloudBusy(false);
    }
  };

  const handleCloudLoad = async () => {
    if (
      !window.confirm(
        "Загрузить прогресс из облака? Текущие локальные данные будут заменены.",
      )
    ) {
      return;
    }

    setCloudBusy(true);
    setMessage("");

    try {
      await loadCloudState();
      setMessage("Прогресс загружен из облака.");
    } catch (error) {
      setMessage(error.message || "Не удалось загрузить прогресс.");
    } finally {
      setCloudBusy(false);
    }
  };

  const handleSignOut = async () => {
    setCloudBusy(true);
    setMessage("");

    try {
      await auth.signOut();
      setMessage("Выход выполнен.");
    } catch (error) {
      setMessage(error.message || "Не удалось выйти.");
    } finally {
      setCloudBusy(false);
    }
  };

  const handleResendEmail = async () => {
    if (!authForm.email.trim()) {
      setMessage("Введи email, чтобы отправить письмо ещё раз.");
      return;
    }

    setCloudBusy(true);
    setMessage("");

    try {
      await auth.resendSignupEmail(authForm.email.trim());
      setMessage("Письмо подтверждения отправлено ещё раз. Проверь почту.");
    } catch (error) {
      setMessage(error.message || "Не удалось отправить письмо.");
    } finally {
      setCloudBusy(false);
    }
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
        <article className="card settings-card settings-card-wide">
          <div className="settings-section-head">
            <h3>Аккаунт и облако</h3>
            <p className="muted">
              Пока приложение работает локально. После входа можно вручную
              сохранить прогресс в Supabase и восстановить его на другом
              устройстве.
            </p>
          </div>

          {!auth.isSupabaseConfigured ? (
            <p className="notice">
              Supabase не настроен. Добавь переменные VITE_SUPABASE_URL и
              VITE_SUPABASE_PUBLISHABLE_KEY.
            </p>
          ) : auth.user ? (
            <div className="cloud-account-panel">
              <div className="detail-block">
                <strong>Ты вошёл как</strong>
                <span className="muted">{auth.user.email}</span>
              </div>
              <div className="button-row">
                <button
                  type="button"
                  className="button"
                  disabled={cloudBusy}
                  onClick={handleCloudSave}
                >
                  Сохранить в облако
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  disabled={cloudBusy}
                  onClick={handleCloudLoad}
                >
                  Загрузить из облака
                </button>
                <button
                  type="button"
                  className="button button-light"
                  disabled={cloudBusy}
                  onClick={handleSignOut}
                >
                  Выйти
                </button>
              </div>
              {message ? <p className="notice">{message}</p> : null}
            </div>
          ) : (
            <div className="cloud-auth-form">
              <label className="form-field">
                <span>Email</span>
                <input
                  type="email"
                  className="input"
                  autoComplete="email"
                  value={authForm.email}
                  onChange={(event) =>
                    setAuthForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="form-field">
                <span>Пароль</span>
                <input
                  type="password"
                  className="input"
                  autoComplete="current-password"
                  value={authForm.password}
                  onChange={(event) =>
                    setAuthForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                />
              </label>
              <div className="button-row">
                <button
                  type="button"
                  className="button"
                  disabled={
                    cloudBusy ||
                    auth.authLoading ||
                    !authForm.email.trim() ||
                    !authForm.password
                  }
                  onClick={() => handleAuthSubmit("signin")}
                >
                  Войти
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  disabled={
                    cloudBusy ||
                    auth.authLoading ||
                    !authForm.email.trim() ||
                    !authForm.password
                  }
                  onClick={() => handleAuthSubmit("signup")}
                >
                  Создать аккаунт
                </button>
                <button
                  type="button"
                  className="button button-light"
                  disabled={cloudBusy || auth.authLoading || !authForm.email.trim()}
                  onClick={handleResendEmail}
                >
                  Отправить письмо ещё раз
                </button>
              </div>
              {message ? <p className="notice">{message}</p> : null}
            </div>
          )}
        </article>

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
