import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();
  const db = mongoose.connection.db;
  if (db) {
    await db.dropDatabase().catch(() => undefined);
  }

  const users = await User.insertMany([
    {
      name: 'Maya Chen',
      email: 'maya@example.com',
      fitnessLevel: 'advanced',
      goals: ['marathon', 'strength'],
    },
    {
      name: 'Jordan Alvarez',
      email: 'jordan@example.com',
      fitnessLevel: 'intermediate',
      goals: ['endurance', 'mobility'],
    },
    {
      name: 'Priya Singh',
      email: 'priya@example.com',
      fitnessLevel: 'beginner',
      goals: ['weight loss'],
    },
  ]);

  await Team.insertMany([
    {
      name: 'Trail Blazers',
      sport: 'Running',
      members: 4,
      captain: 'Maya Chen',
    },
    {
      name: 'Peak Performers',
      sport: 'Cycling',
      members: 3,
      captain: 'Jordan Alvarez',
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id,
      type: 'Run',
      duration: '45m',
      calories: 520,
      date: new Date('2026-06-30T06:30:00Z'),
    },
    {
      userId: users[1]._id,
      type: 'Cycling',
      duration: '60m',
      calories: 610,
      date: new Date('2026-06-29T07:00:00Z'),
    },
    {
      userId: users[2]._id,
      type: 'Yoga',
      duration: '30m',
      calories: 180,
      date: new Date('2026-06-28T18:30:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    {
      userId: users[0]._id,
      userName: users[0].name,
      score: 1280,
      rank: 1,
    },
    {
      userId: users[1]._id,
      userName: users[1].name,
      score: 1170,
      rank: 2,
    },
    {
      userId: users[2]._id,
      userName: users[2].name,
      score: 980,
      rank: 3,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Mobility',
      category: 'Mobility',
      duration: '20m',
      intensity: 'Easy',
      equipment: ['Yoga mat'],
    },
    {
      title: 'Hill Intervals',
      category: 'Cardio',
      duration: '35m',
      intensity: 'High',
      equipment: ['Running shoes'],
    },
  ]);

  console.log('Database seeded successfully');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
