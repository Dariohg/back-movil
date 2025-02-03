import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export class UserService {
    static async register(nombre, username, email, telefono, edad, password) {
        if (UserRepository.findByUsername(username) || UserRepository.findByEmail(email)) {
            throw new Error("El usuario o email ya están en uso.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(uuidv4(), nombre, username, email, telefono, edad, hashedPassword);
        return UserRepository.save(newUser);
    }

    static async login(username, password) {
        const user = UserRepository.findByUsername(username);
        if (!user) throw new Error("Usuario no encontrado.");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Contraseña incorrecta.");

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return { token, user };
    }
}
