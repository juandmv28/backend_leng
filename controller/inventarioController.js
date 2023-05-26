import Inventario from "../models/Inventario.js"

const obtenerInventarioPorServicio = async (req, res) => {
    const { servicio } = req.params;
    try {
        const inventario = await Inventario.find({ servicio });
        res.json(inventario);
    } catch (error) {
        console.log(error);
    }
}

const obtenerProducto = async (req, res) => {
    console.log('SÍ ENTRAAAAAAAAAAAA');
    const { id } = req.params;
    const producto = await Inventario.findById(id);
    const error = new Error('producto no encontrado');
    if (!producto) {
        return res.status(404).json({ msg: error.message });
    }
    res.status(200).json(producto);
}

const crearProducto = async (req, res) => {
    console.log('SÍ ENTRA');
    const producto = new Inventario(req.body);
    try {
        const inventarioAlmacenado = await producto.save();
        return res.json(inventarioAlmacenado);
    } catch (error) {
        console.error(error);
        return res.json({ "msg": error })
    }
}

const borrarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Inventario.findById(id);
    const error = new Error("No se encontró el producto");
    if (!producto) {
        return res.status(404).json({ "msg": error.message });
    }
    try {
        await reserva.deleteOne();
        return res.json({ "msg": "Producto eliminado" });
    } catch (error) {
        return res.json({ "msg": error });
    }
}

const editarProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Inventario.findById(id);
    const error = new Error("No se encontró el producto");
    if (!producto) {
        return res.status(404).json({ "msg": error.message });
    }
    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.servicio = req.body.servicio || producto.servicio;
    producto.cantidad = req.body.cantidad || producto.cantidad;
    producto.servicio = req.body.servicio || producto.servicio;
    producto.precioUnitario = req.body.precioUnitario || producto.precioUnitario;

    try {
        const productoAlmacenado = await producto.save();
        res.json(productoAlmacenado);
    } catch (error) {
        console.error(error);
    }
}

export {
    obtenerInventarioPorServicio,
    crearProducto,
    borrarProducto,
    obtenerProducto,
    editarProducto
}