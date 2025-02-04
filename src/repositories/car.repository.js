import db from "../config/db.js";

export class CarRepository {
    static getAll() {
        return db.data.cars;
    }

    static findById(id) {
        return db.data.cars.find(car => car.id === id);
    }

    static findByUser(idUsuario) {
        return db.data.cars.filter(car => car.idUsuario === idUsuario);
    }

    static save(car) {
        db.data.cars.push(car);
        db.write();
        return car;
    }

    static delete(id) {
        const index = db.data.cars.findIndex(car => car.id === id);
        if (index !== -1) {
            db.data.cars.splice(index, 1);
            db.write();
            return true;
        }
        return false;
    }

    static update(id, newData) {
        const car = this.findById(id);
        if (car) {
            Object.assign(car, newData);
            db.write();
            return car;
        }
        return null;
    }
}