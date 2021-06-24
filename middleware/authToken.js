const db = require("../database/models");
const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {

    const token = req.headers["token"];

    if(!token){
        return res.status(400).json({
            meta : {
                status : 400,
                msg : "Token no enviado"
            }
        })
    }
    try {
        const verifyToken = jwt.verify(token,"MySecret");
        db.Users.findByPk(verifyToken.id)
        .then(response => {
            if(!response){
                return res.status(404).json({
                    meta : {
                        status : 404,
                        msg : "Usuario no registrado"
                    }
                })
            }
        
            next()
        })
        .catch(error => console.log(error))
        
    } catch (error) {
        console.log(error)
        if(!error.expiredAt){
            return res.status(401).json({
                meta : {
                    status : 401,
                    msg : "Token invalido"
                }
            })
        }
        res.status(400).json({
            meta : {
                status : 401,
                msg : "Token expirado"
            }
        })
        
    }
    
}