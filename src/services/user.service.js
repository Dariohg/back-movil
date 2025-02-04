import { UserRepository } from "../repositories/user.repository.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export class UserService {
    static async register(nombre, username, email, telefono, edad, password) {
        // Validaciones básicas
        if (!nombre || !username || !email || !password) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("El email no tiene un formato válido.");
        }

        // Verificar si el usuario o email ya existen
        if (UserRepository.findByUsername(username)) {
            throw new Error("El nombre de usuario ya está en uso.");
        }

        if (UserRepository.findByEmail(email)) {
            throw new Error("El email ya está registrado.");
        }

        // Crear el usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(uuidv4(), nombre, username, email, telefono, edad, hashedPassword);
        return UserRepository.save(newUser);
    }

    static async login(username, password) {
        const user = UserRepository.findByUsername(username);
        if (!user) throw new Error("Usuario no encontrado.");

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Contraseña incorrecta.");

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return { token, user };
    }

    static async usernameExists(username) {
        const user = UserRepository.findByUsername(username);
        return !!user;
    }
}