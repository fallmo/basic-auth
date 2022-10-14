import { handler } from "../types/index.ts";
import { db, DB_NAME } from "../utils/database.ts";

export const getUsersHandler: handler = async (_req, res) => {
  const users = await db.database(DB_NAME).collection("users").find().toArray();

  res.json(users);
};
