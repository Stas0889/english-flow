const ProgressCard = ({ label, value, hint }) => (
  <article className="card progress-card">
    <p className="progress-label">{label}</p>
    <strong className="progress-value">{value}</strong>
    {hint ? <p className="muted">{hint}</p> : null}
  </article>
);

export default ProgressCard;
