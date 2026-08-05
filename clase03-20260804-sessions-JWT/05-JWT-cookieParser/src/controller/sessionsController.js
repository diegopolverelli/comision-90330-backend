import jwt from "jsonwebtoken"
import { userModel } from "../models/userModel.js";
import { generaHash, validaPass } from "../utils/hash.js";
import { config } from "../config/config.js";

export class SessionsController{

    // register1(req, res){

    // }

    static async register(req,res){
        try {
            let {firstName, lastName, email, password}=req.body
            if(!firstName || !lastName || !email || !password){
    
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`Faltan datos requeridos`})
            }
    
            // resto validaciones pertinentes
            password=generaHash(password)
            let newUser=await userModel.create({firstName, lastName, email, password})
            res.setHeader('Content-Type','application/json')
            res.status(201).json({message: "Registro exitoso", newUser})
            
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`error interno: ${error.message}`})
        }
    }

    static async login(req,res){
        let {email, password}=req.body
        if(!email || !password){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`complete email y password`})
        }

        try {
            let user=await userModel.findOne({email}).lean()
            if(!user){
                res.setHeader('Content-Type','application/json');
                return res.status(401).json({error:`Credenciales invalidas`})
            }
            
            if(!validaPass(password, user.password)){
                res.setHeader('Content-Type','application/json');
                return res.status(401).json({error:`Credenciales invalidas`})
            }

            // req.session.user=user

            // user sin datos sensibles
            // objet js plano
            // dto
            let userToken={
                firstName: user.firstName, 
                id: user._id, 
                email: user.email
            }
            let token=jwt.sign(userToken, config.general.SECRET, {expiresIn:"1h"})
    
            res.cookie("cookietoken", token, {maxAge: 1000 * 60 * 60, httpOnly: true})
            res.setHeader('Content-Type','application/json');
            // return res.status(200).json({payload: "Login exitoso", user, token});
            return res.status(200).json({payload: "Login exitoso", user, });
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error: ${error.message}`})
        }
    }

    static async logout(req,res){
        res.clearCookie("cookietoken")
        
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso...!!!"});
    }
}

// SessionsController.register()
// const sessionsController=new SessionsController()
// sessionsController.register1()
