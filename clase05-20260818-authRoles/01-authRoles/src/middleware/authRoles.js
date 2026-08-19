export const rolesAuth=( ...permisos)=>{   // ... son aquí el operador REST
    return (req, res, next)=>{
        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")){
            return next()
        }

        if(!req.user){
            res.setHeader('Content-Type','application/json');
            return res.status(401).json({error:`No hay usuarios autenticados`})
        }

        // ["admin", "manager"]
        if(!permisos.includes(req.user.role.toLowerCase())){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
        }

        next()
    }
}