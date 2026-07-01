import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessLevel: { type: String, required: true },
    goals: [{ type: String }],
});
const teamSchema = new Schema({
    name: { type: String, required: true },
    sport: { type: String, required: true },
    members: { type: Number, required: true },
    captain: { type: String, required: true },
});
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: String, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
});
const workoutSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    intensity: { type: String, required: true },
    equipment: [{ type: String }],
});
export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);
