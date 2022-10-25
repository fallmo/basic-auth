import { handler } from "../types/index.ts";
import { Users } from "../utils/database.ts";
import { validateHash } from "../utils/hashing.ts";
import { decode } from "https://deno.land/std@0.82.0/encoding/base64.ts";

export const requiresAdmin: handler = (req, res, next) => {
  const authorization = req.headers.get("authorization");
  if (authorization) {
    const [_, token] = authorization.split(" ");
    if (Deno.env.get("ADMIN_TOKEN") === token) return next();
    else res.setStatus(401);
  } else {
    res.setStatus(403);
  }

  return res.json({ error: "Not authorized" });
};

export const checkBasicAuth: handler = async (req, res, next) => {
  if (!req.params.namespace) return res.setStatus(500).json({ error: "Route malconfigured" });

  const authorizationHeader = req.headers.get("authorization");
  if (!authorizationHeader) return res.setStatus(400).json({ error: "Authorization header not set" });

  const base64Value = authorizationHeader.split(" ")[1];

  if (!base64Value) return res.setStatus(400).json({ error: "Malformed authorization header" });

  const [username, password] = new TextDecoder().decode(decode(base64Value)).split(":");
  if (!username || !password) return res.setStatus(400).json({ error: "Malformed authorization header" });

  const user = await Users.findOne({ username });
  if (!user) return res.setStatus(401).json({ error: "User does not exist" });

  if (user.namespace !== req.params.namespace)
    return res.setStatus(401).json({ error: "User does not exist in namespace" });

  const passwordsMatch = await validateHash(password, user.password);
  if (!passwordsMatch) res.setStatus(401).json({ error: "Credentials do not match" });

  req.user = user;
  return next();
};

export const basicHttpLogger: handler = (req, _res, next) => {
  const DATA = ["HTTP", req.method, req.url, req.ip, `TS:${Date.now()}`];
  console.log(DATA.join("  "));
  next();
};
