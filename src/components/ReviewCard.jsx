import { useEffect, useState } from "react";
import AudioButton from "./AudioButton";
import { capitalizeWord } from "../utils/text";

const ReviewCard = ({ word, accent, onAction }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsRevealed(false);
  }, [word.id]);

  return (
    <article className="card review-card">
      <div className="card-head">
        <div>
          <div className="chip-row">
            <span className="chip chip-accent">Повторение</span>
            <span className="chip">{word.category}</span>
          </div>
          <h2 className="word-title">{capitalizeWord(word.word)}</h2>
        </div>
        <AudioButton text={word.audioText || word.word} accent={accent} />
      </div>

      {!isRevealed ? (
        <div className="review-prompt">
          <span className="review-image" aria-hidden="true">
            {word.image}
          </span>
          <p className="muted review-prompt-text">
            Сначала попробуй сам вспомнить перевод, пример и ассоциацию.
          </p>
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
              <strong>Перевод:</strong>
              <p className="word-translation">{word.translation}</p>
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

            <div className="detail-block mnemonic-block">
              <strong>Мнемотехника:</strong>
              <p>{word.mnemonic}</p>
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
          </div>
        </>
      )}
    </article>
  );
};

export default ReviewCard;
