import { handler } from "../../types/index.ts";
import { Users } from "../../utils/database.ts";
import Schema, { string } from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";
import { hashString } from "../../utils/hashing.ts";

export const updatePasswordHandler: handler = async (req, res) => {
  if (!req.user) return res.setStatus(500).json({ error: "Route malconfigured" });
  const [error, fields] = validateBody(req.body);

  if (error) return res.setStatus(400).json({ error: error.message });

  await Users.updateOne({ _id: req.user._id }, { $set: { password: await hashString(fields!.new_password) } });

  return res.setStatus(200).json({ _id: req.user._id });
};

// deno-lint-ignore no-explicit-any
function validateBody(body: any) {
  const validator = Schema({
    new_password: string,
  }).destruct();

  return validator(body);
}
