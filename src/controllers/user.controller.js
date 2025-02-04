import { UserService } from "../services/user.service.js";

export class UserController {
    static async register(req, res) {
        try {
            const { nombre, username, email, telefono, edad, password } = req.body;
            const user = await UserService.register(nombre, username, email, telefono, edad, password);

            // Eliminar la contraseña de la respuesta
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            res.status(201).json({ message: "Usuario registrado con éxito", user: userWithoutPassword });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const { token, user } = await UserService.login(username, password);

            // Eliminar la contraseña de la respuesta
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            res.status(200).json({ message: "Inicio de sesión exitoso", token, user: userWithoutPassword });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async validateUsername(req, res) {
        try {
            const { username } = req.params;
            const exists = await UserService.usernameExists(username);
            res.json({ exists });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}