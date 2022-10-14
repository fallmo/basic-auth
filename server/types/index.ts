import { OpineRequest, OpineResponse, NextFunction } from "https://deno.land/x/opine@2.0.0/mod.ts";

export type User = {
  _id: string;
  name: string;
  username: string;
  password: string;
  groups: string[];
  roles: string[];
  json: string;
};

export type Group = {
  _id: string;
  name: string;
  roles: string[];
  members: [];
  json: [];
};
// deno-lint-ignore no-explicit-any
export type handler = (req: OpineRequest, res: OpineResponse, next: NextFunction) => any | Promise<any>;
