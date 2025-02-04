import { LowSync } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

// Estructura predeterminada
const defaultData = { users: [], cars: [] };

// Crear un adaptador de base de datos
const adapter = new JSONFileSync('db.json');
const db = new LowSync(adapter, defaultData); // Pasar defaultData aquí

// Leer los datos desde db.json
db.read();

// Si no hay datos, establecer los datos predeterminados
if (!db.data || Object.keys(db.data).length === 0) {
    db.data = defaultData;
    db.write();
}

export default db;