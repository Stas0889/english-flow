import { useEffect, useState } from "react";
import AudioButton from "./AudioButton";
import MnemonicPanel from "./MnemonicPanel";
import { capitalizeWord } from "../utils/text";

const WordCard = ({ word, accent, onAction, studyDirection = "en-ru" }) => {
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const isReverseMode = studyDirection === "ru-en";
  const primaryText = isReverseMode ? word.translation : capitalizeWord(word.word);
  const answerText = isReverseMode ? capitalizeWord(word.word) : word.translation;
  const answerLabel = isReverseMode ? "английское слово" : "перевод";

  useEffect(() => {
    setIsTranslationVisible(false);
  }, [word.id, studyDirection]);

  return (
    <article className="card word-card">
      <div className="card-head word-card-head">
        <div className="word-card-title-block">
          <div className="chip-row word-chip-row">
            <span className="chip chip-accent">{word.category}</span>
            <span className="chip">Новое слово</span>
          </div>
          <div className="word-inline-summary">
            <span
              className={`word-inline-item word-inline-chip ${
                isReverseMode
                  ? "word-inline-chip-translation word-inline-chip-primary"
                  : "word-inline-chip-english"
              }`}
            >
              {primaryText}
            </span>
            <span className="word-inline-separator">—</span>
            <button
              type="button"
              className={`word-inline-item word-inline-chip ${
                isReverseMode
                  ? "word-inline-chip-english"
                  : "word-inline-chip-translation"
              } word-inline-chip-reveal ${
                isTranslationVisible ? "word-inline-chip-reveal-visible" : ""
              }`}
              onClick={() => setIsTranslationVisible((current) => !current)}
              aria-pressed={isTranslationVisible}
              aria-label={
                isTranslationVisible
                  ? `Скрыть ${answerLabel}`
                  : `Показать ${answerLabel}`
              }
              title={
                isTranslationVisible
                  ? `Скрыть ${answerLabel}`
                  : `Показать ${answerLabel}`
              }
            >
              <span
                className={`word-inline-translation-text ${
                  isTranslationVisible ? "" : "word-inline-translation-text-hidden"
                }`}
              >
                {answerText}
              </span>
              <span className="word-inline-translation-icon" aria-hidden="true">
                {isTranslationVisible ? "×" : "👁"}
              </span>
            </button>
            <span className="word-inline-separator">—</span>
            <span
              className={`word-inline-item word-inline-chip word-inline-chip-transcription ${
                isReverseMode && !isTranslationVisible
                  ? "word-inline-chip-transcription-hidden"
                  : ""
              }`}
              aria-hidden={isReverseMode && !isTranslationVisible}
            >
              {word.transcription}
            </span>
          </div>
        </div>
        <AudioButton text={word.audioText || word.word} accent={accent} />
      </div>

      <div className="word-card-layout">
        <div className="word-overview-column">
          <MnemonicPanel word={word} />
        </div>

        <div className="word-details-grid">
          <div className="detail-block">
            <strong>Простое предложение:</strong>
            <p>{word.example}</p>
            <p className="muted">{word.exampleTranslation}</p>
          </div>

          <div className="detail-block">
            <strong>Рабочий пример:</strong>
            <p>{word.workExample}</p>
            <p className="muted">{word.workExampleTranslation}</p>
          </div>
        </div>
      </div>

      <div className="word-actions">
        <button
          type="button"
          className="button button-success"
          onClick={() => onAction(word.id, "know")}
        >
          Знаю
        </button>
        <button
          type="button"
          className="button button-warning"
          onClick={() => onAction(word.id, "hard")}
        >
          Сложно
        </button>
        <button
          type="button"
          className="button button-danger-soft"
          onClick={() => onAction(word.id, "forgot")}
        >
          Не помню
        </button>
        <button
          type="button"
          className="button button-light"
          onClick={() => onAction(word.id, "mastered")}
        >
          Запомнил
        </button>
      </div>
    </article>
  );
};

export default WordCard;
