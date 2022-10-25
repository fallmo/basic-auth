import { handler } from "../../types/index.ts";

export const getAuthHandler: handler = (req, res) => {
  if (!req.user) return res.setStatus(500).json({ error: "Route malconfigured" });

  return res.json({ sub: req.user._id, name: req.user.name, preferred_username: req.user.username });
};
