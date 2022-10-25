import { Router, json } from "https://deno.land/x/opine@2.0.0/mod.ts";
import { deleteUserHandler } from "../handlers/users/delete.ts";
import { getAuthHandler } from "../handlers/auth/get.ts";
import { getUserHandler, getUsersHandler } from "../handlers/users/get.ts";
import { postUserHandler } from "../handlers/users/add.ts";
import { checkBasicAuth, requiresAdmin } from "../middlewares/index.ts";
import { updatePasswordHandler } from "../handlers/users/update_password.ts";

const router = Router();

// ping
router.get("/", (_req, res) => res.send("ok\n"));

// Check credentials against DB (basic auth)
router.get("/:namespace/auth", checkBasicAuth, getAuthHandler);

// Update password
router.post("/:namespace/update-password", checkBasicAuth, json(), updatePasswordHandler);
// router.post("/:namespace/update-password", (_req, res) => res.send("good"));

// Add a users
router.post("/users", requiresAdmin, json(), postUserHandler);

// Get all users
router.get("/users", requiresAdmin, getUsersHandler);

// Get a user
router.get("/users/:id", requiresAdmin, getUserHandler);

// Delete a user
router.delete("/users/:id", requiresAdmin, deleteUserHandler);

// Edit a user
// router.patch("/users/:id", requiresAdmin);

export default router;
