import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { formatDisplayDate } from "../utils/dates";
import { getWordStatusLabel } from "../utils/progress";
import { capitalizeWord } from "../utils/text";

const filters = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "reviewing", label: "В повторении" },
  { id: "mistakes", label: "Ошибки" },
  { id: "learned", label: "Выученные" },
  { id: "backlog", label: "Отложенные" },
];

const Dictionary = () => {
  const { wordsProgress } = useOutletContext();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWords = useMemo(() => {
    let result;

    switch (activeFilter) {
      case "new":
        result = wordsProgress.filter((word) => word.status === "new");
        break;
      case "reviewing":
        result = wordsProgress.filter(
          (word) =>
            word.status === "reviewing" ||
            word.status === "mistake" ||
            (word.nextReviewDate &&
              word.status !== "learned" &&
              word.status !== "backlog"),
        );
        break;
      case "mistakes":
        result = wordsProgress.filter((word) => (word.errorCount || 0) > 0);
        break;
      case "learned":
        result = wordsProgress.filter((word) => word.status === "learned");
        break;
      case "backlog":
        result = wordsProgress.filter((word) => word.status === "backlog");
        break;
      default:
        result = wordsProgress;
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return result;
    }

    return result.filter((word) =>
      [word.word, word.translation, word.category, word.transcription]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [activeFilter, searchQuery, wordsProgress]);

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">База слов</p>
          <h2>Словарь</h2>
          <p className="page-hero-text">
            Все слова приложения с фильтрами по статусу, ошибкам и стадии
            обучения.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            Найдено: {filteredWords.length}
          </span>
          <span className="summary-pill">Всего: {wordsProgress.length}</span>
        </div>
      </div>

      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={activeFilter === filter.id ? "filter-chip filter-chip-active" : "filter-chip"}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="dictionary-toolbar">
        <input
          id="dictionary-search"
          type="search"
          className="input"
          value={searchQuery}
          placeholder="Поиск по слову, переводу, категории или транскрипции"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className="dictionary-grid">
        {filteredWords.map((word) => (
          <article key={word.id} className="card dictionary-card">
            <div className="card-head">
              <div>
                <div className="chip-row">
                  <span className="chip chip-accent">{word.category}</span>
                  <span className="chip">{getWordStatusLabel(word)}</span>
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
                <strong>{word.errorCount || 0}</strong>
              </div>
              <div className="info-pair">
                <span>Следующее повторение</span>
                <strong>{formatDisplayDate(word.nextReviewDate)}</strong>
              </div>
              <div className="info-pair">
                <span>Транскрипция</span>
                <strong>{word.transcription}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Dictionary;
