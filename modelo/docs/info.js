import { version } from "mongoose";

const info = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: " API Backend III",
      version: "1.0.0",
      description:
        "Documentacion de la entrega final del proyecto de backend III",
    },
    servers: [{ url: "http://localhost:8080/" }],
  },
  apis: ["./src/docs/*.yml"],
};

export default info;
