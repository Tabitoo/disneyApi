const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');
const { response } = require("express");
const functions = require("./functions");



module.exports = {
    getCharacters : (req,res) => {

        if(Object.keys(req.query).length === 0){

            db.Characters.findAll()
            .then(response => {

                let characters = [];

                response.forEach(character => {
                    let body = {
                        id : character.id,
                        name : character.name,
                        image : character.image
                    }

                    characters.push(body)
                    
                });

                res.status(200).json({
                    meta : {
                        status : 200,
                        msg : "ok"
                    },
                    data : characters
                })
            })
            .catch(error => d.log(error))

        } else{

            const body = req.query;


            functions.searchCharacter(body)
            .then(response => {
                
                if(response.length != 0 && response != 0){
                    return res.status(200).json({
                        meta : {
                            status : 200,
                            msg : "Ok"
                        },
                        data : response
                    })

                }
                res.status(404).json({
                    meta : {
                        status : 404,
                        msg: "No se encontraron resultados"
                    }
                }) 
                
            })
            .catch(error => console.log(error))  

        }
        
    },

    getCharacter : (req,res) => {
        db.Characters.findByPk(req.params.id,{
            include : [
                {
                  model: db.Movies,
                  as: "peliculas",
                  through: {
                    attributes: [],
                  }
                }
              ]
        })
        .then(response => {

            if(response != null){
                return res.status(200).json({
                    meta : {
                        status : 200,
                        msg : "ok"
                    },
                    data : response
                })
            }

            res.status(404).json({
                meta : {
                    status : 404,
                    msg: "Personaje no encontrado"
                }
            })  

        })
        .catch(error => console.log(error))

    },

    createCharacter : (req,res) => {

       const Body = req.body;

       if(Body.name == undefined){
           return res.status(400).json({
               meta : {
                   status : 400,
                   msg : "El campo name no puede ser nulo"
               }
           })
       }else{

            functions.createCharacter(Body)
            .then(result => {
                if(result != 0){
                    return res.status(200).json({
                        status : {
                            msg : "ok"
                        },
    
                        data : result
                    })
                }else{
                    res.status(400).json({
                        meta : {
                            status : 400,
                            msg : "El nombre de ese personaje ya se encuentra almacenado en la base de datos"
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
                let errores = [];
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

    editCharacter : (req,res) => {
   
        const {name, age, weight, history, image} = req.body;

        db.Characters.update({
            name,
            age,
            weight,
            history,
            image
        },{
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            console.log(result)
            if(result[0] == 1){
                return res.status(200).json({
                    meta : {
                        status : 200,
                        msg : "Personaje actualizado"
                    },
                    data : result
                })
            }else{
                res.status(200).json({
                    meta : {
                        status : 500,
                        msg : "Error al actualizar"
                    },
                    data : result
                })

            }
            
            
        })
        .catch(error => {
            console.log(error)
            let errores = [];
            error.errors.forEach(error => {

                errores.push(error.message) 

            });
            
            res.status(400).json({
                meta : {
                    status : 400,
                    errors : errores
                }
            })
        })

    },

    deleteCharacter : (req,res) => {
     
        db.Characters.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            console.log(result)
            if(result != 0){
                return res.status(200).json({
                    status : 200,
                    msg : "Elemento borrado correctamente"
                })
            }
            res.status(404).json({
                status : 404,
                msg : "Personaje no encontrado"
            })
            
        })
        .catch(error => console.log(error))
    }
}