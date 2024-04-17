import { MongoClient, Db } from 'mongodb';

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  throw new Error('MongoDB URI is not defined in the environment variables.');
}

const client = new MongoClient(mongoURI);

let db: Db;

export async function connectDatabase() {
  try {
    // Connect to the MongoDB database
    await client.connect();
    db = client.db(process.env.MONGODB_DB);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to handle it elsewhere
  }
}

export function getDb() {
  return db;
}
