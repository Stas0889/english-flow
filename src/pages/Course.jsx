import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

const isLessonReadyToComplete = (lesson, state) => {
  const correctCount = lesson.exercises.filter(
    (_, index) => state?.exerciseResults?.[index]?.isCorrect,
  ).length;

  return (
    correctCount === lesson.exercises.length &&
    String(state?.writingDraft || "").trim().length >= 8
  );
};

const Course = () => {
  const {
    courseLessons,
    courseProgress,
    courseStats,
    markCourseLessonComplete,
    selectCourseAnswer,
    checkCourseAnswer,
    toggleCourseSample,
    updateCourseWriting,
  } = useOutletContext();

  const lessonsByWeek = useMemo(() => {
    const grouped = new Map();

    courseLessons.forEach((lesson) => {
      const weekLessons = grouped.get(lesson.week) ?? {
        week: lesson.week,
        title: lesson.weekTitle,
        lessons: [],
      };

      weekLessons.lessons.push(lesson);
      grouped.set(lesson.week, weekLessons);
    });

    return Array.from(grouped.values()).sort((left, right) => left.week - right.week);
  }, [courseLessons]);

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Структурный курс</p>
          <h2>Курс для начинающего</h2>
          <p className="page-hero-text">
            Первый полноценный блок курса: рабочие фразы, простые диалоги,
            базовые конструкции и короткая письменная практика для общения с
            клиентом, дизайнером и по Webflow-задачам.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            Уроков: {courseStats.totalLessons}
          </span>
          <span className="summary-pill">Пройдено: {courseStats.completedLessons}</span>
          <span className="summary-pill">Недель: {courseStats.totalWeeks}</span>
        </div>
      </div>

      <div className="stats-grid">
        <article className="card metric-card metric-card-accent">
          <p className="metric-label">Прогресс курса</p>
          <strong className="progress-value">{courseStats.completionPercent}%</strong>
          <p className="muted">Процент завершённых уроков от стартового блока.</p>
        </article>
        <article className="card metric-card metric-card-warm">
          <p className="metric-label">Начатых уроков</p>
          <strong className="progress-value">{courseStats.startedLessons}</strong>
          <p className="muted">Уроки, где уже выбраны ответы или начата письменная часть.</p>
        </article>
        <article className="card metric-card metric-card-cool">
          <p className="metric-label">Формат</p>
          <strong className="progress-value">4 недели</strong>
          <p className="muted">12 уроков с диалогами, упражнениями и письмом.</p>
        </article>
      </div>

      <div className="course-week-grid">
        {lessonsByWeek.map((weekBlock) => {
          const weekCompleted = weekBlock.lessons.filter(
            (lesson) => courseProgress?.[lesson.id]?.completed,
          ).length;

          return (
            <article key={weekBlock.week} className="card course-week-summary">
              <div className="section-head">
                <div>
                  <p className="page-kicker">Неделя {weekBlock.week}</p>
                  <h3>{weekBlock.title}</h3>
                </div>
                <span className="chip chip-accent">
                  {weekCompleted}/{weekBlock.lessons.length}
                </span>
              </div>
              <p className="muted">
                Здесь собраны уроки по одной учебной теме, чтобы идти от простых
                фраз к рабочим сообщениям без перегруза.
              </p>
            </article>
          );
        })}
      </div>

      {lessonsByWeek.map((weekBlock) => (
        <section key={weekBlock.week} className="stack">
          <div className="section-head">
            <div>
              <p className="page-kicker">Неделя {weekBlock.week}</p>
              <h3>{weekBlock.title}</h3>
            </div>
            <span className="summary-pill summary-pill-accent">
              {weekBlock.lessons.filter((lesson) => courseProgress?.[lesson.id]?.completed).length}
              /{weekBlock.lessons.length} завершено
            </span>
          </div>

          <div className="course-lesson-grid">
            {weekBlock.lessons.map((lesson) => {
              const state = courseProgress?.[lesson.id] ?? {};
              const readyToComplete = isLessonReadyToComplete(lesson, state);

              return (
                <article key={lesson.id} className="card lesson-card course-lesson-card">
                  <div className="card-head lesson-head">
                    <div>
                      <div className="chip-row">
                        <span className="chip chip-accent">{lesson.unit}</span>
                        <span className="chip">Неделя {lesson.week}</span>
                        <span className="chip">{lesson.pattern}</span>
                      </div>
                      <h3>{lesson.title}</h3>
                    </div>
                    {state.completed ? (
                      <span className="chip chip-accent">Пройдено</span>
                    ) : (
                      <span className="chip">В процессе</span>
                    )}
                  </div>

                  <p className="muted">{lesson.goal}</p>

                  <div className="detail-block">
                    <strong>Новые слова:</strong>
                    <div className="course-vocab-grid">
                      {lesson.vocabulary.map((item) => (
                        <div key={`${lesson.id}-${item.en}`} className="example-card">
                          <strong>{item.en}</strong>
                          <span>{item.ru}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-block">
                    <strong>Мини-диалог:</strong>
                    <div className="dialogue-list">
                      {lesson.dialogue.map((line, index) => (
                        <div key={`${lesson.id}-line-${index}`} className="dialogue-line">
                          <div className="dialogue-speaker">{line.speaker}</div>
                          <div className="dialogue-copy">
                            <strong>{line.en}</strong>
                            <span>{line.ru}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-block">
                    <strong>Упражнения:</strong>
                    <div className="course-exercise-stack">
                      {lesson.exercises.map((exercise, index) => {
                        const result = state.exerciseResults?.[index];
                        return (
                          <div key={`${lesson.id}-exercise-${index}`} className="course-exercise-card">
                            <strong>{exercise.question}</strong>
                            <div className="exercise-options">
                              {exercise.options.map((option) => (
                                <label key={option} className="option-card">
                                  <input
                                    type="radio"
                                    name={`${lesson.id}-exercise-${index}`}
                                    checked={state.exerciseAnswers?.[index] === option}
                                    onChange={() =>
                                      selectCourseAnswer(lesson.id, index, option)
                                    }
                                  />
                                  <span>{option}</span>
                                </label>
                              ))}
                            </div>
                            <div className="button-row">
                              <button
                                type="button"
                                className="button button-secondary"
                                onClick={() =>
                                  checkCourseAnswer(
                                    lesson.id,
                                    index,
                                    exercise.correctAnswer,
                                  )
                                }
                                disabled={!state.exerciseAnswers?.[index]}
                              >
                                Проверить
                              </button>
                            </div>
                            {result?.checked ? (
                              <p
                                className={
                                  result.isCorrect ? "notice success" : "notice error"
                                }
                              >
                                {result.isCorrect
                                  ? `Верно. ${exercise.explanation}`
                                  : `Неверно. Правильный ответ: ${exercise.correctAnswer}. ${exercise.explanation}`}
                              </p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="detail-block">
                    <strong>Письменная практика:</strong>
                    <p className="muted">{lesson.writing.prompt}</p>
                    <textarea
                      className="textarea"
                      rows={4}
                      value={state.writingDraft || ""}
                      placeholder={lesson.writing.hint}
                      onChange={(event) =>
                        updateCourseWriting(lesson.id, event.target.value)
                      }
                    />
                    <div className="button-row">
                      <button
                        type="button"
                        className="button button-light"
                        onClick={() => toggleCourseSample(lesson.id)}
                      >
                        {state.showSample ? "Скрыть пример" : "Показать пример"}
                      </button>
                      <button
                        type="button"
                        className={state.completed ? "button button-success" : "button"}
                        onClick={() => markCourseLessonComplete(lesson.id)}
                        disabled={!readyToComplete && !state.completed}
                      >
                        {state.completed ? "Урок отмечен пройденным" : "Отметить урок пройденным"}
                      </button>
                    </div>
                    {state.showSample ? (
                      <p className="notice">{lesson.writing.sample}</p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
};

export default Course;
