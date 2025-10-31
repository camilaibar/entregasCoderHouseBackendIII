import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import router from "./routes/index.js";

// Initialization
const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/", router);

// Start app
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
