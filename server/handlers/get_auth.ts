import { handler } from "../types/index.ts";

import { decode } from "https://deno.land/std@0.82.0/encoding/base64.ts";
import { Users } from "../utils/database.ts";
import { validateHash } from "../utils/hashing.ts";

export const getAuthHandler: handler = async (req, res) => {
  const authorizationHeader = req.headers.get("authorization");
  if (!authorizationHeader) return res.setStatus(400).json({ error: "Authorization header not set" });

  const base64Value = authorizationHeader.split(" ")[1];

  if (!base64Value) return res.setStatus(400).json({ error: "Malformed authorization header" });

  const [username, password] = new TextDecoder().decode(decode(base64Value)).split(":");
  if (!username || !password) return res.setStatus(400).json({ error: "Malformed authorization header" });

  const user = await Users.findOne({ username });
  if (!user) return res.setStatus(401).json({ error: "User does not exist" });

  const passwordsMatch = await validateHash(password, user.password);
  if (!passwordsMatch) res.setStatus(401).json({ error: "Credentials do not match" });

  return res.json({ sub: user._id, name: user.name, preferred_username: user.username });
};
