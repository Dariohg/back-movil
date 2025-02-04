import db from "../config/db.js";

export class UserRepository {
    static getAll() {
        return db.data.users;
    }

    static findById(id) {
        return db.data.users.find((user) => user.id === id);
    }

    static findByEmail(email) {
        return db.data.users.find((user) => user.email === email);
    }

    static save(user) {
        db.data.users.push(user);
        db.write();
        return user;
    }

    static findByUsername(username) {
        return db.data.users.find((user) => user.username === username);
    }
}
