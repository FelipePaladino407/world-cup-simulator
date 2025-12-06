import { computeAllStandings, computeThirdRanking } from "./standings.js";

// Config de cruces según FIFA:
const roundOf32Config = [
    {
        id: 73,
        label: "Partido 73",
        date: "2026-06-28",
        stadium: "Los Angeles Stadium",
        home: { type: "position", group: "A", place: 2 },
        away: { type: "position", group: "B", place: 2 }
    },
    {
        id: 74,
        label: "Partido 74",
        date: "2026-06-29",
        stadium: "Boston Stadium",
        home: { type: "position", group: "E", place: 1 },
        away: { type: "bestThird", groups: ["A", "B", "C", "D", "F"] }
    },
    {
        id: 75,
        label: "Partido 75",
        date: "2026-06-29",
        stadium: "Estadio Monterrey",
        home: { type: "position", group: "F", place: 1 },
        away: { type: "position", group: "C", place: 2 }
    },
    {
        id: 76,
        label: "Partido 76",
        date: "2026-06-29",
        stadium: "Houston Stadium",
        home: { type: "position", group: "E", place: 1 },
        away: { type: "position", group: "F", place: 2 }
    },
    {
        id: 77,
        label: "Partido 77",
        date: "2026-06-30",
        stadium: "New York New Jersey Stadium",
        home: { type: "position", group: "I", place: 1 },
        away: { type: "bestThird", groups: ["C", "D", "F", "G", "H"] }
    },
    {
        id: 78,
        label: "Partido 78",
        date: "2026-06-30",
        stadium: "Dallas Stadium",
        home: { type: "position", group: "E", place: 2 },
        away: { type: "position", group: "I", place: 2 }
    },
    {
        id: 79,
        label: "Partido 79",
        date: "2026-06-30",
        stadium: "Estadio Azteca Mexico City",
        home: { type: "position", group: "A", place: 1 },
        away: { type: "bestThird", groups: ["C", "E", "F", "H", "I"] }
    },
    {
        id: 80,
        label: "Partido 80",
        date: "2026-07-01",
        stadium: "Atlanta Stadium",
        home: { type: "position", group: "L", place: 1 },
        away: { type: "bestThird", groups: ["E", "H", "I", "J", "K"] }
    },
    {
        id: 81,
        label: "Partido 81",
        date: "2026-07-01",
        stadium: "San Francisco Bay Area Stadium",
        home: { type: "position", group: "D", place: 1 },
        away: { type: "bestThird", groups: ["B", "E", "F", "I", "J"] }
    },
    {
        id: 82,
        label: "Partido 82",
        date: "2026-07-01",
        stadium: "Seattle Stadium",
        home: { type: "position", group: "G", place: 1 },
        away: { type: "bestThird", groups: ["A", "E", "H", "I", "J"] }
    },
    {
        id: 83,
        label: "Partido 83",
        date: "2026-07-02",
        stadium: "Toronto Stadium",
        home: { type: "position", group: "K", place: 2 },
        away: { type: "position", group: "L", place: 2 }
    },
    {
        id: 84,
        label: "Partido 84",
        date: "2026-07-02",
        stadium: "Los Angeles Stadium",
        home: { type: "position", group: "H", place: 1 },
        away: { type: "position", group: "J", place: 2 }
    },
    {
        id: 85,
        label: "Partido 85",
        date: "2026-07-02",
        stadium: "BC Place Vancouver",
        home: { type: "position", group: "B", place: 1 },
        away: { type: "bestThird", groups: ["E", "F", "G", "I", "J"] }
    },
    {
        id: 86,
        label: "Partido 86",
        date: "2026-07-03",
        stadium: "Miami Stadium",
        home: { type: "position", group: "J", place: 1 },
        away: { type: "position", group: "H", place: 2 }
    },
    {
        id: 87,
        label: "Partido 87",
        date: "2026-07-03",
        stadium: "Kansas City Stadium",
        home: { type: "position", group: "K", place: 1 },
        away: { type: "bestThird", groups: ["D", "E", "I", "J", "L"] }
    },
    {
        id: 88,
        label: "Partido 88",
        date: "2026-07-03",
        stadium: "Dallas Stadium",
        home: { type: "position", group: "D", place: 2 },
        away: { type: "position", group: "G", place: 2 }
    }
];

/**
 * Resuelve un cupo: o posición fija (1A, 2B, etc.)
 * o mejor tercero entre un set de grupos.
 */
function resolveSlot(slot, standingsByGroup, qualifiedThirds, usedThirdTeams) {
    if (slot.type === "position") {
        const table = standingsByGroup[slot.group];
        if (!table || table.length < slot.place) return null;
        return table[slot.place - 1].team;
    }

    if (slot.type === "bestThird") {
        // Buscamos el mejor tercero (según ranking) que:
        // - provenga de uno de los grupos indicados
        // - esté dentro de los 8 clasificados
        // - no haya sido usado ya en otro cruce
        for (const third of qualifiedThirds) {
            if (
                slot.groups.includes(third.group) &&
                !usedThirdTeams.has(third.team)
            ) {
                usedThirdTeams.add(third.team);
                return third.team;
            }
        }
        return null;
    }

    return null;
}

/**
 * Calcula todo el cuadro de 16avos (Partidos 73–88).
 */
export function computeRoundOf32() {
    const standingsByGroup = computeAllStandings();
    const thirdRanking = computeThirdRanking();
    const qualifiedThirds = thirdRanking.slice(0, 8); // top 8
    const usedThirdTeams = new Set();

    const matches = roundOf32Config.map(cfg => {
        const homeTeam = resolveSlot(cfg.home, standingsByGroup, qualifiedThirds, usedThirdTeams);
        const awayTeam = resolveSlot(cfg.away, standingsByGroup, qualifiedThirds, usedThirdTeams);

        return {
            id: cfg.id,
            label: cfg.label,
            date: cfg.date,
            stadium: cfg.stadium,
            home: homeTeam,
            away: awayTeam
        };
    });

    return {
        thirdRanking,       // los 12 terceros ordenados
        qualifiedThirds,    // los 8 que entran
        matches             // los 16 cruces resueltos
    };
}
