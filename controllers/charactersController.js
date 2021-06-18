const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');


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

            console.log(name)
            console.log(age)
            console.log(movies)

            async function pepe(){
                
                if(name != undefined){
                    return await db.Characters.findAll({
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
                }
                else if(age != undefined){
                    return await db.Characters.findAll({
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
                }
                else if(movies != undefined){
                    return await db.Characters.findAll({
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
                }
            }

            pepe()
            .then(response => {
                console.log(response.length) 
                if( response.length != 0){
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

       const {name, age, weight, history, image} = req.body;

       console.log(age);
       console.log(typeof(age))

        db.Characters.create({
            name,
            age : Number(age),
            weight,
            history,
            image
        })
        .then(result => {
            return res.status(200).json({
                status : {
                    msg : "ok"
                },

                data : result
            })
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