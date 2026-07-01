import mongoose, { Schema, type Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  fitnessLevel: string;
  goals: string[];
}

export interface ITeam {
  name: string;
  sport: string;
  members: number;
  captain: string;
}

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: string;
  calories: number;
  date: Date;
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  userName: string;
  score: number;
  rank: number;
}

export interface IWorkout {
  title: string;
  category: string;
  duration: string;
  intensity: string;
  equipment: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessLevel: { type: String, required: true },
  goals: [{ type: String }],
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true },
  captain: { type: String, required: true },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: String, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  intensity: { type: String, required: true },
  equipment: [{ type: String }],
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
