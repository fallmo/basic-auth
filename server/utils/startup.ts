import { ensureDatabase } from "./database.ts";

export function startupTasks() {
  ensureEnvironment();
  ensureDatabase();
  return;
}

function ensureEnvironment() {
  const requiredVars: string[] = ["DB_HOST", "DB_NAME"];
  for (const val of requiredVars) {
    if (Deno.env.get(val)) continue;
    console.error(`Missing '${val}' Environment Variable`);
    Deno.exit(1);
  }
}
