const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');
const { sequelize } = require('../database/models');
const functions = require("./functions");


module.exports = {
    getGenres : (req,res) => {

        db.Genres.findAll()
        .then(response => {

            let genres = [];

            response.forEach(genre => {
                let body = {
                    id : genre.id,
                    name : genre.name,
                    image : genre.image
                }

                genres.push(body)
                
            });

            res.status(200).json({
                meta : {
                    status : 200,
                    msg : "ok"
                },
                data : genres
            })
        })
        .catch(error => console.log(error))

    },

    createtGenre : (req,res) => {

        const Body = req.body;

        if(Body.name == undefined){
            return res.status(400).json({
                meta : {
                    status : 400,
                    msg : "El campo name no puede ser nulo"
                }
            })
        }else{

            functions.genreCreate(Body)
            .then(response => {
                if(response != 0){
                    return res.status(200).json({
                        meta : {
                            status : 200,
                            msg : "Genero creado correctamente"
                        },
                        data : {
                            nombre : response.name,
                            imagen : response.image
                        }
                    })
                }else{
                    res.status(400).json({
                        meta : {
                            status : 400,
                            msg : "El nombre de ese genero ya se encuentra almacenado en la base de datos"
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

    editGenre : (req,res) => {
        const {name, image} = req.body;

        db.Genres.update({
            name,
            image
        },{
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            console.log(result)
            return res.status(200).json({
                status : {
                    msg : "Genero actualizado"
                },
            })
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
    deleteGenre : (req,res) => {

        db.Genres.destroy({
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
                msg : "Genero no encontrado"
            })
            
        })
        .catch(error => console.log(error))
        
    }
}