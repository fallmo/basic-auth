import { handler } from "../../types/index.ts";
import { db, DB_NAME } from "../../utils/database.ts";
import { stringToObjectId } from "../../utils/helpers.ts";

export const getUsersHandler: handler = async (_req, res) => {
  const users = await db.database(DB_NAME).collection("users").find().toArray();

  res.json(users);
};

export const getUserHandler: handler = async (req, res) => {
  const user = await db
    .database(DB_NAME)
    .collection("users")
    .findOne({ _id: stringToObjectId(req.params.id) });

  res.setStatus(!user ? 404 : 200).json(user);
};
