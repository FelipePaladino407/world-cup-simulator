import { useEffect, useState } from "react";

export default function Groups() {
    const [groups, setGroups] = useState({});
    const [selectedGroup, setSelectedGroup] = useState("A");
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/groups")
            .then(res => res.json())
            .then(setGroups);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:4000/matches/group/${selectedGroup}`)
            .then(res => res.json())
            .then(setMatches);
    }, [selectedGroup]);

    const updateResult = async (id, goalsHome, goalsAway) => {
        await fetch(`http://localhost:4000/matches/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goalsHome, goalsAway })
        });

        const res = await fetch(`http://localhost:4000/matches/group/${selectedGroup}`);
        setMatches(await res.json());
    };

    return (
        <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Partidos por grupo</h2>
                    <p className="text-sm text-slate-300">
                        Carga los resultados de la fase de grupos para ver cómo cambia la tabla y los cruces.
                    </p>
                </div>

                <div className="flex flex-col text-sm">
                    <label className="text-slate-200 mb-1">Elegir grupo</label>
                    <select
                        value={selectedGroup}
                        onChange={e => setSelectedGroup(e.target.value)}
                        className="bg-slate-900 border border-primary/70 text-slate-100 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {Object.keys(groups).map(g => (
                            <option key={g} value={g}>Grupo {g}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                {matches.map(m => (
                    <div
                        key={m.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-slate-400">#{m.id}</span>
                            <div className="flex flex-col">
                                <span className="text-sm text-slate-300">Grupo {m.group}</span>
                                <span className="text-xs text-slate-500">
                  {m.played ? "Finalizado" : "Pendiente"}
                </span>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center gap-2 md:gap-4">
              <span className="text-sm md:text-base font-semibold text-slate-100 text-right max-w-[140px]">
                {m.home}
              </span>

                            <input
                                type="number"
                                min="0"
                                className="w-14 bg-slate-950 border border-slate-600 rounded-md px-2 py-1 text-center text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                defaultValue={m.goalsHome ?? ""}
                                onChange={e => (m.goalsHome = Number(e.target.value))}
                            />
                            <span className="text-slate-400 font-semibold">–</span>
                            <input
                                type="number"
                                min="0"
                                className="w-14 bg-slate-950 border border-slate-600 rounded-md px-2 py-1 text-center text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                defaultValue={m.goalsAway ?? ""}
                                onChange={e => (m.goalsAway = Number(e.target.value))}
                            />

                            <span className="text-sm md:text-base font-semibold text-slate-100 max-w-[140px]">
                {m.away}
              </span>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => updateResult(m.id, m.goalsHome, m.goalsAway)}
                                className="inline-flex items-center gap-1 bg-primary hover:bg-primaryDark text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-md shadow-sm transition"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                ))}

                {matches.length === 0 && (
                    <p className="text-slate-400 text-sm">
                        No hay partidos cargados para este grupo.
                    </p>
                )}
            </div>
        </div>
    );
}
