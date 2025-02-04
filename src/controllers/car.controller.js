import { CarService } from "../services/car.service.js";
import { uploadCarImages } from "../config/multer.config.js";

export class CarController {
    static async create(req, res) {
        try {
            const car = await CarService.createCar(
                req.user.id, // ID del usuario autenticado
                req.body,
                req.files // Imágenes subidas
            );
            res.status(201).json(car);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const cars = await CarService.getCarsByUser(req.user.id);
            res.json(cars);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const car = await CarService.getCarById(req.params.id, req.user.id);
            res.json(car);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const car = await CarService.updateCar(
                req.params.id,
                req.user.id,
                req.body,
                req.files // Nuevas imágenes
            );
            res.json(car);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            await CarService.deleteCar(req.params.id, req.user.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static uploadMiddleware() {
        return uploadCarImages.array('imagenes', 5); // Máximo 5 imágenes
    }
}