import { useOutletContext } from "react-router-dom";
import ProgressCard from "../components/ProgressCard";
import { capitalizeWord } from "../utils/text";

const Progress = () => {
  const { categoryInsights, courseStats, stats, studyInsights, weakWords } =
    useOutletContext();
  const weakWordsPreview = weakWords.slice(0, 6);

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Аналитика</p>
          <h2>Прогресс</h2>
          <p className="page-hero-text">
            Сводка по новым словам, повторениям, ошибкам и завершённым сессиям.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            Всего слов: {stats.totalWords}
          </span>
          <span className="summary-pill">Выучено: {stats.learnedWords}</span>
          <span className="summary-pill">Серия: {studyInsights.streakDays} дн.</span>
        </div>
      </div>

      <div className="stats-grid">
        <ProgressCard label="Всего слов" value={stats.totalWords} />
        <ProgressCard label="Новых слов" value={stats.newWords} />
        <ProgressCard label="Слов в повторении" value={stats.reviewingWords} />
        <ProgressCard label="Выученных слов" value={stats.learnedWords} />
        <ProgressCard label="Слов с ошибками" value={stats.mistakeWords} />
        <ProgressCard label="Отложенных слов" value={stats.backlogWords} />
        <ProgressCard label="Завершённых повторений" value={stats.completedReviews} />
        <ProgressCard label="Дней практики" value={studyInsights.totalStudyDays} />
        <ProgressCard
          label="Действий за 7 дней"
          value={studyInsights.totalActionsLast7Days}
        />
        <ProgressCard label="Уроков курса" value={courseStats.totalLessons} />
        <ProgressCard
          label="Пройдено в курсе"
          value={courseStats.completedLessons}
        />
      </div>

      <div className="dashboard-detail-grid">
        <article className="card dashboard-list-card">
          <div className="section-head">
            <div>
              <h3>Слабые слова</h3>
              <p className="muted">На что лучше давать повторение в первую очередь.</p>
            </div>
            <span className="chip">{weakWords.length} слов</span>
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
              Пока нет слов с ошибками. Значит база идёт в хороший плюс.
            </p>
          )}
        </article>

        <article className="card dashboard-list-card">
          <div className="section-head">
            <div>
              <h3>История за 7 дней</h3>
              <p className="muted">Видно, насколько ровно держится практика.</p>
            </div>
            <span className="chip">{studyInsights.activeDaysLast7Days} активных</span>
          </div>

          <div className="activity-window">
            {studyInsights.recentWindow.map((entry) => (
              <div key={entry.date} className="activity-day-row">
                <div className="activity-day-copy">
                  <strong>{entry.label}</strong>
                  <p className="muted">
                    {entry.totalActions} действий · новых: {entry.newWordActions}
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
        </article>
      </div>

      <article className="card dashboard-list-card">
        <div className="section-head">
          <div>
            <h3>Прогресс по категориям</h3>
            <p className="muted">
              Видно, где уже набралась база, а где ещё много новых слов.
            </p>
          </div>
        </div>

        <div className="category-progress-list">
          {categoryInsights.map((item) => (
            <div key={item.category} className="category-progress-row">
              <div className="category-progress-copy">
                <div className="chip-row">
                  <span className={item.isActive ? "chip chip-accent" : "chip"}>
                    {item.category}
                  </span>
                  <span className="chip">{item.total} слов</span>
                </div>
                <p className="muted">
                  Выучено: {item.learned} · В повторении: {item.reviewing} · Ошибки:{" "}
                  {item.mistakes} · Новые: {item.newWords}
                </p>
              </div>
              <div className="category-progress-visual">
                <div className="progress-track" aria-hidden="true">
                  <div
                    className="progress-track-fill"
                    style={{ width: `${item.completionPercent}%` }}
                  />
                </div>
                <strong>{item.completionPercent}%</strong>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default Progress;
