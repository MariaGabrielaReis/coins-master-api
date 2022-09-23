import { Router } from "express";
import AvaliationController from "./app/controllers/AvaliationController";
import FeedbackController from "./app/controllers/FeedbackController";

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
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

router.post("/avaliation", AvaliationController.store);
router.get("/avaliation/:userId", AvaliationController.show);

router.get("/feedbacks/:userId", FeedbackController.show);

export default router;
