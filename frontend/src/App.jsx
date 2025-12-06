import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Groups from "./pages/Groups";
import Standings from "./pages/Standings";
import Knockout from "./pages/Knockout";

const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-semibold transition
   ${isActive ? "bg-white text-primaryDark" : "text-slate-100 hover:bg-primaryDark/60"}`;

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black">
                <header className="border-b border-primaryDark/60 bg-primary/90 backdrop-blur">
                    <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <span className="text-primaryDark font-black text-lg">⚽</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-extrabold tracking-wide text-white">
                                    Mundial 2026 – Simulador
                                </h1>
                                <p className="text-xs text-slate-100/70">
                                    Fase de grupos • Tabla • Cruces
                                </p>
                            </div>
                        </div>

                        <nav className="flex gap-2">
                            <NavLink to="/groups" className={navLinkClass}>
                                Grupos
                            </NavLink>
                            <NavLink to="/standings" className={navLinkClass}>
                                Posiciones
                            </NavLink>
                            <NavLink to="/knockout" className={navLinkClass}>
                                Cruces
                            </NavLink>
                        </nav>
                    </div>
                </header>

                <main className="max-w-5xl mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<Groups />} />
                        <Route path="/groups" element={<Groups />} />
                        <Route path="/standings" element={<Standings />} />
                        <Route path="/knockout" element={<Knockout />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}
