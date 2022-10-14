import { handler } from "../types/index.ts";
import { db, DB_NAME } from "../utils/database.ts";
import Schema, { string } from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";

export const postGroupHandler: handler = (req, res) => {
  const [error, fields] = validateBody(req.body);

  if (error) {
    return res.setStatus(400).json({ error: error.message });
  }

  console.log(fields);

  res.send("ok");
};

// deno-lint-ignore no-explicit-any
function validateBody(body: any) {
  const validator = Schema({
    name: string.trim().between(3, 20),
  }).destruct();

  return validator(body);
}
