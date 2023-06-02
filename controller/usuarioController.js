import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { transporter } from "../helpers/data.js";
import { verifyEmailWithZeroBounce } from "../helpers/data.js";
import path from "path";

const registrar = async (req, res) => {
    const { email, nombre } = req.body;
    console.log(email, "XD");
    const existeUsuario = await Usuario.findOne({ email });
    console.log(existeUsuario);

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ msg: error.message });
    }

    try {
        // COMENTADO POR PLATA :´VV
        // const verificacionEmail = await verifyEmailWithZeroBounce(email);
        // if (verificacionEmail != null) {
        //     return res.json({ msg: verificacionEmail });
        // }
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        await usuario.save();
        const confirmUrl = `http://ec2-3-82-214-192.compute-1.amazonaws.com:3000/api/usuarios/confirmar/${usuario.token}`;
        
        const mailOptions = {
            from: process.env.EMAIL_ALQUILES,
            to: email,
            subject: 'Confirmación de cuenta',
            html: `<p>Hola ${nombre}!</p>
                   <p>Por favor, haz clic en el siguiente botón para confirmar tu cuenta:</p>
                   <a href="${confirmUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Confirmar cuenta</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo de confirmación:', error);
                res.status(500).json({ msg: 'Error al enviar el correo de confirmación' });
            } else {
                console.log('Correo de confirmación enviado:', info.response);
                res.json({ msg: 'Correo de confirmación enviado' });
            }
        });
        res.json({"msg": `Se ha enviado un correo a ${email} para confirmar`});
    } catch (error) {
        console.error(error);
    }
};

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    // comprobar user existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ "msg": error.message });
    }

    // comprobar si está confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(405).json({ "msg": error.message });
    }

    // comprobar password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            token: generarJWT(usuario._id),
            statusCode: 200,
        });
    } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ "msg": error.message });
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("Token no válido");
        return res.status(403).json({ "msg": error.message });
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        // const path = path.join(__dirname, 'templates/confirmado.html');
        res.send('<h1>Su usuario ha sido confiramdo sastisfactoriamente</h1>');
    } catch (error) {
        console.error(error);
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ "msg": error.message });
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: "Hemos enviado un email con las instrucciones" });
    } catch (error) {
        console.error(error);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });

    if (tokenValido) {
        res.json({ "msg": "Token válido y el usuario existe" });
    } else {
        const error = new Error("El token no es válido");
        return res.status(404).json({ "msg": error.message });
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if (usuario) {
        usuario.password = password;
        usuario.token = "";
        try {
            await usuario.save();
            res.json({ "msg": "Password modificado correctamente" });
        } catch (error) {
            console.error(error);
        }
    } else {
        const error = new Error("El usuario no existe");
        return res.status(404).json({ "msg": error.message });
    }
};

const perfil = (req, res) => {
    const { usuario } = req;

    res.json(usuario);
}

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil };