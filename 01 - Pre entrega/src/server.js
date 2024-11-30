import express from "express";
import { program } from "commander";

// Pre-config
program
  .option("-p <port>", "port server", 8080)
  .option("-m <mode>", "environment", "dev");

program.parse();

// Initialization
console.log(program.opts());
const { p, m } = program.opts();
const app = express();

// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.argv);

// Start app
app.listen(p, () => {
  console.log(`App running on port: ${p} in ${m} mode`);
});
