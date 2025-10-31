import { Router } from "express";

import { getUsers } from "../services/dataStore.js";

const router = Router();

router.get("/", (req, res) => {
  const users = getUsers();
  return res.status(200).json({
    total: users.length,
    data: users,
  });
});

export default router;
