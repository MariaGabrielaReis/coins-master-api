import { Router } from "express";

import TeamController from "./app/controllers/TeamController";

const router = Router();

router.get("/teams", TeamController.index);
router.post("/teams", TeamController.store);
router.get("/teams/:code", TeamController.show);
router.put("/teams/:code", TeamController.update);

export default router;
