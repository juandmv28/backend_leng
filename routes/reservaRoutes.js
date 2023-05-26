import express from "express";
import { 
    obtenerReservas,
    crearReserva, 
    obtenerReserva,
    borrarReserva,
    modificarReserva,
} from "../controller/reservaController.js";
import checkAuth from "../middleware/checkAuth.js";
import verificarDisponibilidad from "../middleware/verificarDisponibilidad.js";


const router = express.Router();

router
    .route("/")
    .post(checkAuth, verificarDisponibilidad, crearReserva)
    .get(checkAuth, obtenerReservas);

router
    .route("/:id")
    .get(checkAuth, obtenerReserva)
    .delete(checkAuth, borrarReserva)
    .put(checkAuth, verificarDisponibilidad, modificarReserva)

export default router;