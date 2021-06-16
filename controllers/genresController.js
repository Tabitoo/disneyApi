const db = require("../database/models");
const {Op,Sequelize} = require('sequelize');
const { sequelize } = require('../database/models');

module.exports = {
    getGenres : (req,res) => {

    },

    getGenre : (req,res) => {

    }, 

    createtGenre : (req,res) => {

        const {name, image} = req.body

        db.Genres.create({
            name : name,
            image : image
        })
        .then(response => {
            return res.status(200).json({
                data : {
                    nombre : response.name,
                    imagen : response.image
                }
            })
        })
        .catch(error => console.log(error))

    },

    editGenre : (req,res) => {

    },

    deleteGenre : (req,res) => {
        
    }
}