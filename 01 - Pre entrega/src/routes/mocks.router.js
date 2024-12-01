import { Router } from "express";

import UserService from "../services/users.services.js";
import PetService from "../services/pets.services.js";

const router = Router();

// Endpoint base
router.get("/", (req, res) => {
  return res.status(200).send("Welcome to the mocks router");
});

// Endpoint para "mockingpets"
router.get("/mockingpets", async (req, res) => {
  try {
    const pets = await PetService.generateMockPets(50); // Genera 50 mascotas ficticias
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error generating mock pets", error });
  }
});

// Endpoint para "mockingusers"
router.get("/mockingusers", async (req, res) => {
  try {
    const users = await UserService.generateMockUsers(50); // Genera 50 usuarios ficticios
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error generating mock users", error });
  }
});

// Endpoint para "generateData"
router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res
        .status(400)
        .json({ message: "Missing 'users' or 'pets' parameter" });
    }

    const generatedUsers = await UserService.createMockUser(users);
    const generatedPets = await PetService.createMockPet(pets);

    // Aquí podrías insertar los datos generados a la base de datos si es necesario

    res.status(201).json({
      message: "Data generated successfully",
      users: generatedUsers.length,
      pets: generatedPets.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating data", error });
  }
});

export default router;
