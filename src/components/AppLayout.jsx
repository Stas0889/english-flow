import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = ({ appContext }) => (
  <div className="app-shell">
    <Header
      dueCount={appContext.dueWords.length}
      learnedCount={appContext.stats.learnedWords}
      newCount={appContext.todayNewWords.length}
    />
    <main className="container main-content">
      <Outlet context={appContext} />
    </main>
  </div>
);

export default AppLayout;
