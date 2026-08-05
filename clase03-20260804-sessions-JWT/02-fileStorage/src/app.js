import express from 'express';
import sessions from "express-session"
import FileStore from "session-file-store"
import { connDB } from './config/database.js';
import { config } from './config/config.js';
import { router as sessionsRouter } from './routes/sessions.Router.js';
import { router as testRouter } from './routes/pruebasRouter.js';
const PORT=config.general.PORT;

const app=express();

const fileStore=FileStore(sessions)

// console.log(process.env.JAVA_HOME)

app.use(express.static("./public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessions({
    secret: config.general.SECRET, 
    resave: false, 
    saveUninitialized: false,
    store: new fileStore({
        path: "./src/sessions", 
        ttl: 60*60, 
        retries: 0
    })
}))

app.use("/api/sessions", sessionsRouter)
app.use("/api/pruebas", testRouter)

app.get('/',(req,res)=>{
    

    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

connDB(
    config.database.MONGO_URL, 
    config.database.DB_NAME
)