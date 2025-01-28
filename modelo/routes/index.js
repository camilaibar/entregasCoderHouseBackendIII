import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import swaggerConfig from "../docs/info.js";

const router = new Router();
const specs = swaggerJSDoc(swaggerConfig);

router.get("/", (req, res) => {
  return res.status(200).send("Welcome to my backend");
});

router.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

router.get("/api", (req, res) => {
  return res.status(200).send("This is my base api router");
});

export default router;
