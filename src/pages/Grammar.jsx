import { useOutletContext } from "react-router-dom";
import GRAMMAR_LESSONS from "../data/grammarLessons";
import EmptyState from "../components/EmptyState";

const Grammar = () => {
  const { checkGrammarAnswer, grammarProgress, selectGrammarAnswer, settings } =
    useOutletContext();
  const completedLessons = GRAMMAR_LESSONS.filter(
    (lesson) => grammarProgress?.[lesson.id]?.checked && grammarProgress?.[lesson.id]?.isCorrect,
  ).length;

  if (!settings.grammarEnabled) {
    return (
      <EmptyState
        title="Грамматика сейчас выключена"
        description="Раздел можно снова включить в настройках, если захочешь вернуть уроки и мини-упражнения."
      />
    );
  }

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Grammar A1</p>
          <h2>Грамматика A1</h2>
          <p className="page-hero-text">
            Короткие уроки с мини-упражнениями и моментальной проверкой ответа.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            Уроков: {GRAMMAR_LESSONS.length}
          </span>
          <span className="summary-pill">Пройдено: {completedLessons}</span>
        </div>
      </div>

      <div className="grammar-grid">
        {GRAMMAR_LESSONS.map((lesson) => {
          const state = grammarProgress?.[lesson.id] ?? {};

          return (
            <article key={lesson.id} className="card lesson-card">
              <div className="card-head lesson-head">
                <div>
                  <div className="chip-row">
                    <span className="chip chip-accent">{lesson.level}</span>
                    <span className="chip">Урок</span>
                  </div>
                  <h3>{lesson.title}</h3>
                </div>
                {state.checked ? (
                  <span className={state.isCorrect ? "chip chip-accent" : "chip chip-danger"}>
                    {state.isCorrect ? "Верно" : "Есть ошибка"}
                  </span>
                ) : null}
              </div>

              <p className="muted">{lesson.description}</p>

              <div className="detail-block">
                <strong>Примеры:</strong>
                <div className="lesson-examples">
                  {lesson.examples.map((example) => (
                    <div key={example.en} className="example-card">
                      <strong>{example.en}</strong>
                      <span>{example.ru}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-block">
                <strong>{lesson.exercise.question}</strong>
                <div className="exercise-options">
                  {lesson.exercise.options.map((option) => (
                    <label key={option} className="option-card">
                      <input
                        type="radio"
                        name={lesson.id}
                        checked={state.selectedAnswer === option}
                        onChange={() => selectGrammarAnswer(lesson.id, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() =>
                    checkGrammarAnswer(lesson.id, lesson.exercise.correctAnswer)
                  }
                  disabled={!state.selectedAnswer}
                >
                  Проверить
                </button>
                {state.checked ? (
                  <p className={state.isCorrect ? "notice success" : "notice error"}>
                    {state.isCorrect
                      ? "Верно."
                      : `Неверно. Правильный ответ: ${lesson.exercise.correctAnswer}.`}
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Grammar;
