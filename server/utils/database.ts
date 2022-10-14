import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { Group, User } from "../types/index.ts";

export const db = new MongoClient();
export const DB_NAME = Deno.env.get("DB_NAME")!;

await connectDatabase();

console.log("DB Connection Established...");

export const Users = db.database(DB_NAME).collection<User>("users");
export const Groups = db.database(DB_NAME).collection<Group>("groups");

async function connectDatabase() {
  const host = Deno.env.get("DB_HOST")!;
  try {
    await db.connect(`mongodb://${host}:27017`);
  } catch (err) {
    console.error(err);
    console.error(`Failed to connect to MongoDB`);
    Deno.exit(1);
  }
}

export function ensureDatabase() {
  return true;
}
