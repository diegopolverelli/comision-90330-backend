// import { CategoryModel } from "../dao/models/categoryModel.js"
// import { UsersDAO } from "../dao/UsersDAO.js"

export class EventController{


    /**
     * 
     * @param {import("../services/EventSercice.js").EventService} eventService 
     */
    constructor(eventService){
        this.eventService=eventService
    }

    getEventos=async(req,res)=>{

        try {
            
            let eventos=await this.eventService.get()
    
            res.setHeader('Content-Type','application/json')
            res.status(200).json({eventos})
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`internal server error`})
        }
    }

    createEvent=async(req, res, next)=>{
        let {
            title,
            description,
            category,
            date,
            location,
            capacity,
            price,
        }=req.body



        try {
            
            let newEvent=await this.eventService.create({
                title,
                description,
                category,
                date,
                location,
                capacity,
                price,          
                // organizer: user01._id      
            })
    
            res.setHeader('Content-Type','application/json');
            return res.status(201).json({payload: newEvent});
        } catch (error) {
            // console.log(error)
            // res.setHeader('Content-Type','application/json');
            // return res.status(500).json({error:`internal server error`})
            next(error)
        }
    }


}