import passport from "passport"
import local from "passport-local"
import { usuariosModelo } from "../models/usuario.model.js"

import bcrypt from "bcrypt"


export const initPassport=()=>{
    passport.use("registro", new local.Strategy(
        {
            usernameField: "email", 
            passReqToCallback: true,
        }, 
        async(req, username, password, done)=>{
            try {
                console.log("1")
                let {nombre, apellido}=req. body
                if(!nombre || !apellido){
                    return done(null, false, {message: `Nombre y apellido son requeridos`})
                }

                let existe=await usuariosModelo.findOne({email: username})
                if(existe){
                    return done(null, false, {message: `El email ${username} ya esta registrado`})
                }

                // resto de validaciones pertinentes

                password=bcrypt.hashSync(password, 10)

                let newUser=await usuariosModelo.create({
                    nombre, apellido, email: username, password
                })

                return done(null, newUser)

            } catch (error) {
                return done(error)
            }
        }
    ))
}