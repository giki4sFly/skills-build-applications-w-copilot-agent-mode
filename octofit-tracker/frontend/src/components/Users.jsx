import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const codespaceApiEndpoint = '-8000.app.github.dev/api/users';

  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to load users.');
        }
      }
    };

    fetchUsers();
    return () => controller.abort();
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Users</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id || user.id} className="list-group-item">
              <strong>{user.name}</strong>
              <div className="text-muted">{user.email}</div>
              <div className="text-muted">Fitness level: {user.fitnessLevel}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
