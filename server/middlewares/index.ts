import { handler } from "../types/index.ts";

export const requiresAdmin: handler = (_req, _res, next) => {
  // process token

  return next();
};
