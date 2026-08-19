import { Router } from 'express';
import passport from 'passport';
import jwt from "jsonwebtoken"
import { config } from '../config/config.js';
export const router = Router()

router.get("/error", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error al autenticar`})
})

router.post(
    '/register',
    // paso 3
    passport.authenticate("registro", {session: false, failureRedirect:"/api/sessions/error"}),
    (req, res) => {

        // si el authenticate sale bien, 
        // passport deja una property user en la req con los
        // datos del usuario
        let user = req.user

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message:"Registo exitoso", user })
    }
)


router.post('/login', passport.authenticate("login", {session: false, failureRedirect:"/api/sessions/error"}), (req, res) => {

    let user = req.user
    let userOK={
        email: user.email, 
        firstName: user.firstName, 
        role: user.role,
    }
    let token=jwt.sign(userOK, config.SECRET, {expiresIn:"1h"})

    res.cookie("cookietoken", token)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ message:"Login exitoso para "+req.user.firstName , user })
})