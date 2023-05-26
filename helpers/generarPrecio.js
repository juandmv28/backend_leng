import { precioServicios } from "./data.js"

const generarPrecio = (servicio, duracion) => {
    for (let precioServicio in precioServicios) {
        if(servicio == precioServicio) {
            return duracion * precioServicios[precioServicio];
        }
        
    }

    return null;
}

export default generarPrecio;