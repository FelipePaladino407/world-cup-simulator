// src/routes/knockout.js
import express from "express";
import { computeRoundOf32 } from "../logic/knockout.js";
import { computeThirdRanking } from "../logic/standings.js";

const router = express.Router();

// Ver ranking de terceros y top 8 (repetido aca por si las moscas):
router.get("/thirds", (req, res) => {
    try {
        const thirds = computeThirdRanking();
        const best8 = thirds.slice(0, 8);
        res.json({ thirds, best8 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al calcular terceros" });
    }
});

// Cuadro de 16avos:
router.get("/round-of-32", (req, res) => {
    try {
        const result = computeRoundOf32();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al calcular 16avos" });
    }
});

export default router;
