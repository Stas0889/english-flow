import AudioButton from "./AudioButton";

const PhraseCard = ({ phrase, accent }) => (
  <article className="card phrase-card">
    <div className="card-head">
      <div>
        <p className="eyebrow">Фраза дня</p>
        <h3>{phrase.phrase}</h3>
      </div>
      <AudioButton text={phrase.audioText || phrase.phrase} accent={accent} />
    </div>
    <p className="phrase-translation">{phrase.translation}</p>
    <p className="muted phrase-note">{phrase.explanation}</p>
    <div className="chip-row">
      <span className="chip chip-accent">{phrase.category}</span>
      <span className="chip">Рабочая фраза</span>
    </div>
  </article>
);

export default PhraseCard;
