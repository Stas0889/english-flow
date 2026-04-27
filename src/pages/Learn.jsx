import { useOutletContext } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import WordCard from "../components/WordCard";

const Learn = () => {
  const { dailyState, handleWordAction, settings, todayNewWords } = useOutletContext();
  const assignedCount = dailyState.assignedNewWordIds?.length || todayNewWords.length;
  const completedCount = Math.max(0, assignedCount - todayNewWords.length);
  const progressPercent = assignedCount
    ? Math.round((completedCount / assignedCount) * 100)
    : 0;
  const sessionCategories = Array.from(
    new Set(todayNewWords.map((word) => word.category)),
  );

  if (dailyState.newWordsPausedToday) {
    return (
      <EmptyState
        title="Новые слова на сегодня отключены"
        description="Ты выбрал день без новых слов. Завтра слова снова появятся автоматически."
      />
    );
  }

  if (!todayNewWords.length) {
    return (
      <EmptyState
        title="Новых слов на сегодня нет"
        description="Лимит на сегодня уже завершён, либо все новые слова обработаны."
      />
    );
  }

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Изучение</p>
          <h2>Новые слова</h2>
          <p className="page-hero-text">
            На сегодня доступно {todayNewWords.length} карточек для первичного
            изучения.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            Сегодня: {todayNewWords.length}
          </span>
          <span className="summary-pill">Акцент: {settings.voiceAccent}</span>
          <span className="summary-pill">Готово: {completedCount}</span>
        </div>
      </div>

      <div className="learn-layout">
        <div className="word-list learn-word-list">
          {todayNewWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              accent={settings.voiceAccent}
              onAction={handleWordAction}
            />
          ))}
        </div>

        <aside className="side-panel">
          <article className="card side-panel-card sticky-card">
            <div className="section-head">
              <div>
                <h3>Сессия дня</h3>
                <p className="muted">Короткий контроль темпа и фокуса.</p>
              </div>
            </div>

            <div className="session-metrics">
              <div className="session-metric">
                <span>В сессии</span>
                <strong>{assignedCount}</strong>
              </div>
              <div className="session-metric">
                <span>Осталось</span>
                <strong>{todayNewWords.length}</strong>
              </div>
              <div className="session-metric">
                <span>Пройдено</span>
                <strong>{completedCount}</strong>
              </div>
            </div>

            <div className="progress-track" aria-hidden="true">
              <div
                className="progress-track-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="muted">Прогресс сессии: {progressPercent}%.</p>

            <div className="detail-block">
              <strong>Активные категории:</strong>
              <div className="category-cloud">
                {sessionCategories.map((category) => (
                  <span key={category} className="chip chip-accent">
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-block">
              <strong>Подсказка по кнопкам:</strong>
              <div className="legend-list">
                <div className="legend-item">
                  <span className="legend-dot legend-dot-success" />
                  <span>«Знаю» двигает слово дальше по интервальному повторению.</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot legend-dot-warning" />
                  <span>«Сложно» оставляет слово рядом и помечает затруднение.</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot legend-dot-danger" />
                  <span>«Не помню» возвращает слово на раннюю стадию.</span>
                </div>
              </div>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default Learn;
