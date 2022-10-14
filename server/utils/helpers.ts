import { ObjectId } from "https://deno.land/x/mongo@v0.22.0/src/utils/bson.ts";

export function stringToObjectId(string: string) {
  try {
    return ObjectId(string);
  } catch (err) {
    console.error(err);
    console.error(`invalid object id '${string}'`);
    return Infinity;
  }
}
