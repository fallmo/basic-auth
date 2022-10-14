import { Router, json } from "https://deno.land/x/opine@2.0.0/mod.ts";
import { deleteUserHandler } from "../handlers/delete_user.ts";
import { getAuthHandler } from "../handlers/get_auth.ts";
import { getGroupHandler } from "../handlers/get_group.ts";
import { getGroupsHandler } from "../handlers/get_groups.ts";
import { getUserHandler } from "../handlers/get_user.ts";
import { getUsersHandler } from "../handlers/get_users.ts";
import { postGroupHandler } from "../handlers/post_group.ts";
import { postUserHandler } from "../handlers/post_user.ts";
import { requiresAdmin } from "../middlewares/index.ts";

const router = Router();

// Check credentials against DB (basic auth)
router.get("/auth", getAuthHandler);

// Add a users
router.post("/users", requiresAdmin, json(), postUserHandler);

// Get all users
router.get("/users", requiresAdmin, getUsersHandler);

// Get a user
router.get("/users/:id", requiresAdmin, getUserHandler);

// Edit a user
router.patch("/users/:id", requiresAdmin);

// Delete a user
router.delete("/users/:id", requiresAdmin, deleteUserHandler);

// Add a group
router.post("/groups", requiresAdmin, json(), postGroupHandler);

// Get all groups
router.get("/groups", requiresAdmin, getGroupsHandler);

// Get group
router.get("/groups/:id", requiresAdmin, getGroupHandler);

// Edit group
router.patch("/groups/:id", requiresAdmin);

// Delete group
router.delete("/groups/:id", requiresAdmin);

export default router;
