import mongoose from 'mongoose';

const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  await mongoose.connect(mongodbUri);
  return mongoose;
};

export { mongodbUri };
