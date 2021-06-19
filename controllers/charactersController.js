const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');
const { response } = require("express");



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

            const {name,age,movies} = req.query;

            let format = (result) => {
                
                let characters = [];

                result.forEach(character => {
                    let body = {
                        id : character.id,
                        name : character.name,
                        image : character.image
                    }

                    characters.push(body)
                })

                return characters
            }

       

            async function search(){
                
                if(name != undefined){
                    let result =  await db.Characters.findAll({
                        where : {
                            name : {
                                [Op.like] :  `%${req.query.name}%`
                            }, 
                        },
                        include : {
                            model : db.Movies,
                            through : {
                                attributes : []
                            },
                            as : "peliculas"
                        }
                    })

                    return format(result)
                }
                else if(age != undefined){
                    let result = await db.Characters.findAll({
                        where : {
                            age : Number(age) 
                        },
                        include : {
                            model : db.Movies,
                            through : {
                                attributes : []
                            },
                            as : "peliculas"
                        }
                    })

                    return format(result)
                }
                else if(movies != undefined){
                    let result = await db.Characters.findAll({
                        include : {
                            model : db.Movies,
                            through : {
                                attributes : []
                            },
                            as : "peliculas",
                            where : {
                                id : movies
                            }
                        }
                    })

                    return format(result)

                }else{
                    return 0
                }
            }

            search()
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

       async function create(character){
           let checkCharacter = await db.Characters.findOne({where : {name : character.name}})

           if(checkCharacter === null){
               return await db.Characters.create({
                    name : character.name,
                    age : Number(character.age),
                    weight : character.weight,
                    history : character.history,
                    image : character.image
            })
           }else {
               return 0
           }

       }

       if(Body.name == undefined){
           return res.status(400).json({
               meta : {
                   status : 400,
                   msg : "El campo name no puede ser nulo"
               }
           })
       }else{

            create(Body)
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
            return res.status(200).json({
                meta : {
                    status : 200,
                    msg : "Personaje actualizado"
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