import { Router } from "express";

import petsController from "../../controllers/pets.controller.js";

const router = Router();

// Endpoint base
router.get("/health", (req, res, next) => {
  return res.status(200).send("Welcome to the pets router");
});

router.get("/", petsController.getPets);

export default router;
