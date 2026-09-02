import { userModel as usuariosModelo } from "./models/userModel.js"

export class UsersDAO{

    async create(usuario){
        let nuevoUsuario=await usuariosModelo.create(usuario)
        return nuevoUsuario.toJSON()
    }

    async getBy(filtro){
        return await usuariosModelo.findOne(filtro).lean()
    }
    
    async delete(id){
        await usuariosModelo.findByIdAndDelete(id)
    }
    
}