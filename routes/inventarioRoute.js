import express from "express";
import {
    obtenerInventarioPorServicio,
    crearProducto,
    borrarProducto,
    obtenerProducto,
    editarProducto,
    obtenerProductos
} from "../controller/inventarioController.js";
// import checkInventory from "../middleware/checkinventory.js";

const router = express.Router();

router.get("/", obtenerProductos);
router
    .route('/:id')
    .get(obtenerProducto)
    .delete(borrarProducto)
    .put( editarProducto);
router
    .get('/servicios/:servicio', obtenerInventarioPorServicio);
router
    .post("/",crearProducto);    

export default router;