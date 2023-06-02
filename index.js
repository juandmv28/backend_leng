import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import inventarioRoute from "./routes/inventarioRoute.js";
import morgan from "morgan";
import cors from "cors";


const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use(morgan('dev'));

dotenv.config();

conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/inventario', inventarioRoute);
app.get('/', (req, res) => res.send('HOLA ALQUILES API!'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});

console.log(process.env.MONGO_URI);

