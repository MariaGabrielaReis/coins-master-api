import { Router } from "express";

import TeamController from "./app/controllers/TeamController";

const router = Router();

router.get("/teams", TeamController.index);
router.post("/teams", TeamController.store);

export default router;
