import { OpineRequest, OpineResponse, NextFunction } from "https://deno.land/x/opine@2.0.0/mod.ts";

export type User = {
  _id: string;
  name: string;
  username: string;
  password: string;
  namespace: string;
};

export type handler = (
  req: OpineRequest & { user?: User },
  res: OpineResponse,
  next: NextFunction
  // deno-lint-ignore no-explicit-any
) => any | Promise<any>;
