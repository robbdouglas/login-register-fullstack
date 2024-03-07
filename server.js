// server.js

import express from "express";
import dotenv from "dotenv";
import "./db-connect.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(express.json());

// DOTENV, PORT & LISTEN

const PORT = process.env.PORT;

// ROUTES-Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Benutzer gespeichert" });
  } catch (error) {
    console.error("Fehler beim Speichern des Benutzers:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
