const { response } = require("express");
const db = require("../database/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
    Register : (req,res) => {

        const {email,password} = req.body;

        async function createUser(correo,pass){
        
            let user = await db.Users.findOne({where : {email : correo}});
      
            if(user === null){
                return await db.Users.create({
                    email,
                    password : bcrypt.hashSync(pass,12)
                })
            }else {
                return 0
            }
        }

        if(email == undefined){
            return res.status(400).json({
                meta : {
                    status : 400,
                    msg : "El campo email no puede ser nulo"
                }
            })
        } 
        else if(password.length < 6 || password.length > 12 ){
            return res.status(500).json({
                meta : {
                    status : 500,
                    msg : "La contraseña tiene que ser mayor a 6 y menos a 12 caracteres"
                }
            })
        }
        else {
            createUser(email,password)
            .then(response => {

                if(response != 0){
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
                }
                res.status(400).json({
                    meta : {
                        status : 400,
                        msg : "Email ya registrado"
                    }
                })

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
    },
    login : (req,res) => {
        const {email, password} = req.body;

        db.Users.findOne({
            where : {
                email : email
            }
        })
        .then(user => {
            if(user != null){
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

