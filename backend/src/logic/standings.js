import groups from "../data/groups.json" with { type: "json" };
import matches from "../data/matches.json" with { type: "json" };

/**
 * Inicializa la tabla de un grupo con todos sus equipos en 0.
 */
function initGroupTable(groupId) {
    const teams = groups[groupId];
    if (!teams) throw new Error(`Grupo ${groupId} no existe en groups.json`);

    const table = {};

    teams.forEach(teamName => {
        table[teamName] = {
            team: teamName,
            group: groupId,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDiff: 0,
            points: 0
        };
    });

    return table;
}

/**
 * Actualiza estadísticas de un equipo con el resultado de un solo partido.
 */
function updateTeamStats(team, goalsFor, goalsAgainst, table) {
    const row = table[team];

    row.played += 1;
    row.goalsFor += goalsFor;
    row.goalsAgainst += goalsAgainst;
    row.goalDiff = row.goalsFor - row.goalsAgainst;

    if (goalsFor > goalsAgainst) {
        row.wins += 1;
        row.points += 3;
    } else if (goalsFor === goalsAgainst) {
        row.draws += 1;
        row.points += 1;
    } else {
        row.losses += 1;
        // 0 puntos, no sumamos nada
    }
}

/**
 * Calcula la tabla de posiciones de UN grupo.
 */
export function computeGroupStandings(groupId) {
    const gId = groupId.toUpperCase();
    const table = initGroupTable(gId);

    // Tomamos solo los partidos de ese grupo que ya fueron jugados
    const groupMatches = matches.filter(
        m => m.group === gId && m.played && m.goalsHome != null && m.goalsAway != null
    );

    groupMatches.forEach(match => {
        updateTeamStats(match.home, match.goalsHome, match.goalsAway, table);
        updateTeamStats(match.away, match.goalsAway, match.goalsHome, table);
    });

    // Pasamos el objeto a array y lo ordenamos según criterios FIFA
    const standings = Object.values(table).sort((a, b) => {
        // 1) Puntos
        if (b.points !== a.points) return b.points - a.points;
        // 2) Diferencia de goles
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
        // 3) Goles a favor
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        // 4) Último criterio: orden alfabético (opcional)
        return a.team.localeCompare(b.team);
    });

    return standings;
}

/**
 * Calcula la tabla de posiciones de TODOS los grupos.
 * Devuelve un objeto: { A: [..], B: [..], ... }
 */
export function computeAllStandings() {
    const result = {};

    Object.keys(groups).forEach(groupId => {
        result[groupId] = computeGroupStandings(groupId);
    });

    return result;
}

export function computeThirdRanking() {
    const all = computeAllStandings();
    const thirds = [];

    Object.keys(all).forEach(groupId => {
        const standings = all[groupId];

        // Si aún no hay suficientes partidos, igual tomamos al "actual 3º"
        if (standings.length >= 3) {
            const third = standings[2];
            thirds.push(third);
        }
    });

    // Ordeno igual que en la tabla:
    thirds.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return a.team.localeCompare(b.team);
    });

    return thirds;
}
