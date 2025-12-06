import express from "express";
import cors from "cors";
import groupsRouter from "./routes/groups.js";
import matchesRouter from "./routes/matches.js";
import standingsRouter from "./routes/standings.js";
import knockoutRouter from "./routes/knockout.js";

const app = express();
app.use(cors());
app.use(express.json());

// RUTAS PRINCIPALES:
app.use("/groups", groupsRouter);
app.use("/matches", matchesRouter);
app.use("/standings", standingsRouter);
app.use("/knockout", knockoutRouter);

app.listen(4000, () => {
    console.log("Backend running on port 4000");
});
