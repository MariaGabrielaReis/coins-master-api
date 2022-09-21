import { Router } from "express";

import TeamController from "./app/controllers/TeamController";

const router = Router();

router.get("/teams", TeamController.index);

export default router;
