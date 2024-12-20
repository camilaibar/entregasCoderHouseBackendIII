import { Router } from "express";

import routerMocks from "./mocks.router.js";

const router = new Router();

router.get("/", (req, res) => {
  return res.status(200).send("Welcome to my backend");
});

router.get("/api", (req, res) => {
  return res.status(200).send("This is my base api router");
});

router.use("/api/mocks", routerMocks);

export default router;
