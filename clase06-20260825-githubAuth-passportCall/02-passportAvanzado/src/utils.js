import {fileURLToPath} from 'url';
import { dirname } from 'path';

import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;



export const passportCall=estrategia=>function (req, res, next) {
    passport.authenticate(estrategia, function (err, user, info, status) {
        if (err) { return next(err) }   // accion ante error: return done(error)
        if (!user) { 
            return res.status(400).json({
                message: info.message?info.message:info.toString()
            })
         }  // accion ante fallo al autenticar: return done(null, false)
        // res.redirect('/account');  
        req.user=user
        return next()
        // accion ante autenticacion exitosa: return done(null, userValido)
    })(req, res, next);
}