import express from "express";
import cors from "cors";
import jobRoutes from "./routes/job.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/server-health", (req, res, next) => res.json("Server is running"));
app.use("/api/jobs", jobRoutes);

export default app;
