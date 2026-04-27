import { useOutletContext } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { formatDisplayDate } from "../utils/dates";
import { capitalizeWord } from "../utils/text";

const Mistakes = () => {
  const { handleWordAction, wordsProgress } = useOutletContext();

  const mistakeWords = wordsProgress
    .filter((word) => (word.errorCount || 0) > 0)
    .sort((left, right) => (right.errorCount || 0) - (left.errorCount || 0));

  if (!mistakeWords.length) {
    return (
      <EmptyState
        title="Ошибок пока нет"
        description="Когда появятся слова с errorCount больше 0, они будут показаны здесь."
      />
    );
  }

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Ошибки</p>
          <h2>Ошибки</h2>
          <p className="page-hero-text">
            Слова, которые чаще всего требуют повторного закрепления.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            С ошибками: {mistakeWords.length}
          </span>
        </div>
      </div>

      <div className="dictionary-grid">
        {mistakeWords.map((word) => (
          <article key={word.id} className="card dictionary-card mistake-card">
            <div className="card-head">
              <div>
                <div className="chip-row">
                  <span className="chip chip-accent">{word.category}</span>
                  <span className="chip chip-danger">Ошибка</span>
                </div>
                <h3>{capitalizeWord(word.word)}</h3>
                <p className="word-translation">{word.translation}</p>
              </div>
              <span className="word-image" aria-hidden="true">
                {word.image}
              </span>
            </div>
            <div className="info-pairs">
              <div className="info-pair">
                <span>Ошибок</span>
                <strong>{word.errorCount}</strong>
              </div>
              <div className="info-pair">
                <span>Следующее повторение</span>
                <strong>{formatDisplayDate(word.nextReviewDate)}</strong>
              </div>
            </div>
            <button
              type="button"
              className="button button-danger-soft"
              onClick={() => handleWordAction(word.id, "reviewNow")}
            >
              Повторить сейчас
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Mistakes;
