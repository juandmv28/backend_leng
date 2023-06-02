import Reserva from "../models/Reserva.js";
import Usuario from "../models/Usuario.js";

const obtenerReservas = async (req, res) => {
    try {
      const reservas = await Reserva.find().populate('creador');
  
      res.json(reservas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las reservas' });
    }
  };
  

const obtenerReserva = async (req, res) => {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);
    const error = new Error("Reserva no encontrada");
    return reserva ? res.status(200).json(reserva) : res.status(404).json({ "msg": error.message });
}

const crearReserva = async (req, res) => {
    const { id_usuario } = req.headers; 
    console.log('AAAAAAAAAAAAAAAA', id_usuario);
    const reserva = new Reserva(req.body);
    reserva.creador = await Usuario.findById(id_usuario);
    try {
        const reservaAlmacenada = await reserva.save();
        return res.json(reservaAlmacenada);
    } catch (error) {
        console.error(error);
        return res.json({ "msg": error })
    }
};

const borrarReserva = async (req, res) => {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);
    console.log(reserva);
    const error = new Error("No se encontró la reserva");
    if (!reserva) {
        return res.status(404).json({ "msg": error.message });
    }
    try {
        await reserva.deleteOne();
        return res.json({ "msg": "Reserva eliminada" });
    } catch (error) {
        return res.json({ "msg": error });
    }
};

const modificarReserva = async (req, res) => {
    const { id } = req.params;
    const reserva = await Reserva.findById(id);
    if (!reserva) {
        return res.status(404).json({ "msg": error.message });
    }

    reserva.teléfono = req.body.telefono || reserva.telefono;
    reserva.fecha = req.body.fecha || reserva.fecha;
    reserva.cliente = req.body.cliente || reserva.cliente;
    reserva.duracion = req.body.duracion || reserva.duracion;
    reserva.servicio = req.body.servicio || reserva.servicio;
    reserva.horaEntrada = req.body.horaEntrada || reserva.horaEntrada;

    try {
        const reservaAlmacenada = await reserva.save();
        res.json(reservaAlmacenada);
    } catch (error) {
        console.error(error);
    }
};

const obtenerReservaPorFechaYHora = async (fecha, hora) => {
    const reserva = await Reserva.findOne({ fecha, horaEntrada: hora });
    if (!reserva) {
        return null;
    }
    return reserva;
};

const obtenerReservasPorServicio = async (servicio) => {
    const reservas = await Reserva.find({ servicio });
    console.log(reservas);
    return reservas ? reservas : null;
}



export {
    obtenerReservas,
    crearReserva,
    obtenerReserva,
    borrarReserva,
    modificarReserva,
    obtenerReservaPorFechaYHora,
    obtenerReservasPorServicio
};