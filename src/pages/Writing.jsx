import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import AudioButton from "../components/AudioButton";
import EmptyState from "../components/EmptyState";
import MnemonicPanel from "../components/MnemonicPanel";
import useSpeech from "../hooks/useSpeech";
import { capitalizeWord } from "../utils/text";

const REPETITION_OPTIONS = [3, 5, 10];
const DEFAULT_REPETITIONS = 5;

const normalizeAnswer = (value = "") =>
  value
    .trim()
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/\s+/g, " ");

const Writing = ({ embedded = false }) => {
  const {
    hideWritingWord,
    markWritingWordDone,
    settings,
    writingPractice,
    writingQueueWords,
  } = useOutletContext();
  const { speak } = useSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [countsByWordId, setCountsByWordId] = useState({});
  const [message, setMessage] = useState("");
  const [hasInputError, setHasInputError] = useState(false);
  const [isAutoSoundEnabled, setIsAutoSoundEnabled] = useState(true);
  const [targetRepetitionsByWordId, setTargetRepetitionsByWordId] = useState({});
  const [visibleAnswerByWordId, setVisibleAnswerByWordId] = useState({});

  useEffect(() => {
    if (currentIndex > 0 && currentIndex >= writingQueueWords.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, writingQueueWords.length]);

  if (!writingQueueWords.length) {
    return (
      <EmptyState
        title="Очередь для письма пустая"
        description="Слова появятся здесь после кнопок «Знаю», «Сложно» или «Не помню», а также когда они придут на повторение."
      >
        <Link to="/learn" className="button">
          К новым словам
        </Link>
      </EmptyState>
    );
  }

  const currentWord = writingQueueWords[currentIndex] ?? writingQueueWords[0];
  const targetRepetitions =
    targetRepetitionsByWordId[currentWord.id] || DEFAULT_REPETITIONS;
  const currentCount = countsByWordId[currentWord.id] || 0;
  const targetAnswer = normalizeAnswer(currentWord.word);
  const isInputCorrect = normalizeAnswer(inputValue) === targetAnswer;
  const progressPercent = Math.min(
    100,
    Math.round((currentCount / targetRepetitions) * 100),
  );
  const canFinish = currentCount >= targetRepetitions;
  const isAnswerVisible = Boolean(visibleAnswerByWordId[currentWord.id]);
  const queuePreview = writingQueueWords.slice(0, 6);

  const resetCurrentInput = () => {
    setInputValue("");
    setMessage("");
    setHasInputError(false);
  };

  const goToWord = (index) => {
    setCurrentIndex(index);
    resetCurrentInput();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue.trim()) {
      setMessage("Сначала напиши английское слово.");
      setHasInputError(true);
      return;
    }

    if (!isInputCorrect) {
      setMessage(`Пока не совпало. Проверь буквы и попробуй ещё раз.`);
      setHasInputError(true);
      return;
    }

    const nextCount = Math.min(targetRepetitions, currentCount + 1);
    setCountsByWordId((current) => ({
      ...current,
      [currentWord.id]: nextCount,
    }));
    setInputValue("");
    setHasInputError(false);
    setMessage(
      nextCount >= targetRepetitions
        ? `${targetRepetitions} повторов есть. Теперь можно нажать «Сделал».`
        : `Верно. Осталось: ${targetRepetitions - nextCount}.`,
    );
    if (isAutoSoundEnabled) {
      speak(currentWord.audioText || currentWord.word, settings.voiceAccent);
    }
  };

  const setTargetRepetitions = (value) => {
    setTargetRepetitionsByWordId((current) => ({
      ...current,
      [currentWord.id]: value,
    }));
    setMessage(
      currentCount >= value
        ? "Выбранный объём уже набран. Можно нажать «Сделал»."
        : "",
    );
  };

  const toggleAnswerVisibility = () => {
    setVisibleAnswerByWordId((current) => ({
      ...current,
      [currentWord.id]: !current[currentWord.id],
    }));
  };

  const handleDone = () => {
    markWritingWordDone(currentWord.id, currentCount);
    setCountsByWordId((current) => {
      const next = { ...current };
      delete next[currentWord.id];
      return next;
    });
    resetCurrentInput();
  };

  const handleHide = () => {
    hideWritingWord(currentWord.id);
    setCountsByWordId((current) => {
      const next = { ...current };
      delete next[currentWord.id];
      return next;
    });
    resetCurrentInput();
  };

  const content = (
    <>
      <article className="card writing-intro-card">
        <p className="page-kicker">Письменная практика</p>
        <h3>Напиши слово несколько раз</h3>
        <p className="muted">
          Смотри на русское значение и печатай английское слово. Это тренирует
          активное вспоминание: потом в переписке слово легче достать из головы,
          а не только узнать в списке.
        </p>
        <div className="hero-inline-metrics writing-intro-metrics">
          <span className="summary-pill summary-pill-accent">
            В очереди: {writingQueueWords.length}
          </span>
          <span className="summary-pill">
            Скрыто: {writingPractice.hiddenWordIds.length}
          </span>
          <span className="summary-pill">Норма: 3 / 5 / 10 раз</span>
        </div>
      </article>

      {!embedded ? (
      <div className="page-hero page-hero-compact">
        <div>
          <p className="page-kicker">Письменная практика</p>
          <h2>Написать слово</h2>
          <p className="page-hero-text">
            Пиши английское слово несколько раз. После каждого правильного ввода слово
            озвучивается, чтобы закреплять написание и произношение вместе.
          </p>
        </div>
        <div className="hero-inline-metrics">
          <span className="summary-pill summary-pill-accent">
            В очереди: {writingQueueWords.length}
          </span>
          <span className="summary-pill">
            Скрыто: {writingPractice.hiddenWordIds.length}
          </span>
          <span className="summary-pill">Норма: 3 / 5 / 10 раз</span>
        </div>
      </div>
      ) : null}

      <div className="review-layout writing-layout">
        <article className="card writing-card">
          <div className="card-head">
            <div>
              <div className="chip-row">
                <span className="chip chip-accent">{currentWord.category}</span>
                <span className="chip">Написать {targetRepetitions} раз</span>
              </div>
              <div className="writing-title-row">
                <h3 className="writing-title">{currentWord.translation}</h3>
                <button
                  type="button"
                  className="writing-answer-inline writing-answer-inline-button"
                  onClick={toggleAnswerVisibility}
                  aria-pressed={isAnswerVisible}
                  title={isAnswerVisible ? "Скрыть ответ" : "Показать ответ"}
                >
                  <span>Ответ:</span>
                  <strong
                    className={
                      isAnswerVisible ? "" : "writing-answer-hidden"
                    }
                  >
                    {capitalizeWord(currentWord.word)}
                  </strong>
                  <span
                    className={
                      isAnswerVisible ? "" : "writing-answer-hidden"
                    }
                  >
                    {currentWord.transcription}
                  </span>
                  <span className="word-inline-translation-icon" aria-hidden="true">
                    {isAnswerVisible ? "×" : "👁"}
                  </span>
                </button>
              </div>
            </div>
            <AudioButton
              text={currentWord.audioText || currentWord.word}
              accent={settings.voiceAccent}
            />
          </div>

          <form className="writing-form" onSubmit={handleSubmit}>
            <div className="writing-target-row" aria-label="Количество повторов">
              <span>Повторов:</span>
              {REPETITION_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={
                    option === targetRepetitions
                      ? "target-repeat-button target-repeat-button-active"
                      : "target-repeat-button"
                  }
                  onClick={() => setTargetRepetitions(option)}
                  aria-pressed={option === targetRepetitions}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="writing-input-row">
              <input
                className={`text-input writing-input ${
                  hasInputError ? "writing-input-error" : ""
                }`}
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  if (hasInputError) {
                    setHasInputError(false);
                  }
                }}
                placeholder="Напиши английское слово"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
              />
              <button type="submit" className="button">
                Записать повтор
              </button>
            </div>
          </form>

          <div className="writing-progress-block">
            <div className="writing-progress-head">
              <strong>
                {currentCount} / {targetRepetitions}
              </strong>
              <span
                className={
                  hasInputError ? "error-text" : isInputCorrect ? "success-text" : "muted"
                }
              >
                {inputValue
                  ? isInputCorrect
                    ? "Можно записать"
                    : "Проверь ввод"
                  : "Пиши без подсказки"}
              </span>
            </div>
            <div className="progress-track" aria-hidden="true">
              <div
                className="progress-track-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {message ? <p className="muted">{message}</p> : null}
          </div>

          <MnemonicPanel word={currentWord} />

          <div className="button-row">
            <button
              type="button"
              className="button button-success"
              onClick={handleDone}
              disabled={!canFinish}
            >
              Сделал
            </button>
            <button
              type="button"
              className="button button-light"
              onClick={handleHide}
            >
              Больше не показывать
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => speak(currentWord.audioText || currentWord.word, settings.voiceAccent)}
            >
              Произнести
            </button>
            <button
              type="button"
              className="button button-light"
              onClick={() => setIsAutoSoundEnabled((current) => !current)}
            >
              {isAutoSoundEnabled ? "Автозвук включён" : "Автозвук выключен"}
            </button>
          </div>
        </article>

        <aside className="side-panel">
          <article className="card side-panel-card sticky-card">
            <div className="section-head">
              <div>
                <h3>Очередь письма</h3>
                <p className="muted">
                  Сюда попадают слова после изучения и повторения.
                </p>
              </div>
            </div>

            <div className="queue-list">
              {queuePreview.map((word, index) => (
                <button
                  key={word.id}
                  type="button"
                  className={
                    index === currentIndex
                      ? "queue-item queue-item-active writing-queue-button"
                      : "queue-item writing-queue-button"
                  }
                  onClick={() => goToWord(index)}
                >
                  <div className="mini-word-main">
                    <span className="mini-word-rank">{index + 1}</span>
                    <div>
                      <strong>{word.translation}</strong>
                      <p className="muted">
                        {capitalizeWord(word.word)} · {countsByWordId[word.id] || 0}/
                        {targetRepetitionsByWordId[word.id] || DEFAULT_REPETITIONS}
                      </p>
                    </div>
                  </div>
                  <span className="chip">{word.category}</span>
                </button>
              ))}
            </div>

            <div className="detail-block">
              <strong>Как проходить:</strong>
              <ul className="meta-list">
                <li>Смотри на русское слово и пиши английское.</li>
                <li>После правильного ввода слово озвучится.</li>
                <li>Выбери 3, 5 или 10 повторов под сложность слова.</li>
                <li>После нужного количества повторов нажимай «Сделал».</li>
                <li>Если слово уже точно не нужно писать, жми «Больше не показывать».</li>
              </ul>
            </div>
          </article>
        </aside>
      </div>
    </>
  );

  if (embedded) {
    return <div className="stack">{content}</div>;
  }

  return (
    <section className="stack">
      {content}
    </section>
  );
};

export default Writing;
