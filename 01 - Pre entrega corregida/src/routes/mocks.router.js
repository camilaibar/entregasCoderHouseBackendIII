import { json, Router } from "express";

import petsController from "../controllers/pets.controller.js";
import usersController from "../controllers/users.controller.js";

const router = Router();

// Endpoint base
router.get("/", (req, res, next) => {
  return res.status(200).send("Welcome to the mocks router");
});

router.get("/mockingPets", petsController.generateMockPets);
router.get("/mockingUsers", usersController.generateMockUsers);

// Endpoint para "generateData"
/*router.post("/generateData", async (req, res, next) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      throw NotFoundError("Missing 'users' or 'pets' parameter", error);
    }

    const generatedUsers = await UserService.createMockUser(users);
    const generatedPets = await PetService.createMockPet(pets);

    return customResponse.ok(res, {
      message: "Data generated successfully",
      users: generatedUsers.length,
      pets: generatedPets.length,
    });
  } catch (error) {
    next(error);
  }
});
*/
export default router;
