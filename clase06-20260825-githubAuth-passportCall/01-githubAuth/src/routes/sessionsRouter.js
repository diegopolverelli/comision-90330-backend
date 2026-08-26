import { Router } from 'express';
import passport from 'passport';
export const router=Router()

router.get("/error", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error al autenticar`})
})

// paso 3
router.get('/logingithub', passport.authenticate("github", {}))

router.get(
    '/callbackGithub', 
    passport.authenticate("github", {failureRedirect: "/api/sessions/error"}),
    (req, res)=>{

        // si authenticate sale OK, passport deja los datos del usuario autenticado en req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Login exitoso", user: req.user});
    }
)