import __dirname, { generaHash } from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import { UsersDAO } from './dao/UsersDAO.js';

import { router as eventRouter } from './routes/eventsRouter.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { conectar } from './config/db.js';
import { config } from './config/config.js';
import { CategoryModel } from './dao/models/categoryModel.js';
import { EventDAO } from './dao/EventDAO.js';
import { title } from 'process';
import { errorHandler } from './utils/errorHandler.js';

// const PORT=3000;
const PORT=config.PORT;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("./public"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use("/api/events", eventRouter)
app.use('/', vistasRouter)

app.use(errorHandler)


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});


conectar(
    config.MONGO_URL, 
    config.DB_NAME
)
// .then(async()=>{
        
//     let userDAO=new UsersDAO()

//     let user01=await userDAO.getBy({email: "marcos@test.com"})
//     if(!user01){
//         let password=await generaHash("123")
//         user01=await userDAO.create(
//             {
//                 firstName:"Marcos",
//                 lastName:"Aguirre", 
//                 email: "marcos@test.com",
//                 password
//             }
//         )
//     }
//     console.log(user01)

//     // let category=await CategoryModel.create({description: "categoria 1"})

//     let eventsDAO=new EventDAO()
//     // let evento=await eventsDAO.create(
//     //     {
//     //         title: "Evento Prueba 01",
//     //         description: "Evento Prueba 01",
//     //         category: category._id,
//     //         date: Date.now(),
//     //         location: "zoom",
//     //         capacity: 100,
//     //         price: 0,
//     //         status: "draft",
//     //         organizer: user01._id
//     //     }
//     // )

//     let evento=await eventsDAO.getBy({title:"Evento Prueba 01"})
//     console.log(evento)

// });