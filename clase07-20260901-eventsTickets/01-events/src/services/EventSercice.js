// import { EventDAO } from "../dao/EventDAO.js"

import { CategoryModel } from "../dao/models/categoryModel.js";
import { GenerateError } from "../utils/GenerateError.js";


export class EventService{
    // * @param {EventDAO} dao 

    /**
     * 
     * @param {import("../dao/EventDAO.js").EventDAO} eventsDAO 
     * @param {import("../dao/UsersDAO.js").UsersDAO} usersDAO 
     */
    constructor(eventsDAO, usersDAO){
        this.eventsDAO=eventsDAO
        this.usersDAO=usersDAO
    }

    async get(){
        return await this.eventsDAO.get()
    }

    // async create(event){
    async create({category, title, description, price, capacity, date, location}){

        // let {category}=event
        category=await CategoryModel.findOne({description:category}).lean()
        console.log(category)

        if(!category){
            // res.setHeader('Content-Type','application/json');
            // return res.status(404).json({error:`Categoria inexistente`})
            GenerateError.notFoundError(`Categoria inexistente`)
        }

        if(!title || !description || !category || !date){
            // res.setHeader('Content-Type','application/json');
            // return res.status(400).json({error:`Faltan datos requeridos`})
            GenerateError.badRequestError(`Faltan datos requeridos`)
        }
        
        if (capacity <= 0) {  
            // return res.status(400).json({    status: 'error',    message: 'La capacidad debe ser mayor a cero'  })
            GenerateError.badRequestError('La capacidad debe ser mayor a cero')
        }

        let user01=await this.usersDAO.getBy({email: "marcos@test.com"})
        if(!user01){
            let password=await generaHash("123")
            user01=await userDAO.create(
                {
                    firstName:"Marcos",
                    lastName:"Aguirre", 
                    email: "marcos@test.com",
                    password
                }
            )
        }


        // validaciones de negocio
        return await this.eventsDAO.create(
            {category: category._id, title, description, price, capacity, date, organizer: user01._id, location}
        )
    }
}