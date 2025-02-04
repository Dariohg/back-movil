export class Car {
    constructor(
        id,
        idUsuario,
        nombre,
        modelo,
        color,
        anioFabricacion,
        estado,
        imagenes = []
    ) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.modelo = modelo;
        this.color = color;
        this.anioFabricacion = anioFabricacion;
        this.estado = estado;
        this.imagenes = imagenes; // Array de rutas de imágenes
    }
}