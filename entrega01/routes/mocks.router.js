import { Router } from "express";

import {
  generateMockPets,
  generateMockUsers,
} from "../services/mockGenerator.js";
import {
  insertPets,
  insertUsers,
} from "../services/dataStore.js";

const DEFAULT_BATCH = 50;
const router = Router();

const parseCount = (value, fallback = DEFAULT_BATCH) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) || parsed <= 0 ? fallback : parsed;
};

router.get("/mockingpets", (req, res) => {
  try {
    const count = parseCount(req.query.count);
    const pets = generateMockPets(count);
    return res.status(200).json({
      total: pets.length,
      data: pets,
    });
  } catch (error) {
    console.error("Error generating mock pets", error);
    return res.status(500).json({ message: "Error generating mock pets" });
  }
});

router.get("/mockingusers", async (req, res) => {
  try {
    const count = parseCount(req.query.count);
    const users = await generateMockUsers(count);
    return res.status(200).json({
      total: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error generating mock users", error);
    return res.status(500).json({ message: "Error generating mock users" });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (users === undefined || pets === undefined) {
      return res
        .status(400)
        .json({ message: "Missing 'users' or 'pets' parameter" });
    }

    const usersToGenerate = parseCount(users, 0);
    const petsToGenerate = parseCount(pets, 0);

    if (usersToGenerate === 0 && petsToGenerate === 0) {
      return res.status(400).json({
        message: "Both 'users' and 'pets' must be numbers greater than zero",
      });
    }

    const mockUsersPromise =
      usersToGenerate > 0 ? generateMockUsers(usersToGenerate) : Promise.resolve([]);
    const mockPets = petsToGenerate > 0 ? generateMockPets(petsToGenerate) : [];
    const mockUsers = await mockUsersPromise;

    insertUsers(mockUsers);
    insertPets(mockPets);

    return res.status(201).json({
      message: "Data generated successfully",
      usersInserted: mockUsers.length,
      petsInserted: mockPets.length,
    });
  } catch (error) {
    console.error("Error generating data", error);
    return res.status(500).json({ message: "Error generating data" });
  }
});

export default router;
