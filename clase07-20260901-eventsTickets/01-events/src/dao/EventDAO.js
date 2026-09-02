import { EventModel } from "./models/eventModel.js";


export class EventDAO{

    async get(filtro={}){
        return await EventModel.find(filtro).lean()
    }
    
    async getBy(filtro={}){
        return await EventModel.findOne(filtro).populate(["category", "organizer"]).lean()
    }

    async create(event){
        let newEvent=await EventModel.create(event)
        return newEvent.toJSON()
    }

    async update(id, event){
        // return await EventModel.updateOne({_id:id}, event)
        return await EventModel.findByIdAndUpdate(id, event, {new: true, runValidators: true}).lean()
    }

    async delete(id){
        return await EventModel.findByIdAndDelete(id).lean()
    }
}