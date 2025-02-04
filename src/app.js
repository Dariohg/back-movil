import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as userRoutes } from "./routes/user.routes.js";
import { router as carRoutes } from "./routes/car.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use("/api/users", userRoutes);

app.use("/api/cars", authenticate, carRoutes);

export default app;