import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AudioButton from "../components/AudioButton";
import EmptyState from "../components/EmptyState";
import PHRASES_DATA from "../data/phrases";
import PRACTICE_SCENARIOS from "../data/practiceScenarios";
import {
  buildPhraseBuilderExercise,
  buildScenarioQuestion,
  buildWordQuizQuestion,
  getUniqueWords,
  isPhraseBuilderCorrect,
} from "../utils/practice";
import { capitalizeWord } from "../utils/text";

const modes = [
  { id: "wordQuiz", label: "Квиз слов" },
  { id: "phraseBuilder", label: "Собери фразу" },
  { id: "communication", label: "Рабочая переписка" },
];

const initialModeStats = {
  wordQuiz: { answered: 0, correct: 0 },
  phraseBuilder: { answered: 0, correct: 0 },
  communication: { answered: 0, correct: 0 },
};

const getModeTips = (mode) => {
  switch (mode) {
    case "phraseBuilder":
      return [
        "Сначала собери фразу по смыслу, а потом уже по точному порядку слов.",
        "Если споткнулся, вслух проговори перевод и ключевые слова.",
      ];
    case "communication":
      return [
        "Ищи самую естественную рабочую формулировку, а не буквальный перевод.",
        "Обращай внимание на глаголы вроде send, approve, move, update.",
      ];
    default:
      return [
        "Сначала ответь про себя, только потом нажимай на вариант.",
        "Если ошибся, проговори слово и рабочий пример вслух один раз.",
      ];
  }
};

