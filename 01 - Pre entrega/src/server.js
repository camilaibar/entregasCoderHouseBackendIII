import express from "express";
import { program } from "commander";
import "dotenv/config"; // For using variables on .env file

import mongoDBConnection from "./config/mongoConfig.js";
import router from "./routes/index.js";

// Pre-config
program
  .option("-p <port>", "port server", 8080)
  .option("-m <mode>", "environment", "dev");

program.parse();

// Initialization
const { p, m } = program.opts();
const app = express();
mongoDBConnection();

// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", router);

// Start app
app.listen(p, () => {
  console.log(`App running on port: ${p} in ${m} mode`);
});
