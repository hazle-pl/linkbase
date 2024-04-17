// utils/db.ts
import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  // Remove deprecated options
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

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
