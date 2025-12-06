import { useEffect, useState } from "react";

export default function Standings() {
    const [standings, setStandings] = useState({});

    useEffect(() => {
        fetch("http://localhost:4000/standings")
            .then(res => res.json())
            .then(setStandings);
    }, []);

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-white">Tabla de posiciones</h2>
                <p className="text-sm text-slate-300">
                    Ordenada por puntos, diferencia de goles y goles a favor.
                </p>
            </div>

            {Object.keys(standings).map(groupId => (
                <div key={groupId} className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">
                        Grupo {groupId}
                    </h3>

                    <div className="overflow-x-auto rounded-xl border border-slate-700/70 bg-slate-900/70">
                        <table className="min-w-full text-sm">
                            <thead className="bg-primaryDark/80 text-slate-100">
                            <tr>
                                <th className="px-3 py-2 text-left">Equipo</th>
                                <th className="px-3 py-2 text-center">PJ</th>
                                <th className="px-3 py-2 text-center">G</th>
                                <th className="px-3 py-2 text-center">E</th>
                                <th className="px-3 py-2 text-center">P</th>
                                <th className="px-3 py-2 text-center">GF</th>
                                <th className="px-3 py-2 text-center">GC</th>
                                <th className="px-3 py-2 text-center">DG</th>
                                <th className="px-3 py-2 text-center">PTS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {standings[groupId].map((team, idx) => (
                                <tr
                                    key={team.team}
                                    className={idx < 2 ? "bg-slate-900/60" : "bg-slate-900/30"}
                                >
                                    <td className="px-3 py-2 text-slate-100">{team.team}</td>
                                    <td className="px-3 py-2 text-center text-slate-200">{team.played}</td>
                                    <td className="px-3 py-2 text-center text-slate-200">{team.wins}</td>
                                    <td className="px-3 py-2 text-center text-slate-200">{team.draws}</td>
                                    <td className="px-3 py-2 text-center text-slate-200">{team.losses}</td>
                                    <td className="px-3 py-2 text-center text-slate-200">{team.goalsFor}</td>
                                    <td className="px-3 py-2 text-center text-slate-200">{team.goalsAgainst}</td>
                                    <td className="px-3 py-2 text-center text-slate-200">{team.goalDiff}</td>
                                    <td className="px-3 py-2 text-center font-bold text-amber-400">
                                        {team.points}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
