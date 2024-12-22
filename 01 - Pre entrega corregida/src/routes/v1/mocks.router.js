import { json, Router } from "express";

import mocksController from "../../controllers/mocks.controller.js";
import petsController from "../../controllers/pets.controller.js";
import usersController from "../../controllers/users.controller.js";

const router = Router();

// Endpoint base
router.get("/", (req, res, next) => {
  return res.status(200).send("Welcome to the mocks router");
});

router.get("/mockingPets", petsController.generateMockPets);
router.get("/mockingUsers", usersController.generateMockUsers);
router.post("/generateData", mocksController.generateMocks);

export default router;
