import { Servicios } from "../helpers/data.js";

const checkService = (req, res, next) => {
    const { servicio } = req.body;

    if (!(Servicios.includes(servicio))) {
        const error = new Error("Servicio no válido");
        return res.status(401).json({"msg": error.message});
    }

    next();
};

export default checkService;