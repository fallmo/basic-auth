import { handler } from "../types/index.ts";

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
