import { Router } from "express";

import { getPets } from "../services/dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  const pets = getPets();
  return res.status(200).json({
    total: pets.length,
    data: pets,
  });
});

export default router;
