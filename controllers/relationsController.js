const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');
const { sequelize } = require('../database/models');

module.exports = {

    createtRelation : (req,res) => {

        const {character, movie} = req.body;

        if(character == undefined || movie == undefined){
            return res.status(500).json({
                meta : {
                    status : 500,
                    msg : "Los campos character y movie no pueden ser nulos"
                }
            })
        }

        let movieR = db.Movies.findOne({where : { title : movie}});
        let characterR =  db.Characters.findOne({where : { name : character}});
 
        Promise.all([movieR,characterR])
        .then(([movieR,characterR]) => {
        
            if (!movieR) {
                return res.status(404).json({
                    meta : {
                        status : 404,
                        msg : `Error pelicula ${movie} no almacenado en la base de datos`
                    }
                })
            }
            else if(!characterR){
                return res.status(404).json({
                    meta : {
                        status : 404,
                        msg : `Error personaje ${character} no almacenado en la base de datos`
                    }
                })
            }

            db.Character_movie.create({
                characterid: characterR.id,
                movieid : movieR.id
            })
            .then(response => {
                return res.status(200).json({
                    data : response
                })
            })
            .catch(error => console.log(error))

        })
        .catch(error => console.log(error))

    },
    getRelations : (req,res) => {
        db.Character_movie.findAll({
            attributes : ["id", "characterid", "movieid"]
        })
        .then(response => {

            res.status(200).json({
                meta : {
                    status : 200,
                    msg : "ok"
                },
                data : response
            })
        })
        .catch(error => console.log(error))
    },
    editRelation : (req,res) => {

        
        const {character, movie} = req.body;

        let movieR = db.Movies.findOne({where : { title : movie}});
        let characterR =  db.Characters.findOne({where : { name : character}});
 
        Promise.all([movieR,characterR])
        .then(([movieR,characterR]) => {
        
            if (!movieR) {
                return res.status(404).json({
                    meta : {
                        status : 404,
                        msg : `Error pelicula ${movie} no almacenado en la base de datos`
                    }
                })
            }
            else if(!characterR){
                return res.status(404).json({
                    meta : {
                        status : 404,
                        msg : `Error personaje ${character} no almacenado en la base de datos`
                    }
                })
            }

            db.Character_movie.update({
                characterid: characterR.id,
                movieid : movieR.id
            },{
                where : {
                    id : req.params.id
                }
            })
            .then(response => {
                return res.status(200).json({
                    data : response
                })
            })
            .catch(error => console.log(error))
        })
    }

}