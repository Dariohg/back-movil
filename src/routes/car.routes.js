import { Router } from "express";
import { CarController } from "../controllers/car.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(authenticate); // Todas las rutas requieren autenticación

// Crear un carro
router.post(
    "/",
    CarController.uploadMiddleware(),
    CarController.create
);

// Obtener todos los carros del usuario
router.get("/", CarController.getAll);

// Obtener un carro por ID
router.get("/:id", CarController.getById);

// Actualizar un carro
router.put(
    "/:id",
    CarController.uploadMiddleware(),
    CarController.update
);

// Eliminar un carro
router.delete("/:id", CarController.delete);