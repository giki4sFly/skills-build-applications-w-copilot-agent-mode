import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navItems = [
  { to: '/', label: 'Users', component: Users },
  { to: '/activities', label: 'Activities', component: Activities },
  { to: '/teams', label: 'Teams', component: Teams },
  { to: '/workouts', label: 'Workouts', component: Workouts },
  { to: '/leaderboard', label: 'Leaderboard', component: Leaderboard },
];

function App() {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="lead text-muted">
          React 19 presentation layer wired to the Node.js API with Codespaces-aware URLs.
        </p>
        <p className="text-muted small">
          Define VITE_CODESPACE_NAME in .env.local to target a Codespaces URL such as https://{name}-8000.app.github.dev/api/users/.
        </p>
      </div>

      <nav className="nav nav-pills justify-content-center mb-4">
        {navItems.map((item) => (
          <NavLink key={item.to} className="nav-link" to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        {navItems.map((item) => (
          <Route key={item.to} path={item.to} element={<item.component />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
