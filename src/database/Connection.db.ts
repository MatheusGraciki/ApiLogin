import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const key = process.env.DATABASE_KEY;

async function dbConnection() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`mongodb+srv://matheus:${key}@cluster0.aoyagsd.mongodb.net/?retryWrites=true&w=majority`);
  } catch (error) {
    console.error(error);
  }
}
export = dbConnection;
