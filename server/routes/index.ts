import { Router, json } from "https://deno.land/x/opine@2.0.0/mod.ts";
import { deleteUserHandler } from "../handlers/users/delete.ts";
import { getAuthHandler } from "../handlers/auth/get.ts";
import { getUserHandler, getUsersHandler } from "../handlers/users/get.ts";
import { postUserHandler } from "../handlers/users/add.ts";
import { checkBasicAuth, requiresAdmin } from "../middlewares/index.ts";
import { updatePasswordHandler } from "../handlers/users/update_password.ts";
import { getGroupHandler, getGroupsHandler } from "../handlers/groups/get_groups.ts";
import { addGroupHandler } from "../handlers/groups/add_group.ts";
import { deleteGroupHandler } from "../handlers/groups/delete_group.ts";
import { editGroupHandler } from "../handlers/groups/edit_group.ts";

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

// Get Groups
router.get("/groups", requiresAdmin, getGroupsHandler);

// Add Group
router.post("/groups", requiresAdmin, json(), addGroupHandler);

// Get Group
router.get("/groups/:name", requiresAdmin, getGroupHandler);

// Delete Group
router.delete("/groups/:name", requiresAdmin, deleteGroupHandler);

// Edit Group
router.patch("/groups/:name", requiresAdmin, json(), editGroupHandler);

export default router;
