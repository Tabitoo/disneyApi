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
                        id : movie.id,
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

            let formatMovies = (result) => {
                
                let characters = [];

                result.forEach(character => {
                    let body = {
                        id : character.id,
                        title : character.title,
                        image : character.image
                    }

                    characters.push(body)
                })

                return characters
            }


            async function SearchMovies(){
                
                if(title != undefined){
                    let result =  await db.Movies.findAll({
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

                    return formatMovies(result)
                }
                else if(genre != undefined){
                    let result =  await db.Movies.findAll({
                        include : {
                            model : db.Genres,
                            where : {
                                id : genre
                            },
                            as : "Generos"
                        }
                    })

                    return formatMovies(result)
                }
                else if(order != undefined){
                    let result = await db.Movies.findAll({
                        order : [
                            ['date', order]
                        ]
                    })

                    return formatMovies(result)
                }

            }

            SearchMovies()
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

        const Body = req.body;

        async function movieCreate(movie){
            let checkMovie = await db.Movies.findOne({where : {title : movie.title}})
 
            if(checkMovie === null){
                return await db.Movies.create({
                     title : movie.title,
                     date : movie.date,
                     ranking : movie.ranking,
                     image : movie.image,
                     genreid : movie.genreid
             })
            }else {
                return 0
            }
 
        }
 
        if(Body.title == undefined){
            return res.status(400).json({
                meta : {
                    status : 400,
                    msg : "El campo title no puede ser nulo"
                }
            })
        }else{
 
             movieCreate(Body)
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
                meta : {
                    status : 200,
                    msg : "pelicula actualizada"
                },
                data : result
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
    deleteMovie : (req,res) => {
        
        db.Movies.destroy({
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
                msg : "Pelicula no encontrada"
            })
            
        })
        .catch(error => console.log(error))
        
    }
}