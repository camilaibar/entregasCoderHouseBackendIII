import { Router } from "express";

import routerMocks from "./mocks.router.js";

const router = new Router();

router.get("/", (req, res) => {
  return res.status(200).send("This is my base router");
});

router.get("/mocks", routerMocks);

export default router;
