import { useEffect, useState } from "react";

export default function Knockout() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:4000/knockout/round-of-32")
            .then(res => res.json())
            .then(setData);
    }, []);

    if (!data) return <p className="text-slate-200">Cargando cruces...</p>;

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-white">Cruces – 16avos de final</h2>
                <p className="text-sm text-slate-300">
                    Armados según las posiciones finales en los grupos y el ranking de los mejores terceros.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {data.matches.map(m => (
                    <div
                        key={m.id}
                        className="bg-slate-900/70 border border-slate-700/70 rounded-xl px-4 py-3 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-400">
                #{m.id} • {m.date}
              </span>
                            <span className="text-[10px] uppercase tracking-wide text-primary/80">
                {m.stadium}
              </span>
                        </div>

                        <div className="flex flex-col gap-1 mt-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-200">Local</span>
                                <span className="text-sm md:text-base font-semibold text-white">
                  {m.home ?? "Por definir"}
                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-200">Visitante</span>
                                <span className="text-sm md:text-base font-semibold text-white">
                  {m.away ?? "Por definir"}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                    Ranking de terceros (informativo)
                </h3>
                <p className="text-xs text-slate-400 mb-2">
                    Los 8 mejores terceros se usan para llenar los cupos según las combinaciones de la FIFA.
                </p>

                <div className="overflow-x-auto border border-slate-700/80 rounded-xl bg-slate-900/70">
                    <table className="min-w-full text-xs">
                        <thead className="bg-primaryDark/80 text-slate-100">
                        <tr>
                            <th className="px-3 py-2 text-left">Equipo</th>
                            <th className="px-3 py-2 text-center">Grupo</th>
                            <th className="px-3 py-2 text-center">PTS</th>
                            <th className="px-3 py-2 text-center">DG</th>
                            <th className="px-3 py-2 text-center">GF</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.thirdRanking.map((t, idx) => (
                            <tr
                                key={`${t.group}-${t.team}`}
                                className={idx < 8 ? "bg-slate-900/50" : "bg-slate-900/20"}
                            >
                                <td className="px-3 py-2 text-slate-100">{t.team}</td>
                                <td className="px-3 py-2 text-center text-slate-200">{t.group}</td>
                                <td className="px-3 py-2 text-center text-slate-200">{t.points}</td>
                                <td className="px-3 py-2 text-center text-slate-200">{t.goalDiff}</td>
                                <td className="px-3 py-2 text-center text-slate-200">{t.goalsFor}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
