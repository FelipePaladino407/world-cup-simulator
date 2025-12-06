import express from "express";
import matches from "../data/matches.json" with { type: "json" };
import fs from "fs";

const router = express.Router();

// Obtener todos los partidos
router.get("/", (req, res) => {
    res.json(matches);
});

// Obtener partidos por grupo
router.get("/group/:groupId", (req, res) => {
    const groupId = req.params.groupId.toUpperCase();
    const filtered = matches.filter(m => m.group === groupId);
    res.json(filtered);
});

// Actualizar resultado de un partido
router.post("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const match = matches.find(m => m.id === id);

    if (!match) return res.status(404).json({ error: "Partido no encontrado" });

    const { goalsHome, goalsAway } = req.body;

    match.goalsHome = goalsHome;
    match.goalsAway = goalsAway;
    match.played = true;

    fs.writeFileSync("./src/data/matches.json", JSON.stringify(matches, null, 2));

    res.json({ success: true, match });
});

export default router;
