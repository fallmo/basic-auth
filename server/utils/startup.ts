import { ensureDatabase } from "./database.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts";

export async function startupTasks() {
  ensureEnvironment();
  validateNamespaces();
  ensureDatabase();
  await adminTokenPresent();
  return;
}

function ensureEnvironment() {
  const requiredVars: string[] = ["DB_HOST", "DB_NAME", "NAMESPACES"];

  if (Deno.env.get("USE_SSL")) {
    requiredVars.push("SSL_KEY_PATH", "SSL_CERT_PATH");
  }

  for (const val of requiredVars) {
    if (Deno.env.get(val)) continue;
    console.error(`Missing '${val}' Environment Variable`);
    Deno.exit(1);
  }
}

async function adminTokenPresent() {
  const tokenFilePath = `${Deno.cwd()}/admin-token`;
  try {
    const adminToken = await Deno.readTextFile(tokenFilePath);
    Deno.env.set("ADMIN_TOKEN", adminToken);
    console.log(`Reusing admin token file (${tokenFilePath})...`);
  } catch (err) {
    console.log(`Creating new admin token file (${tokenFilePath})...`);
    const newAdminToken = await cryptoRandomString({ length: 101, type: "url-safe" });
    Deno.env.set("ADMIN_TOKEN", newAdminToken);
    await Deno.writeTextFile(tokenFilePath, newAdminToken, { append: false });
  }
}

function validateNamespaces() {
  console.log(Deno.env.get("NAMESPACES"));
  if (/^[a-z]+(,[a-z]+)*$/.test(Deno.env.get("NAMESPACES")!)) return;
  console.error("env NAMESPACES must be a comma seperated list (a-Z)");
  Deno.exit(1);
}
