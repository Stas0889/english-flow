import { useOutletContext } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ReviewCard from "../components/ReviewCard";
import { capitalizeWord } from "../utils/text";

const Review = () => {
  const { dueWords, handleWordAction, settings } = useOutletContext();

  if (!dueWords.length) {
    return (
      <EmptyState
        title="Сегодня нет карточек на повторение"
        description="Когда подойдут даты nextReviewDate, слова появятся здесь автоматически."
      />
    );
  }

  const currentWord = dueWords[0];
  const queuePreview = dueWords.slice(0, 5);

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Повторение</p>
          <h2>Повторение</h2>
          <p className="page-hero-text">
            Сейчас на повторении {dueWords.length} слов. Показывается первая
            карточка из очереди.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            В очереди: {dueWords.length}
          </span>
          <span className="summary-pill">Категория: {currentWord.category}</span>
        </div>
      </div>

      <div className="review-layout">
        <ReviewCard
          key={currentWord.id}
          word={currentWord}
          accent={settings.voiceAccent}
          onAction={handleWordAction}
        />

        <aside className="side-panel">
          <article className="card side-panel-card sticky-card review-queue-card">
            <div className="section-head">
              <div>
                <h3>Очередь повторения</h3>
                <p className="muted">Текущая карточка и ближайшие следом.</p>
              </div>
            </div>

            <div className="session-metrics">
              <div className="session-metric">
                <span>Текущее слово</span>
                <strong>{capitalizeWord(currentWord.word)}</strong>
              </div>
              <div className="session-metric">
                <span>Ошибок</span>
                <strong>{currentWord.errorCount || 0}</strong>
              </div>
            </div>

            <div className="queue-list">
              {queuePreview.map((word, index) => (
                <div
                  key={word.id}
                  className={index === 0 ? "queue-item queue-item-active" : "queue-item"}
                >
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

            <div className="detail-block">
              <strong>Как проходить:</strong>
              <ul className="meta-list">
                <li>Сначала попробуй вспомнить ответ до раскрытия карточки.</li>
                <li>Жми «Сложно», если слово узнаётся, но ещё не держится уверенно.</li>
                <li>Жми «Не помню», если хочешь вернуть слово на раннюю стадию.</li>
              </ul>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default Review;
