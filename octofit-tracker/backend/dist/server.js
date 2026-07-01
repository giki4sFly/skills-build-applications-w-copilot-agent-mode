import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
const app = express();
const port = Number(process.env.PORT || 8000);
const host = '0.0.0.0';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express.json());
const registerCollectionRoutes = (routeName, model) => {
    const routePaths = [`/api/${routeName}`, `/api/${routeName}/`];
    app.get(routePaths, async (_req, res) => {
        try {
            if (mongoose.connection.readyState !== 1) {
                return res.json([]);
            }
            const items = await model.find({});
            return res.json(items);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
    app.post(routePaths, async (req, res) => {
        try {
            if (mongoose.connection.readyState !== 1) {
                return res.status(503).json({ error: 'Database unavailable' });
            }
            const newItem = await model.create(req.body);
            return res.status(201).json(newItem);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
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
export const createApp = () => app;
export const startServer = async () => {
    try {
        await connectDatabase();
        console.log('MongoDB connected');
    }
    catch (error) {
        console.warn('MongoDB connection unavailable, continuing without database:', error.message);
    }
    app.listen(port, host, () => {
        console.log(`Backend listening on ${host}:${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
};
if (process.env.NODE_ENV !== 'test') {
    startServer();
}
