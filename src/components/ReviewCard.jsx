import { useEffect, useState } from "react";
import AudioButton from "./AudioButton";
import MnemonicPanel from "./MnemonicPanel";
import { capitalizeWord } from "../utils/text";

const ReviewCard = ({ word, accent, onAction, studyDirection = "en-ru" }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const isReverseMode = studyDirection === "ru-en";
  const promptText = isReverseMode ? word.translation : capitalizeWord(word.word);
  const answerLabel = isReverseMode ? "Английское слово:" : "Перевод:";
  const answerText = isReverseMode ? capitalizeWord(word.word) : word.translation;
  const promptHint = isReverseMode
    ? "Сначала попробуй вспомнить английское слово, потом открой ответ."
    : "Сначала попробуй сам вспомнить перевод, пример и ассоциацию.";

  useEffect(() => {
    setIsRevealed(false);
  }, [word.id, studyDirection]);

  return (
    <article className="card review-card">
      <div className="card-head">
        <div>
          <div className="chip-row">
            <span className="chip chip-accent">Повторение</span>
            <span className="chip">{word.category}</span>
          </div>
          <h2 className="word-title">{promptText}</h2>
        </div>
        {!isReverseMode || isRevealed ? (
          <AudioButton text={word.audioText || word.word} accent={accent} />
        ) : null}
      </div>

      {!isRevealed ? (
        <div className="review-prompt">
          <span className="review-image" aria-hidden="true">
            {word.image}
          </span>
          <p className="muted review-prompt-text">{promptHint}</p>
          <button
            type="button"
            className="button"
            onClick={() => setIsRevealed(true)}
          >
            Показать ответ
          </button>
        </div>
      ) : (
        <>
          <div className="review-answer-grid">
            <div className="detail-block mnemonic-block">
              <strong>{answerLabel}</strong>
              <p className="word-translation">{answerText}</p>
              <p className="transcription-text">{word.transcription}</p>
            </div>

            <div className="detail-block">
              <strong>Пример:</strong>
              <p>{word.example}</p>
              <p className="muted">{word.exampleTranslation}</p>
            </div>

            <div className="detail-block">
              <strong>Рабочий пример:</strong>
              <p>{word.workExample}</p>
              <p className="muted">{word.workExampleTranslation}</p>
            </div>

            <MnemonicPanel word={word} />
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
          </div>
        </>
      )}
    </article>
  );
};

export default ReviewCard;
