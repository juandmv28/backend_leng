import express from "express";
import {
    obtenerInventarioPorServicio,
    crearProducto,
    borrarProducto,
    obtenerProducto,
    editarProducto
} from "../controller/inventarioController.js";
import checkInventory from "../middleware/checkinventory.js";

const router = express.Router();

router
    .route('/:id')
    .get(checkInventory, obtenerProducto)
    .delete(checkInventory, borrarProducto)
    .put(checkInventory, editarProducto);
router
    .get('/:servicio', checkInventory, obtenerInventarioPorServicio);
router
    .post("/", checkInventory, crearProducto);    

export default router;