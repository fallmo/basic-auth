import { HTTPSOptions, opine } from "https://deno.land/x/opine@2.0.0/mod.ts";
import routes from "./routes/index.ts";
import { startupTasks } from "./utils/startup.ts";

const app = opine();

app.use(routes);

await startupTasks();

const config: HTTPSOptions = {
  port: Deno.env.get("PORT") ? +Deno.env.get("PORT") : Deno.env.get("USE_SSL") ? 8443 : 8080,
};

if (Deno.env.get("USE_SSL")) {
  config.keyFile = Deno.env.get("SSL_KEY_PATH");
  config.certFile = Deno.env.get("SSL_CERT_PATH");
}

app.listen(config);

console.log(`Server listening on port ${config.port}`);
