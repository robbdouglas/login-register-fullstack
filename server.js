// server.js

import express from "express";
import dotenv from "dotenv";
import "./db-connect.js";

dotenv.config();

const app = express();

// DOTENV, PORT & LISTEN

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
