import { Router } from "express";

export const router = Router();

// Temporalmente, solo para evitar errores
router.get("/", (req, res) => {
    res.send("Car routes working!");
});
