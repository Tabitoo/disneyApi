const { response } = require("express");
const db = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    Register : (req,res) => {

        const {email,password} = req.body;

        if(password.length < 6 || password.length > 12 ){
            return res.status(500).json({
                meta : {
                    status : 500,
                    msg : "La contraseña tiene que ser mayor a 6 y menos a 12 caracteres"
                }
            })
        }


        db.Users.create({
            email,
            password : bcrypt.hashSync(password,12)
        })
        .then(response => {


            const token = jwt.sign({id : response.id}, "MySecret", {expiresIn : 60 * 60 * 24})


            if(response){
                return res.status(200).json({
                    meta : {
                        status : 200,
                        msg : "Usuario creado correctamente",
                        token : token
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
    },
    login : (req,res) => {
        const {email, password} = req.body;

        db.Users.findOne({
            where : {
                email : email
            }
        })
        .then(user => {
            console.log(user.password)
            if(!user == ""){
                if(bcrypt.compareSync(password,user.password)){
                    const token = jwt.sign({id : user.id}, "MySecret", {expiresIn : 60 * 60 * 24});

                    return res.status(200).json({
                        meta : {
                            status : 200,
                            msg : "Sesion iniciada",
                            token : token
                        }
                    })
                }else{
                    res.status(404).json({
                        meta : {
                            status : 404,
                            msg : "Usuario o contraseña incorrecta"
                        }
                    })
                }
            }else{
                res.status(404).json({
                    meta : {
                        status : 404,
                        msg : "usuario no registrado"
                    }
                })
            }
        })
        .catch(error => console.log(error))
    }
}

