// Callback URL: http://localhost:3000/api/sessions/callbackGithub
// Client ID: Iv23ctMwdOhmShmvE0Cf
// Client Secret: d28a11dbebd5c0ce415c1dbd768552ee87817775

import passport from "passport"
import github from "passport-github2"
import { usuariosModelo } from "../models/usuario.model.js"

export const initPassport=()=>{

    // paso 1
    passport.use("github", new github.Strategy(
        {
            clientID:"Iv23ctMwdOhmShmvE0Cf", 
            clientSecret: "d28a11dbebd5c0ce415c1dbd768552ee87817775", 
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub",
        }, 
        async(t1, t2, profile, done)=>{
            try {
                // done(null, false)  // fallo de autenticacion
                // done(null, user)   // ser autenticaro OK

                // console.log(profile)
                // return done(null, {_id:1, name:"Juan"})
                if(!profile._json.email){
                    return done(null, false)
                }

                let user=await usuariosModelo.findOne({email: profile._json.email})
                if(!user){
                    user=await usuariosModelo.create({
                        nombre: profile._json.name, 
                        email: profile._json.email, 
                        profile
                    })
                }else{
                    user=await usuariosModelo.findByIdAndUpdate(user._id, {
                        // nombre: profile._json.name, 
                        // email: profile._json.email, 
                        profile                        
                    })
                }

                return done(null, user)
                
            } catch (error) {
                return done(error)  // ocurrio un error
            }
        }
    ))

    // paso 1 ' solo si uso express-sessions
    passport.serializeUser((user, done)=>{
        return done(null, user._id)
    })

    passport.deserializeUser(async(id, done)=>{
        // let user={id, name:"Juan"}   // findOne a collection
        console.log(id)
        let user=await usuariosModelo.findOne({_id: id})
        return done(user)
    })

}