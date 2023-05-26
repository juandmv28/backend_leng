import Usuario from "../models/Usuario.js";

const checkInventory = async (req, res, next) => {
    const { user_id } = req.headers;
    const usuario = await Usuario.findById(user_id);
    if (usuario) {
        if (usuario.rol == 'user') {
            return res.status(403).send('Acceso denegado');
        }
        return next();
    }
    return res.json({
        msg: "Usuario no existe"
    });
}


export default checkInventory;