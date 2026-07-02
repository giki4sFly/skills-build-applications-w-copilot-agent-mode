import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespaceApiEndpoint = '-8000.app.github.dev/api/activities';

  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load activities.');
        }
      }
    };

    fetchActivities();
    return () => controller.abort();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Activities</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li key={activity._id || activity.id} className="list-group-item">
              <strong>{activity.type}</strong>
              <div className="text-muted">{activity.duration} • {activity.calories} calories</div>
              <div className="text-muted">{new Date(activity.date).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Activities;
