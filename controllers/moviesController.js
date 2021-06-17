const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');
const { sequelize } = require('../database/models');
const { json } = require("express");



module.exports = {
    getMovies : (req,res) => {

        if(Object.keys(req.query).length === 0){
            db.Movies.findAll()
            .then(response => {
    
                let movies = []; 
    
                response.forEach(movie => {
                    let body = {
                        title : movie.title,
                        image : movie.image,
                        date : movie.date
                    }
    
                    movies.push(body)
                    
                });
    
                res.status(200).json({
                    meta : {
                        status : 200,
                        msg : "ok"
                    },
                    data : movies
                })
            })
            .catch(error => console.log(error))

        } else{
            const {title,genre,order} = req.query;

            console.log(title)
            console.log(genre)
            console.log(order)

            async function pepe(){
                
                if(title != undefined){
                    return await db.Movies.findAll({
                        where : {
                            title : {
                                [Op.like] :  `%${req.query.title}%`
                            }, 
                        },
                        include : {
                            model : db.Genres,
                            as : "Generos"
                        }
                    })
                }
                else if(genre != undefined){
                    return await db.Movies.findAll({
                        include : {
                            model : db.Genres,
                            where : {
                                id : genre
                            },
                            as : "Generos"
                        }
                    })
                }
                else if(order != undefined){
                    return await db.Movies.findAll({
                        order : [
                            ['date', order]
                        ]
                    })
                }

            }

            pepe()
            .then(response => {
                    
                if(response.length != 0){
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
    getMovie : (req,res) => {
        db.Movies.findByPk(req.params.id,{
            include : [
                {
                  model: db.Characters,
                  as: "personajes",
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
                    msg: "Pelicula no encontrada"
                }
            })  

        })
        .catch(error => console.log(error))
    },

    CreateMovie : (req,res) => {
        
        const {title,date,ranking,image,genreid} = req.body;
        
        db.Movies.create({
            title,
            date,
            ranking,
            image,
            genreid

        })
        .then(response => {
            return res.status(200).json({
                meta : {
                    status : 200
                },
                data : response
            })
            
        })
        .catch(error => console.log(error))
    },

    editMovie : (req,res) => {

        const {title,date,ranking,image,genreid} = req.body;

        db.Characters.update({
            title,
            date,
            ranking,
            image,
            genreid
        },{
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            return res.status(200).json({
                status : {
                    msg : "ok"
                },

                data : result
            })
        })
        .catch(error => console.log(error))


    },
    deleteMovie : (req,res) => {
        db.Movies.delete({
            where : {
                id : req.params.id
            }
        })
        .then(result => {
            return res.status(200).json({
                status : 200,
                msg : "Elemento borrado correctamente"
            })
        })
        .catch(error => console.log(error))
        
    }
}