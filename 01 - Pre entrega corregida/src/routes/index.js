import { Router } from "express";

import routerPets from "./v1/pets.router.js";
import routerUsers from "./v1/users.router.js";
import routerMocks from "./v1/mocks.router.js";

const router = new Router();

router.get("/", (req, res) => {
  return res.status(200).send("Welcome to my backend");
});

router.get("/api", (req, res) => {
  return res.status(200).send("This is my base api router");
});

router.use("/api/pets", routerPets);
router.use("/api/users", routerUsers);
router.use("/api/mocks", routerMocks);

export default router;
