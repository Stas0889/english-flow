import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Главная" },
  { to: "/course", label: "Курс" },
  { to: "/learn", label: "Новые слова" },
  { to: "/review", label: "Повторение" },
  { to: "/practice", label: "Практика" },
  { to: "/dictionary", label: "Словарь" },
  { to: "/mistakes", label: "Ошибки" },
  { to: "/grammar", label: "Грамматика" },
  { to: "/progress", label: "Прогресс" },
  { to: "/settings", label: "Настройки" },
];

const Header = ({ dueCount, learnedCount, newCount }) => (
  <header className="site-header">
    <div className="container header-inner">
      <div className="header-top">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            EF
          </div>
          <div className="brand-copy">
            <h1 className="app-title">English Flow</h1>
            <p className="app-subtitle">
              Английский A1 для ежедневной практики и рабочих фраз
            </p>
          </div>
        </div>

        <div className="header-summary" aria-label="Сводка">
          <span className="summary-pill summary-pill-accent">
            Новые: {newCount}
          </span>
          <span className="summary-pill">Повторение: {dueCount}</span>
          <span className="summary-pill">Выучено: {learnedCount}</span>
        </div>
      </div>

      <nav className="main-nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
