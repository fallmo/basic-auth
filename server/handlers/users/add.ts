import { handler } from "../../types/index.ts";
import { db, DB_NAME } from "../../utils/database.ts";
import Schema, { string } from "https://denoporter.sirjosh.workers.dev/v1/deno.land/x/computed_types/src/index.ts";
import { hashString } from "../../utils/hashing.ts";

export const postUserHandler: handler = async (req, res) => {
  const [error, fields] = await validateBody(req.body);

  if (error) {
    return res.setStatus(400).json({ error: error.message });
  }

  fields!.password = await hashString(fields!.password);
  const _id = await db.database(DB_NAME).collection("users").insertOne(fields!);

  res.setStatus(201).json({ _id });
};

// deno-lint-ignore no-explicit-any
function validateBody(body: any) {
  const validator = Schema({
    name: string.trim().between(4, 20),
    username: usernameValidator,
    password: string,
    namespace: namespaceValidator,
  }).destruct();

  return validator(body);
}

async function usernameValidator(username: string) {
  const validator = string.trim().between(4, 20);
  username = validator(username);

  const exists = await db.database(DB_NAME).collection("users").findOne({ username });
  if (!exists) return username;

  throw new TypeError(`username ${username} is already taken`);
}

function namespaceValidator(namespace: string) {
  if (Deno.env.get("NAMESPACES")!.split(",").includes(namespace)) return namespace;
  throw new TypeError(`namespace must be in: ${Deno.env.get("NAMESPACES")!}`);
}
