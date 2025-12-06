import groups from "../data/groups.json" with { type: "json" };
import fs from "fs";

export function generateGroupMatches() {
    const matches = [];
    let matchId = 1;

    for (const groupId of Object.keys(groups)) {
        const teams = groups[groupId];

        // Todas las combinaciones posibles (round robin)
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                matches.push({
                    id: matchId++,
                    group: groupId,
                    home: teams[i],
                    away: teams[j],
                    goalsHome: null,
                    goalsAway: null,
                    played: false
                });
            }
        }
    }

    // Guardamos en archivo JSON:
    fs.writeFileSync("./src/data/matches.json", JSON.stringify(matches, null, 2));
    console.log("Partidos generados con éxito:", matches.length);
}
