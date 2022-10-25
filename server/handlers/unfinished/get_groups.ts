import { handler } from "../../types/index.ts";
import { db, DB_NAME } from "../../utils/database.ts";

export const getGroupsHandler: handler = async (_req, res) => {
  const groups = await db.database(DB_NAME).collection("groups").find().toArray();

  res.json(groups);
};
