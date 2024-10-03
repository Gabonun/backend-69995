export function onlyAdmin(req, res, next) {
    if(req.user.role === "admin") {
        next(); 
    } else {
        res.status(403).send("No tienes acceso administrativo"); 
    }
}

export function onlyUser(req, res, next) {
    if(req.user.role === "user") {
        next(); 
    } else {
        res.status(403).send("No tienes acceso a la tienda");
    }
}