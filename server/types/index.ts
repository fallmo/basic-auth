import { OpineRequest, OpineResponse, NextFunction } from "https://deno.land/x/opine@2.0.0/mod.ts";

export type User = {
  _id: string;
  name: string;
  username: string;
  password: string;
  namespace: string;
};

export type Group = {
  _id: string;
  name: string;
};
// deno-lint-ignore no-explicit-any
export type handler = (req: OpineRequest, res: OpineResponse, next: NextFunction) => any | Promise<any>;
