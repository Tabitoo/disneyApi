const { response } = require("express");
const db = require("../database/models");

module.exports = {
    Register : (req,res) => {


        const {email,password} = req.body;

        db.Users.create({
            email,
            password
        })
        .then(response => {
            if(response){
                return res.status(200).json({
                    meta : {
                        status : 200,
                        msg : "Usuario creado correctamente"
                    }
                })
            }
            
        })
        .catch(error => {
            console.log(error)
            let errores = []
            error.errors.forEach(error => {
                if(error.type === "notNull Violation"){
                    errores.push(`El campo ${error.path} no puede ser nulo`)
                }else{
                    errores.push(error.message)
                }
                
            });
            
            res.status(400).json({
                meta : {
                    status : 400,
                    errors : errores
                }
            })
        })


    }
}

