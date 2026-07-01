import express, { type Request, type Response } from 'express';
import { type Model } from 'mongoose';
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

const registerCollectionRoutes = (routeName: string, model: Model<any>) => {
  const routePaths = [`/api/${routeName}`, `/api/${routeName}/`];

  app.get(routePaths, async (_req: Request, res: Response) => {
    try {
      const items = await model.find({});
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.post(routePaths, async (req: Request, res: Response) => {
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

export const createApp = () => app;

export const startServer = async () => {
  try {
    await connectDatabase();
    console.log('MongoDB connected');
  } catch (error) {
    console.warn('MongoDB connection unavailable, continuing without database:', (error as Error).message);
  }

  app.listen(port, host, () => {
    console.log(`Backend listening on ${host}:${port}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
