import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
const registerCollectionRoutes = (routeName, model) => {
    app.get(`/api/${routeName}/`, async (_req, res) => {
        try {
            const items = await model.find({});
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.post(`/api/${routeName}/`, async (req, res) => {
        try {
            const newItem = await model.create(req.body);
            res.status(201).json(newItem);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};
registerCollectionRoutes('users', User);
registerCollectionRoutes('teams', Team);
registerCollectionRoutes('activities', Activity);
registerCollectionRoutes('leaderboard', LeaderboardEntry);
registerCollectionRoutes('workouts', Workout);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
connectDatabase()
    .then(() => {
    console.log('MongoDB connected');
})
    .catch((error) => {
    console.warn('MongoDB connection unavailable, continuing without database:', error.message);
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
});
