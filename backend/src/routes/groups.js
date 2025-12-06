import express from "express";
import groups from "../data/groups.json" with { type: "json" };

const router = express.Router();

// Devuelve todos los grupos:
router.get("/", (req, res) => {
    res.json(groups);
});

// Devuelve un grupo en particular:
router.get("/:id", (req, res) => {
    const group = groups[req.params.id.toUpperCase()];
    if (!group) return res.status(404).json({ error: "Grupo no encontrado" });

    res.json({ groupId: req.params.id, teams: group });
});

export default router;
