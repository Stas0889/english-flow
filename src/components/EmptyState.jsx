const EmptyState = ({ title, description, children }) => (
  <section className="card empty-state">
    <div className="empty-state-icon" aria-hidden="true">
      ✦
    </div>
    <h2>{title}</h2>
    <p className="muted">{description}</p>
    {children ? <div className="button-row">{children}</div> : null}
  </section>
);

export default EmptyState;
