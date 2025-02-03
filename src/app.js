import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/user.routes.js";
import { router as carRoutes } from "./routes/car.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);

export default app;