const Practice = () => {
  const {
    dailyPhrases,
    dueWords,
    recordPracticeResult,
    settings,
    studyInsights,
    todayNewWords,
    weakWords,
    wordsProgress,
  } = useOutletContext();
  const [activeMode, setActiveMode] = useState("wordQuiz");
  const [modeStats, setModeStats] = useState(initialModeStats);
  const [modeIndexes, setModeIndexes] = useState({
    wordQuiz: 0,
    phraseBuilder: 0,
    communication: 0,
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const practiceWordPool = useMemo(() => {
    const activeCategories = settings.activeCategories || [];
    const activeWords = wordsProgress.filter(
      (word) =>
        word.status !== "backlog" &&
        (!activeCategories.length || activeCategories.includes(word.category)),
    );
    const supportingWords = activeWords.filter(
      (word) =>
        !weakWords.some((weakWord) => weakWord.id === word.id) &&
        !dueWords.some((dueWord) => dueWord.id === word.id) &&
        !todayNewWords.some((newWord) => newWord.id === word.id),
    );

    return getUniqueWords([
      ...weakWords,
      ...dueWords,
      ...todayNewWords,
      ...supportingWords,
    ]);
  }, [dueWords, settings.activeCategories, todayNewWords, weakWords, wordsProgress]);

  const practicePhrasePool = useMemo(() => {
    const activeCategories = settings.activeCategories || [];
    const filteredPhrases = PHRASES_DATA.filter(
      (phrase) =>
        !activeCategories.length || activeCategories.includes(phrase.category),
    );

    return filteredPhrases.length ? filteredPhrases : PHRASES_DATA;
  }, [settings.activeCategories]);

  const practiceScenarioPool = useMemo(() => {
    const activeCategories = settings.activeCategories || [];
    const filteredScenarios = PRACTICE_SCENARIOS.filter(
      (scenario) =>
        !activeCategories.length || activeCategories.includes(scenario.category),
    );

    return filteredScenarios.length ? filteredScenarios : PRACTICE_SCENARIOS;
  }, [settings.activeCategories]);

  const wordQuizQuestion = useMemo(
    () => buildWordQuizQuestion(practiceWordPool, modeIndexes.wordQuiz),
    [modeIndexes.wordQuiz, practiceWordPool],
  );
  const phraseBuilderExercise = useMemo(
    () => buildPhraseBuilderExercise(practicePhrasePool, modeIndexes.phraseBuilder),
    [modeIndexes.phraseBuilder, practicePhrasePool],
  );
  const communicationQuestion = useMemo(
    () => buildScenarioQuestion(practiceScenarioPool, modeIndexes.communication),
    [modeIndexes.communication, practiceScenarioPool],
  );

  const currentModeStats = modeStats[activeMode];
  const availablePhraseTokens = phraseBuilderExercise
    ? phraseBuilderExercise.shuffledTokens.filter(
        (token) => !selectedTokens.some((selected) => selected.id === token.id),
      )
    : [];

  const recommendedFocus = weakWords.length
    ? "Закрой слабые слова через квиз и потом вернись в повторение."
    : dueWords.length
      ? "Очередь повторения уже есть. Практика поможет перед основным review."
      : "Можно использовать практику как спокойную дополнительную сессию.";

  const resetInteractionState = () => {
    setSelectedOption("");
    setSelectedTokens([]);
    setSubmitted(false);
  };

  const switchMode = (nextMode) => {
    setActiveMode(nextMode);
    resetInteractionState();
  };

  const registerModeResult = (mode, isCorrect) => {
    setModeStats((current) => ({
      ...current,
      [mode]: {
        answered: current[mode].answered + 1,
        correct: current[mode].correct + (isCorrect ? 1 : 0),
      },
    }));

    recordPracticeResult({ mode, isCorrect });
  };

  const goToNextExercise = (mode) => {
    setModeIndexes((current) => ({
      ...current,
      [mode]: current[mode] + 1,
    }));
    resetInteractionState();
  };

  const handleQuizAnswer = (option) => {
    if (submitted || !wordQuizQuestion) {
      return;
    }

    const isCorrect = option === wordQuizQuestion.correctAnswer;
    setSelectedOption(option);
    setSubmitted(true);
    registerModeResult("wordQuiz", isCorrect);
  };

  const handleScenarioAnswer = (option) => {
    if (submitted || !communicationQuestion) {
      return;
    }

    const isCorrect = option === communicationQuestion.correctAnswer;
    setSelectedOption(option);
    setSubmitted(true);
    registerModeResult("communication", isCorrect);
  };

  const handlePhraseTokenClick = (token) => {
    if (submitted) {
      return;
    }

    setSelectedTokens((current) => [...current, token]);
  };

  const handleRemoveSelectedToken = (tokenId) => {
    if (submitted) {
      return;
    }

    setSelectedTokens((current) =>
      current.filter((token) => token.id !== tokenId),
    );
  };

  const handleCheckPhrase = () => {
    if (!phraseBuilderExercise || submitted) {
      return;
    }

    const isCorrect = isPhraseBuilderCorrect(
      selectedTokens,
      phraseBuilderExercise.phrase.phrase,
    );
    setSubmitted(true);
    registerModeResult("phraseBuilder", isCorrect);
  };

  if (!practiceWordPool.length || !practicePhrasePool.length || !practiceScenarioPool.length) {
    return (
      <EmptyState
        title="Недостаточно данных для практики"
        description="Добавь активные категории или начни изучать слова, чтобы тренировка стала доступна."
      />
    );
  }

  return (
    <section className="stack">
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Активная практика</p>
          <h2>Тренировка</h2>
          <p className="page-hero-text">
            Быстрый квиз, сборка фраз и рабочая коммуникация помогают не только
            узнавать слова, но и реально доставать их из памяти.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            Практики сегодня: {studyInsights.todayActivity.practiceActions || 0}
          </span>
          <span className="summary-pill">
            Верно: {studyInsights.todayActivity.correctPracticeActions || 0}
          </span>
          <span className="summary-pill">Серия: {studyInsights.streakDays} дн.</span>
        </div>
      </div>

      <div className="segmented-group">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={
              activeMode === mode.id
                ? "segment-button segment-button-active"
                : "segment-button"
            }
            onClick={() => switchMode(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="review-layout practice-layout">
        <article className="card practice-main-card">
          {activeMode === "wordQuiz" && wordQuizQuestion ? (
            <>
              <div className="section-head">
                <div>
                  <p className="page-kicker">Квиз слов</p>
                  <h3>{capitalizeWord(wordQuizQuestion.targetWord.word)}</h3>
                </div>
                <AudioButton
                  text={
                    wordQuizQuestion.targetWord.audioText ||
                    wordQuizQuestion.targetWord.word
                  }
                  accent={settings.voiceAccent}
                />
              </div>

              <div className="chip-row">
                <span className="chip chip-accent">
                  {wordQuizQuestion.targetWord.category}
                </span>
                <span className="chip">{wordQuizQuestion.targetWord.transcription}</span>
              </div>

              <p className="practice-prompt">
                Выбери правильный перевод для этого слова.
              </p>

              <div className="practice-option-grid">
                {wordQuizQuestion.options.map((option) => {
                  const isCorrectAnswer =
                    submitted && option === wordQuizQuestion.correctAnswer;
                  const isWrongSelection =
                    submitted &&
                    option === selectedOption &&
                    option !== wordQuizQuestion.correctAnswer;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={[
                        "practice-option",
                        isCorrectAnswer ? "practice-option-correct" : "",
                        isWrongSelection ? "practice-option-wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleQuizAnswer(option)}
                      disabled={submitted}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {submitted ? (
                <div className="practice-feedback practice-feedback-success">
                  <strong>
                    {selectedOption === wordQuizQuestion.correctAnswer
                      ? "Верно"
                      : "Нужно повторить"}
                  </strong>
                  <p>
                    {wordQuizQuestion.targetWord.example}
                    <br />
                    <span className="muted">
                      {wordQuizQuestion.targetWord.exampleTranslation}
                    </span>
                  </p>
                  <p>
                    {wordQuizQuestion.targetWord.workExample}
                    <br />
                    <span className="muted">
                      {wordQuizQuestion.targetWord.workExampleTranslation}
                    </span>
                  </p>
                </div>
              ) : null}

              <div className="button-row">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => goToNextExercise("wordQuiz")}
                >
                  Следующее слово
                </button>
              </div>
            </>
          ) : null}

          {activeMode === "phraseBuilder" && phraseBuilderExercise ? (
            <>
              <div className="section-head">
                <div>
                  <p className="page-kicker">Собери фразу</p>
                  <h3>{phraseBuilderExercise.phrase.translation}</h3>
                </div>
                <AudioButton
                  text={
                    phraseBuilderExercise.phrase.audioText ||
                    phraseBuilderExercise.phrase.phrase
                  }
                  accent={settings.voiceAccent}
                />
              </div>

              <div className="chip-row">
                <span className="chip chip-accent">
                  {phraseBuilderExercise.phrase.category}
                </span>
                <span className="chip">Собери английскую фразу</span>
              </div>

              <p className="practice-prompt">
                Нажимай слова по порядку. Если ошибся, просто убери лишнее слово из
                собранной строки.
              </p>

              <div className="answer-strip">
                {selectedTokens.length ? (
                  selectedTokens.map((token) => (
                    <button
                      key={token.id}
                      type="button"
                      className="token-button token-button-selected"
                      onClick={() => handleRemoveSelectedToken(token.id)}
                    >
                      {token.label}
                    </button>
                  ))
                ) : (
                  <p className="muted">Собранная фраза появится здесь.</p>
                )}
              </div>

              <div className="token-bank">
                {availablePhraseTokens.map((token) => (
                  <button
                    key={token.id}
                    type="button"
                    className="token-button"
                    onClick={() => handlePhraseTokenClick(token)}
                    disabled={submitted}
                  >
                    {token.label}
                  </button>
                ))}
              </div>

              {submitted ? (
                <div
                  className={
                    isPhraseBuilderCorrect(
                      selectedTokens,
                      phraseBuilderExercise.phrase.phrase,
                    )
                      ? "practice-feedback practice-feedback-success"
                      : "practice-feedback practice-feedback-danger"
                  }
                >
                  <strong>
                    {isPhraseBuilderCorrect(
                      selectedTokens,
                      phraseBuilderExercise.phrase.phrase,
                    )
                      ? "Фраза собрана верно"
                      : "Порядок слов пока не совпал"}
                  </strong>
                  <p>{phraseBuilderExercise.phrase.phrase}</p>
                  <p className="muted">{phraseBuilderExercise.phrase.explanation}</p>
                </div>
              ) : null}

              <div className="button-row">
                <button
                  type="button"
                  className="button button-light"
                  onClick={resetInteractionState}
                  disabled={submitted}
                >
                  Очистить
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={handleCheckPhrase}
                  disabled={
                    submitted ||
                    selectedTokens.length !==
                      phraseBuilderExercise.shuffledTokens.length
                  }
                >
                  Проверить
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => goToNextExercise("phraseBuilder")}
                >
                  Следующая фраза
                </button>
              </div>
            </>
          ) : null}

          {activeMode === "communication" && communicationQuestion ? (
            <>
              <div className="section-head">
                <div>
                  <p className="page-kicker">Рабочая переписка</p>
                  <h3>{communicationQuestion.promptRu}</h3>
                </div>
              </div>

              <div className="chip-row">
                <span className="chip chip-accent">
                  {communicationQuestion.category}
                </span>
                <span className="chip">{communicationQuestion.context}</span>
              </div>

              <p className="practice-prompt">
                Выбери английскую фразу, которая лучше всего подходит к ситуации.
              </p>

              <div className="practice-option-grid">
                {communicationQuestion.options.map((option) => {
                  const isCorrectAnswer =
                    submitted && option === communicationQuestion.correctAnswer;
                  const isWrongSelection =
                    submitted &&
                    option === selectedOption &&
                    option !== communicationQuestion.correctAnswer;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={[
                        "practice-option",
                        isCorrectAnswer ? "practice-option-correct" : "",
                        isWrongSelection ? "practice-option-wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => handleScenarioAnswer(option)}
                      disabled={submitted}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {submitted ? (
                <div
                  className={
                    selectedOption === communicationQuestion.correctAnswer
                      ? "practice-feedback practice-feedback-success"
                      : "practice-feedback practice-feedback-danger"
                  }
                >
                  <strong>
                    {selectedOption === communicationQuestion.correctAnswer
                      ? "Хороший выбор"
                      : "Лучше взять другой вариант"}
                  </strong>
                  <p>{communicationQuestion.correctAnswer}</p>
                  <p className="muted">{communicationQuestion.explanation}</p>
                </div>
              ) : null}

              <div className="button-row">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => goToNextExercise("communication")}
                >
                  Следующая ситуация
                </button>
              </div>
            </>
          ) : null}
        </article>

        <aside className="side-panel">
          <article className="card side-panel-card sticky-card">
            <div className="section-head">
              <div>
                <h3>Состояние практики</h3>
                <p className="muted">Внутрисессионный счёт и учебный фокус.</p>
              </div>
            </div>

            <div className="session-metrics practice-score-grid">
              <div className="session-metric">
                <span>Ответов</span>
                <strong>{currentModeStats.answered}</strong>
              </div>
              <div className="session-metric">
                <span>Верно</span>
                <strong>{currentModeStats.correct}</strong>
              </div>
              <div className="session-metric">
                <span>Точность</span>
                <strong>
                  {currentModeStats.answered
                    ? `${Math.round(
                        (currentModeStats.correct / currentModeStats.answered) * 100,
                      )}%`
                    : "0%"}
                </strong>
              </div>
            </div>

            <div className="detail-block">
              <strong>Сегодня:</strong>
              <div className="category-cloud">
                <span className="chip chip-accent">
                  Практика: {studyInsights.todayActivity.practiceActions || 0}
                </span>
                <span className="chip">
                  Верных: {studyInsights.todayActivity.correctPracticeActions || 0}
                </span>
              </div>
            </div>

            <div className="detail-block">
              <strong>Рекомендуемый фокус:</strong>
              <p className="muted">{recommendedFocus}</p>
            </div>

            <div className="detail-block">
              <strong>Подсказки:</strong>
              <div className="legend-list">
                {getModeTips(activeMode).map((tip) => (
                  <div key={tip} className="legend-item">
                    <span className="legend-dot legend-dot-success" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-block">
              <strong>Быстрые переходы:</strong>
              <div className="button-row">
                <Link to="/review" className="button button-secondary">
                  К повторению
                </Link>
                <Link to="/learn" className="button button-light">
                  К новым словам
                </Link>
              </div>
            </div>

            <div className="detail-block">
              <strong>Текущая нагрузка:</strong>
              <ul className="meta-list">
                <li>Слабых слов: {weakWords.length}</li>
                <li>В очереди повторения: {dueWords.length}</li>
                <li>Новых слов сегодня: {todayNewWords.length}</li>
                <li>Фраз дня: {dailyPhrases.length}</li>
              </ul>
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
};

export default Practice;
