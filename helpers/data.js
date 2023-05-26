import nodemailer from "nodemailer";
import axios from "axios";

const Servicios = ["Billar", "Tejo", "Sintetica"];

// not a good practice, but enough for this project
// PRECIO POR HORA
const precioServicios = {
    Billar: 20000,
    Tejo: 15000,
    Sintetica: 50000,
}

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Configura a "true" si utilizas SSL/TLS
    auth: {
        user: 'donalquilesa123@gmail.com',
        pass: 'ciinakresgyavqgs'
    }
});

const verifyEmailWithZeroBounce = async (email) => {
    const apiKey = process.env.API_ZERO_BOUNCE;
    const apiUrl = 'https://api.zerobounce.net/v2/';

    const url = `${apiUrl}validate?api_key=${apiKey}&email=${encodeURIComponent(email)}`;

    try {
        const response = await axios.get(url);

        // Verifica el estado de la respuesta
        if (response.status === 200) {
            const { status } = response.data;

            // El correo electrónico fue verificado exitosamente
            if (status === 'Valid') {
                return null;
            } else {
                return 'El correo electrónico no es válido.';
            }
        } else {
            return 'Error al verificar el correo electrónico.';
        }
    } catch (error) {
        return 'Error al realizar la solicitud:', error.message;
    }
};


export { Servicios, precioServicios, transporter, verifyEmailWithZeroBounce };