import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"
import { UsersDAO } from "../dao/UsersDAO.js"
import { createHash, validaHash } from "./utils.js"
import { config } from "./config.js"

const buscarToken=req=>{
    let token=null

    if(req.cookies.cookietoken){
        token=req.cookies.cookietoken
    }

    return token
}

let usersDAO=new UsersDAO()

export const initPassport=()=>{

    // paso 1
    passport.use("registro", new local.Strategy(
        {
            usernameField: "email", 
            // passwordField: "clave",
            passReqToCallback: true, 
        }, 
        async (req, username, password, done)=>{
            try {
                let {name:firstName, lastName, }=req.body
                if(!firstName || !lastName){
                    console.log("salio por falta de firstName o lastName")
                    // res.setHeader('Content-Type','application/json');
                    // return res.status(400).json({error:`firstName / lastName son requeridos`})

                    return done(null, false)
                }
                
                // resto validaciones pertinentes
                let existe=await usersDAO.getBy({email: username})
                if(existe){
                    console.log("salio por user repetido...!!!")
                    return done(null, false)
                }

                password=createHash(password)

                let user=await usersDAO.create({
                    firstName, 
                    lastName, 
                    email: username,
                    password
                })

                return done(null, user)
            } catch (error) {
                return done(error) // done(error, user)
            }
        }
    ))

    passport.use("login", new local.Strategy(
        {
            usernameField: "email",
        }, 
        async(username, password, done)=>{
            try {
                let user = await usersDAO.getBy({email: username})
                if(!user){
                    console.log("no existe usuario")
                    return done(null, false)
                }

                if(!validaHash(password, user.password)){
                    console.log("password incorrecta")
                    return done(null, false)                    
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: config.SECRET, 
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        }, 
        async (payload, done)=>{
            try {
                return done(null, payload)
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1'    // solo si usamos express-sessions
    // passport.serializeUser()
    // passport.deserializeUser()
}