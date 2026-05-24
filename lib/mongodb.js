import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};
const dbName = process.env.MONGODB_DB_NAME || 'doctor_portfolio_booking';

if (!global.mongoClientPromise && uri) {
  const client = new MongoClient(uri, options);
  global.mongoClientPromise = client.connect();
}

export async function getMongoClient() {
  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  }
  return global.mongoClientPromise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}
