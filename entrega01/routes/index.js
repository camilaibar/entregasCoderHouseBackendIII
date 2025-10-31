import { Router } from "express";

import routerMocks from "./mocks.router.js";
import routerUsers from "./users.router.js";
import routerPets from "./pets.router.js";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).send("This is my base router");
});

router.use("/mocks", routerMocks);
router.use("/users", routerUsers);
router.use("/pets", routerPets);

export default router;
