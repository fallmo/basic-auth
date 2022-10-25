import { handler } from "../../types/index.ts";
import { db, DB_NAME } from "../../utils/database.ts";

export const getGroupHandler: handler = async (req, res) => {
  const group = await db.database(DB_NAME).collection("group").findOne({ _id: req.params.id });

  res.setStatus(!group ? 404 : 200).json(group);
};
