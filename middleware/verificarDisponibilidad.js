import { obtenerReservasPorServicio } from "../controller/reservaController.js";
import moment from "moment";
import Reserva from "../models/Reserva.js";

const validarReserva = async (req, res, next) => {
    let { servicio, fecha, horaEntrada, duracion } = req.body;
    const { id } = req.params;

    console.log('horaEntrada', horaEntrada);
    console.log('fecha entrada', fecha);
    console.log('servicio', servicio);
    console.log('duracion', duracion);

    if (!servicio) {
        const query = await Reserva.findById(id);
        if (!query) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        servicio = query.servicio;
    }

    if (!fecha) {
        const query = await Reserva.findById(id);
        if (!query) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        const fechaFormat1 = moment(query.fecha).format("DD/MM/YYYY");
        fecha = fechaFormat1;
    }

    if (!horaEntrada) {
        const query = await Reserva.findById(id);
        if (!query) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        horaEntrada = query.horaEntrada;
    }

    if (!duracion) {
        const query = await Reserva.findById(id);
        if (!query) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        duracion = query.duracion;
    }

    // Obtener todas las reservas existentes que se superponen en fecha y hora con la nueva reserva.
    const reservas = await obtenerReservasPorServicio(servicio);
    console.log(reservas);
    const fechaHoraReservas = [];

    reservas.forEach((reserva) => {
        const fechaFormat = moment(reserva.fecha).format("DD/MM/YYYY");
        const fechaHora = moment(`${fechaFormat} ${reserva.horaEntrada}`, "DD/MM/YYYY hh:mm A");
        const fechaHoraFin = moment(fechaHora).add(reserva.duracion, "hours");

        fechaHoraReservas.push({ fechaHora, fechaHoraFin });
    });

    // Comparar las fechas y horas de la nueva reserva con las reservas existentes para determinar si hay una superposición.
    const fechaHoraNuevaReserva = moment(`${fecha} ${horaEntrada}`, "DD/MM/YYYY hh:mm a");
    const fechaHoraFinNuevaReserva = moment(fechaHoraNuevaReserva).add(duracion, "hours");

    for (let i = 0; i < fechaHoraReservas.length; i++) {
        const fechaHoraReserva = fechaHoraReservas[i];
        const superposicion =
            fechaHoraNuevaReserva.isBetween(fechaHoraReserva.fechaHora, fechaHoraReserva.fechaHoraFin, undefined, "[)") ||
            fechaHoraFinNuevaReserva.isBetween(fechaHoraReserva.fechaHora, fechaHoraReserva.fechaHoraFin, undefined, "(]") ||
            fechaHoraReserva.fechaHora.isBetween(fechaHoraNuevaReserva, fechaHoraFinNuevaReserva, undefined, "[)") ||
            fechaHoraReserva.fechaHoraFin.isBetween(fechaHoraNuevaReserva, fechaHoraFinNuevaReserva, undefined, "(]");

        console.log(superposicion);

        if (superposicion) {
            return res.json({ valido: false, mensaje: "La reserva se superpone con otra reserva existente." });
        }
    }
    next();
};

export default validarReserva;

