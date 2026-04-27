const EmptyState = ({ title, description }) => (
  <section className="card empty-state">
    <div className="empty-state-icon" aria-hidden="true">
      ✦
    </div>
    <h2>{title}</h2>
    <p className="muted">{description}</p>
  </section>
);

export default EmptyState;
