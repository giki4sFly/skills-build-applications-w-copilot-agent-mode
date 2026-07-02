import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load workouts.');
        }
      }
    };

    fetchWorkouts();
    return () => controller.abort();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Workouts</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id} className="list-group-item">
              <strong>{workout.title}</strong>
              <div className="text-muted">
                {workout.category} • {workout.duration} • {workout.intensity}
              </div>
              {workout.equipment?.length ? (
                <div className="text-muted">Equipment: {workout.equipment.join(', ')}</div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Workouts;
