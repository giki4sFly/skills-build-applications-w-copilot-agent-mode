import express, { type Request, type Response } from 'express';
import mongoose, { type Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

const registerCollectionRoutes = (routeName: string, model: Model<any>) => {
  app.get(`/api/${routeName}/`, async (_req: Request, res: Response) => {
    try {
      const items = await model.find({});
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.post(`/api/${routeName}/`, async (req: Request, res: Response) => {
    try {
      const newItem = await model.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });
};

registerCollectionRoutes('users', User);
registerCollectionRoutes('teams', Team);
registerCollectionRoutes('activities', Activity);
registerCollectionRoutes('leaderboard', LeaderboardEntry);
registerCollectionRoutes('workouts', Workout);

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error: Error) => {
    console.warn('MongoDB connection unavailable, continuing without database:', error.message);
  });

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
