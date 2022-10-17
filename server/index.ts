import { opine } from "https://deno.land/x/opine@2.0.0/mod.ts";
import routes from "./routes/index.ts";
import { startupTasks } from "./utils/startup.ts";

const app = opine();

app.use(routes);

startupTasks();

const PORT = Deno.env.get("USE_SSL") ? 8443 : 8080;

app.listen({
  keyFile: Deno.env.get("SSL_KEY_PATH"),
  certFile: Deno.env.get("SSL_CERT_PATH"),
  port: PORT,
});

console.log(`Server listening on port ${PORT}`);
