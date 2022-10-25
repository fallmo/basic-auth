import { handler } from "../../types/index.ts";
import { Users } from "../../utils/database.ts";
import { stringToObjectId } from "../../utils/helpers.ts";

export const deleteUserHandler: handler = async (req, res) => {
  //  remove from OCP first
  const deleted = await Users.deleteOne({ _id: stringToObjectId(req.params.id) });
  if (!deleted) return res.setStatus(404).json({ error: `user ${req.params.id} not found` });

  res.json({ _id: req.params.id });
};
