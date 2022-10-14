import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

export async function hashString(string: string) {
  return await bcrypt.hash(string);
}

export async function validateHash(stringValue: string, hashValue: string) {
  return await bcrypt.compare(stringValue, hashValue);
}
