import { opine } from "https://deno.land/x/opine@2.0.0/mod.ts";
import routes from "./routes/index.ts";
import { startupTasks } from "./utils/startup.ts";

const app = opine();

app.use(routes);

startupTasks();

app.listen(3000, () => console.log("Server running on port 3000..."));
