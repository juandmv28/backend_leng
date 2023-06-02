import mongoose from "mongoose";

const inventarioSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: false,
        trim: true,
    },
    servicio: {
        type: String,
        required: true,
        trim: true,
    },
    cantidad: {
        type: Number,
        required: true,
        trim: true,
    },
    precioUnitario: {
        type: Number,
        trim: true,
    },
}, {
    timestamps: true,
});

const Inventario = mongoose.model("Inventario", inventarioSchema);
export default Inventario;




