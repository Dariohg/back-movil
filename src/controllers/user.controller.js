import { UserService } from "../services/user.service.js";

export class UserController {
    static async register(req, res) {
        try {
            const { nombre, username, email, telefono, edad, password } = req.body;
            const user = await UserService.register(nombre, username, email, telefono, edad, password);
            res.status(201).json({ message: "Usuario registrado con éxito", user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const { token, user } = await UserService.login(username, password);
            res.status(200).json({ message: "Inicio de sesión exitoso", token, user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
