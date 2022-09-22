import { Router } from "express";

import TeamController from "./app/controllers/TeamController";
import UserController from "./app/controllers/UserController";

const router = Router();

router.get("/teams", TeamController.index);
router.post("/teams", TeamController.store);
router.get("/teams/:code", TeamController.show);
router.put("/teams/:code", TeamController.update);
router.delete("/teams/:code", TeamController.delete);

router.get("/users", UserController.index);
router.post("/users", UserController.store);
router.get("/users/:id", UserController.show);

export default router;
