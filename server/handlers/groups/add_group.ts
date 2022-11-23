import { handler } from "../../types/index.ts";
import { db, DB_NAME } from "../../utils/database.ts";
import Schema, { string } from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";
import { hashString } from "../../utils/hashing.ts";
import { createGroup } from "../../utils/openshift.ts";

export const addGroupHandler: handler = async (req, res) => {
  const [error, fields] = validateBody(req.body);

  if (error) {
    return res.setStatus(400).json({ error: error.message });
  }

  const success = await createGroup(fields!.name);

  res.setStatus(success ? 201 : 400).json(success ? { name: fields!.name } : { error: "Failed to create Group" });
};

// deno-lint-ignore no-explicit-any
function validateBody(body: any) {
  const validator = Schema({
    name: string.trim().between(4, 20),
  }).destruct();

  return validator(body);
}
