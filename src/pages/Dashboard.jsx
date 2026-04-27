import { Link, useOutletContext } from "react-router-dom";
import AudioButton from "../components/AudioButton";
import { capitalizeWord } from "../utils/text";

const Dashboard = () => {
  const {
    categoryInsights,
    dailyPhrases,
    dailyState,
    dueWords,
    settings,
    studyInsights,
    stats,
    todayNewWords,
    pauseNewWordsForToday,
    weakWords,
  } = useOutletContext();

  const reviewPreview = dueWords.slice(0, 4);
  const learnPreview = todayNewWords.slice(0, 4);
  const weakWordsPreview = weakWords.slice(0, 4);
  const phraseLead = dailyPhrases[0];
  const extraPhrases = dailyPhrases.slice(1);
  const strongestCategory = [...categoryInsights]
    .sort((left, right) => right.learned - left.learned)[0];
  const recommendedMode = dueWords.length
    ? {
        label: "Сначала повторение",
        description:
          "У тебя уже есть слова в очереди. Быстрее всего начать с их закрепления, а потом перейти к новым карточкам.",
      }
    : {
        label: "Можно брать новые слова",
        description:
          "Очередь повторения лёгкая. Сегодня можно спокойно пройти новую сессию без перегруза.",
      };

  return (
    <section className="stack">
      <section className="page-hero dashboard-hero">
        <div className="page-hero-copy">
          <p className="page-kicker">Сегодняшний фокус</p>
          <h2>Короткая ежедневная практика без перегруза</h2>
          <p className="page-hero-text">
            English Flow держит простой ритм: новые слова, интервальное
            повторение и рабочие фразы для Webflow, дизайна и клиентской
            коммуникации.
          </p>

          <div className="button-row hero-actions">
            <Link to="/learn" className="button">
              Учить новые слова
            </Link>
            <Link to="/review" className="button button-secondary">
              Повторить слова
            </Link>
            <Link to="/practice" className="button button-secondary">
              Практика
            </Link>
            <button
              type="button"
              className="button button-light"
              onClick={pauseNewWordsForToday}
              disabled={dailyState.newWordsPausedToday}
            >
              Сегодня без новых слов
            </button>
          </div>
        </div>

          <div className="hero-summary">
          <div className="hero-summary-item">
            <span>Новых карточек</span>
            <strong>{todayNewWords.length}</strong>
          </div>
          <div className="hero-summary-item">
            <span>Очередь повторения</span>
            <strong>{dueWords.length}</strong>
          </div>
          <div className="hero-summary-item">
            <span>Серия практики</span>
            <strong>{studyInsights.streakDays} дн.</strong>
          </div>
        </div>
      </section>

      <div className="stats-grid">
        <div className="card metric-card metric-card-accent">
          <p className="metric-label">Новых слов на сегодня</p>
          <strong className="progress-value">{todayNewWords.length}</strong>
          <p className="muted">Короткая сессия, чтобы не перегружать день.</p>
        </div>
        <div className="card metric-card metric-card-warm">
          <p className="metric-label">Практика за 7 дней</p>
          <strong className="progress-value">
            {studyInsights.totalActionsLast7Days}
          </strong>
          <p className="muted">Сколько учебных действий уже прошло за неделю.</p>
        </div>
        <div className="card metric-card metric-card-cool">
          <p className="metric-label">Слабые слова в фокусе</p>
          <strong className="progress-value">
            {weakWords.length}
          </strong>
          <p className="muted">Лучше всего добирать их через повторение и ошибки.</p>
        </div>
      </div>

      <div className="dashboard-secondary-grid">
        <article className="card action-plan-card">
          <div className="section-head">
            <div>
              <p className="page-kicker">Маршрут на сегодня</p>
              <h3>{recommendedMode.label}</h3>
            </div>
            <span className="summary-pill summary-pill-accent">
              Выучено: {stats.learnedWords}
            </span>
          </div>

          <p className="muted">{recommendedMode.description}</p>

          <div className="plan-steps">
            <div className="plan-step">
              <span className="plan-step-index">1</span>
              <div>
                <strong>Разогрев</strong>
                <p className="muted">
                  Прослушай фразу дня и проговори её вслух один раз.
                </p>
              </div>
            </div>
            <div className="plan-step">
              <span className="plan-step-index">2</span>
              <div>
                <strong>Основная сессия</strong>
                <p className="muted">
                  Пройди {dueWords.length ? "повторение" : "новые слова"} и не
                  торопись с ответами.
                </p>
              </div>
            </div>
            <div className="plan-step">
              <span className="plan-step-index">3</span>
              <div>
                <strong>Закрепление</strong>
                <p className="muted">
                  Загляни в ошибки или словарь, если хочешь добрать ещё 5-10 минут практики.
                </p>
              </div>
            </div>
          </div>

          <div className="category-cloud">
            {settings.activeCategories.map((category) => (
              <span key={category} className="chip chip-accent">
                {category}
              </span>
            ))}
          </div>
        </article>

        {settings.phraseOfTheDay && phraseLead ? (
          <article className="card phrase-card phrase-practice-card">
            <div className="section-head">
              <div>
                <p className="page-kicker">Практика фраз</p>
                <h3>Рабочие фразы на сегодня</h3>
              </div>
              <span className="summary-pill summary-pill-accent">
                {dailyPhrases.length} фразы
              </span>
            </div>

            <div className="phrase-practice-lead">
              <div className="phrase-practice-copy">
                <strong className="phrase-practice-title">{phraseLead.phrase}</strong>
                <p className="phrase-translation">{phraseLead.translation}</p>
                <p className="muted phrase-note">{phraseLead.explanation}</p>
              </div>
              <AudioButton
                text={phraseLead.audioText || phraseLead.phrase}
                accent={settings.voiceAccent}
              />
            </div>

            <div className="chip-row">
              <span className="chip chip-accent">{phraseLead.category}</span>
              <span className="chip">Фраза дня</span>
            </div>

            {extraPhrases.length ? (
              <div className="phrase-stack">
                {extraPhrases.map((phrase) => (
                  <div key={phrase.id} className="phrase-stack-item">
                    <div>
                      <strong>{phrase.phrase}</strong>
                      <p className="muted">{phrase.translation}</p>
                    </div>
                    <AudioButton
                      text={phrase.audioText || phrase.phrase}
                      accent={settings.voiceAccent}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        ) : (
          <article className="card action-plan-card">
            <div className="section-head">
              <div>
                <p className="page-kicker">Фраза дня</p>
                <h3>Сейчас отключена</h3>
              </div>
            </div>
            <p className="muted">
              Фразу дня можно снова включить в настройках, если захочешь вернуть
              короткую разговорную практику на главную.
            </p>
          </article>
        )}
      </div>

      <div className="dashboard-detail-grid">
        <article className="card dashboard-list-card">
          <div className="section-head">
            <div>
              <h3>Ближайшее повторение</h3>
              <p className="muted">Первые слова в сегодняшней очереди.</p>
            </div>
            <span className="chip">{dueWords.length} в очереди</span>
          </div>

          {reviewPreview.length ? (
            <div className="list-stack">
              {reviewPreview.map((word, index) => (
                <div key={word.id} className="mini-word-row">
                  <div className="mini-word-main">
                    <span className="mini-word-rank">{index + 1}</span>
                    <div>
                      <strong>{capitalizeWord(word.word)}</strong>
                      <p className="muted">
                        {word.translation} · ошибок: {word.errorCount || 0}
                      </p>
                    </div>
                  </div>
                  <span className="chip">{word.category}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">
              Очередь повторения сейчас пустая. Можно сосредоточиться на новых словах.
            </p>
          )}
        </article>

        <article className="card dashboard-list-card">
          <div className="section-head">
            <div>
              <h3>Новые слова в фокусе</h3>
              <p className="muted">Карточки, которые ждут тебя сегодня.</p>
            </div>
            <span className="chip">{todayNewWords.length} новых</span>
          </div>

          {learnPreview.length ? (
            <div className="list-stack">
              {learnPreview.map((word) => (
                <div key={word.id} className="mini-word-row">
                  <div className="mini-word-main">
                    <span className="mini-word-emoji" aria-hidden="true">
                      {word.image}
                    </span>
                    <div>
                      <strong>{capitalizeWord(word.word)}</strong>
                      <p className="muted">{word.translation}</p>
                    </div>
                  </div>
                  <span className="chip chip-accent">{word.category}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">
              На сегодня новых слов нет. Это нормально, если ты уже завершил
              дневную сессию или включил паузу.
            </p>
          )}
        </article>

        <article className="card dashboard-list-card">
          <div className="section-head">
            <div>
              <h3>Слабые слова сейчас</h3>
              <p className="muted">Карточки, которые чаще всего дают ошибку.</p>
            </div>
            <span className="chip">{weakWords.length} в риске</span>
          </div>

          {weakWordsPreview.length ? (
            <div className="list-stack">
              {weakWordsPreview.map((word) => (
                <div key={word.id} className="mini-word-row">
                  <div className="mini-word-main">
                    <span className="mini-word-rank">!</span>
                    <div>
                      <strong>{capitalizeWord(word.word)}</strong>
                      <p className="muted">
                        {word.translation} · ошибок: {word.errorCount || 0}
                      </p>
                    </div>
                  </div>
                  <span className="chip chip-accent">{word.category}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">
              Пока слабых слов нет. Это хороший момент удержать ритм без спешки.
            </p>
          )}
        </article>

        <article className="card dashboard-list-card">
          <div className="section-head">
            <div>
              <h3>Пульс практики</h3>
              <p className="muted">Последние 7 дней и текущий темп обучения.</p>
            </div>
            <span className="chip">
              Активных дней: {studyInsights.activeDaysLast7Days}
            </span>
          </div>

          <div className="activity-window">
            {studyInsights.recentWindow.map((entry) => (
              <div key={entry.date} className="activity-day-row">
                <div className="activity-day-copy">
                  <strong>{entry.label}</strong>
                  <p className="muted">
                    {entry.totalActions} действий · {entry.knownActions} знаю
                  </p>
                </div>
                <div className="activity-day-bar">
                  <span
                    className="activity-day-bar-fill"
                    style={{
                      width: `${
                        entry.totalActions
                          ? Math.min(
                              100,
                              Math.max(
                                12,
                                studyInsights.totalActionsLast7Days
                                  ? Math.round(
                                      (entry.totalActions /
                                        studyInsights.totalActionsLast7Days) *
                                        100,
                                    )
                                  : 0,
                              ),
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="muted">
            Сильнее всего продвинута категория{" "}
            <strong>{strongestCategory?.category || "—"}</strong>:
            {" "}{strongestCategory?.learned || 0} выучено.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
