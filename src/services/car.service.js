import { CarRepository } from "../repositories/car.repository.js";
import { Car } from "../models/car.model.js";
import { v4 as uuidv4 } from 'uuid';

export class CarService {
    static async createCar(idUsuario, carData, images = []) {
        const newCar = new Car(
            uuidv4(),
            idUsuario,
            carData.nombre,
            carData.modelo,
            carData.color,
            carData.anioFabricacion,
            carData.estado,
            images.map(img => `/uploads/cars/${img.filename}`) // Guardar rutas
        );

        return CarRepository.save(newCar);
    }

    static async getCarsByUser(idUsuario) {
        return CarRepository.findByUser(idUsuario);
    }

    static async getCarById(id, idUsuario) {
        const car = CarRepository.findById(id);
        if (!car || car.idUsuario !== idUsuario) {
            throw new Error("Auto no encontrado o no autorizado");
        }
        return car;
    }

    static async updateCar(id, idUsuario, newData, newImages = []) {
        const car = CarRepository.findById(id);
        if (!car || car.idUsuario !== idUsuario) {
            throw new Error("Auto no encontrado o no autorizado");
        }

        // Actualizar datos
        Object.assign(car, newData);

        // Agregar nuevas imágenes si existen
        if (newImages.length > 0) {
            car.imagenes = [
                ...car.imagenes,
                ...newImages.map(img => `/uploads/cars/${img.filename}`)
            ];
        }

        return CarRepository.update(id, car);
    }

    static async deleteCar(id, idUsuario) {
        const car = CarRepository.findById(id);
        if (!car || car.idUsuario !== idUsuario) {
            throw new Error("Auto no encontrado o no autorizado");
        }
        return CarRepository.delete(id);
    }
}