import { Router } from 'express';
import passport from 'passport';
import { passportCall } from '../utils.js';
export const router = Router()

router.post(
    '/register',
    // passport.authenticate("registro", { session: false }),
    passportCall("registro"),
    async (req, res) => {



        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({message:"Registro exitoso", user: req.user})
    }
)


// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }   // accion ante error: return done(error)
//         if (!user) { return res.redirect('/signin') }  // accion ante fallo al autenticar: return done(null, false)
//         res.redirect('/account');  // accion ante autenticacion exitosa: return done(null, userValido)
//     })(req, res, next);
// });