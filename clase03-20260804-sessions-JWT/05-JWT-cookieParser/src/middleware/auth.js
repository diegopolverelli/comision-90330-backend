import jwt from "jsonwebtoken"
import { config } from "../config/config.js";

export const auth=(req, res, next)=>{
    console.log(req.cookies)
    // if(!req.session.user){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(401).json({error:`No hay usuarios autenticados`})
    // }

    // if(!req.headers.authorization){
    if(!req.cookies.cookietoken){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    // BEARER TOKEN: BEARER eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJqdWFuIiwiaWQiOiI2YTY5MzljYjRjODA1ZDA4ODcxMTc1NTkiLCJlbWFpbCI6ImpwZXJlekB0ZXN0LmNvbSIsImlhdCI6MTc4NTg4NTk2OCwiZXhwIjoxNzg1ODg5NTY4fQ.JnOdFkWtGonMamFJ2xbdQ2eViozYZN-tGZW-C74--WY 
    // let token=req.headers.authorization.split(" ")[1]
    let token=req.cookies.cookietoken

    try {
        let payload=jwt.verify(token, config.general.SECRET)
        req.user=payload
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Error token: ${error.message}`})
    }


    // req.user=req.session.user

    next()
}