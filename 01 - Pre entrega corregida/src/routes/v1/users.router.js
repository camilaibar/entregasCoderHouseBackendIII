import { Router } from "express";

import usersController from "../../controllers/users.controller.js";

const router = Router();

// Endpoint base
router.get("/health", (req, res, next) => {
  return res.status(200).send("Welcome to the users router");
});

router.get("/", usersController.getUsers);

export default router;
