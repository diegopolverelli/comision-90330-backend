import { Router } from 'express';
import { auth } from '../middleware/auth.js';
export const router=Router()

router.get('/', auth, (req,res)=>{

    let message="Info router pruebas"

    res.setHeader('Content-Type','application/json')
    res.status(200).json({message, infoUserLogueado: req.user})
})