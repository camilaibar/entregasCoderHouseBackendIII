import { Router } from "express";
import SessionController from "../../controllers/session.controller.js";
import { passportCall } from "../../utils/jwtUtils.js";

const router = Router();
const sessionController = new SessionController();

router.get("/", sessionController.getSession.bind(sessionController));

router.get(
  "/current",
  passportCall("jwt-cookies"),
  sessionController.getCurrentUser.bind(sessionController)
);

export default router;
