import express from "express";
import { computeGroupStandings, computeAllStandings, computeThirdRanking } from "../logic/standings.js";

const router = express.Router();

/**
 * GET /standings
 * Devuelve la tabla de posiciones de TODOS los grupos
 */
router.get("/", (req, res) => {
    try {
        const standings = computeAllStandings();
        res.json(standings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al calcular standings" });
    }
});

/**
 * GET /standings/:groupId
 * Devuelve la tabla de posiciones de un grupo en particular
 */
router.get("/:groupId", (req, res) => {
    try {
        const groupId = req.params.groupId.toUpperCase();
        const standings = computeGroupStandings(groupId);
        res.json(standings);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

router.get("/thirds/all", (req, res) => {
    try {
        const thirds = computeThirdRanking();
        res.json(thirds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al calcular terceros" });
    }
});

router.get("/thirds/best8", (req, res) => {
    try {
        const thirds = computeThirdRanking();
        const best8 = thirds.slice(0, 8);
        res.json(best8);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al calcular mejores terceros" });
    }
});

export default router;