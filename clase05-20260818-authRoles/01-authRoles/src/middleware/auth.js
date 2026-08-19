import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

export const auth= (req, res, next)=>{
    if(!req.cookies.cookietoken){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    let token=req.cookies.cookietoken
    try {
        let user=jwt.verify(token, config.SECRET)
        req.user=user
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Error al autenticar`, info: error.message})
    }


    next()
}