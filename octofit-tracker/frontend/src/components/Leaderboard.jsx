import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load leaderboard.');
        }
      }
    };

    fetchLeaderboard();
    return () => controller.abort();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Leaderboard</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ol className="list-group list-group-numbered">
          {entries.map((entry) => (
            <li key={entry._id || entry.id} className="list-group-item">
              <strong>{entry.userName || entry.name}</strong>
              <div className="text-muted">Score: {entry.score}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;
