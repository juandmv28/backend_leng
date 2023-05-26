import mongoose from "mongoose";
import moment from "moment";

const reservaSchema = mongoose.Schema ({
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    fecha: {
        type: Date,
        set: function(v) {
            return moment(v, 'DD/MM/YYYY').toDate();
        },
        required: true,
        trim: true,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    servicio: {
        type: String,
        required: true,
        trim: true,
    },
    duracion: {
        type: Number, 
        required: true,
        trim: true,
    },
    horaEntrada: {
        type: String,
        trim: true,
    },
    precio: {
        type: Number,
        trim: true,
    },
}, {
    timestamps: true,
});

const Reserva = mongoose.model("Reserva", reservaSchema);
export default Reserva;




