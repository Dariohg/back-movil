import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

// Estructura predeterminada
const defaultData = { users: [], cars: [] };

// Crear un adaptador de base de datos
const adapter = new JSONFileSync("db.json");
const db = new LowSync(adapter);

// Leer los datos desde db.json
db.read();

// Si no hay datos, establecer los datos predeterminados
if (!db.data) {
    db.data = defaultData; // Asignar datos predeterminados
    db.write(); // Guardar los datos predeterminados en db.json
}

export default db;
