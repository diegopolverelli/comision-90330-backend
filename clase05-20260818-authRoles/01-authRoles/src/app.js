import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from "cookie-parser"
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { conectar } from './config/db.js';
import { config } from './config/config.js';
import { auth } from './middleware/auth.js';
import { rolesAuth } from './middleware/authRoles.js';

// const PORT=3000;
const PORT = config.PORT;

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// paso 2
app.use(passport.initialize())
// app.use(passport.session()) // solo si usamos express-sessions
initPassport()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use("/api/sessions", sessionsRouter)
app.use('/', vistasRouter)

// app.get("/datosuser", auth, (req, res)=>{
app.get(
    "/datosuser",
    passport.authenticate("current", { session: false, failureRedirect: "/api/sessions/error" }),
    rolesAuth("user", "admin"),
    (req, res) => {

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: "datos user" });
    }
)



// app.get("/datosadmin", auth, (req, res)=>{
app.get(
    "/datosadmin",
    passport.authenticate("current", { session: false, failureRedirect: "/api/sessions/error" }),
    rolesAuth("admin"),
    (req, res) => {

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: "datos admin" });
    }
)

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});


// process.loadEnvFile("./.env")

// conectar(
//     process.env.MONGO_URL, 
//     process.env.DB_NAME
// );

conectar(
    config.MONGO_URL,
    config.DB_NAME
);
