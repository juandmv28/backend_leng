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

router.post("/crear", crearReserva);
router
    .route("/")
    .get(obtenerReservas);

router
    .route("/:id")
    .get(checkAuth, obtenerReserva)
    .delete(checkAuth, borrarReserva)
    .put(checkAuth, verificarDisponibilidad, modificarReserva)

export default router;