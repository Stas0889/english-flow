import AudioButton from "./AudioButton";
import { capitalizeWord } from "../utils/text";

const WordCard = ({ word, accent, onAction }) => (
  <article className="card word-card">
    <div className="card-head word-card-head">
      <div className="word-card-title-block">
        <div className="chip-row word-chip-row">
          <span className="chip chip-accent">{word.category}</span>
          <span className="chip">Новое слово</span>
        </div>
        <div className="word-inline-summary">
          <span className="word-inline-item word-inline-chip word-inline-chip-english">
            {capitalizeWord(word.word)}
          </span>
          <span className="word-inline-separator">—</span>
          <span className="word-inline-item word-inline-chip word-inline-chip-translation">
            {word.translation}
          </span>
          <span className="word-inline-separator">—</span>
          <span className="word-inline-item word-inline-chip word-inline-chip-transcription">
            {word.transcription}
          </span>
        </div>
      </div>
      <AudioButton text={word.audioText || word.word} accent={accent} />
    </div>

    <div className="word-card-layout">
      <div className="word-overview-column">
        <div className="detail-block mnemonic-block">
          <strong>Мнемотехника:</strong>
          <p>{word.mnemonic}</p>
        </div>
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
        onClick={() => onAction(word.id, "postpone")}
      >
        Отложить
      </button>
    </div>
  </article>
);

export default WordCard;
