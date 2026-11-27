import { MongoClient, type Collection } from "mongodb";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  userAgent: string | null;
};

// Reuse one client across hot reloads (dev) and warm serverless invocations (Vercel).
const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 })
      .connect()
      .catch((err) => {
        globalForMongo._mongoClient = undefined; // allow a retry on the next request
        throw err;
      });
  }
  return globalForMongo._mongoClient;
}

export async function contactMessages(): Promise<Collection<ContactMessage>> {
  const client = await getClient();
  return client.db(process.env.MONGODB_DB || "portfolio").collection<ContactMessage>("contact_messages");
}
