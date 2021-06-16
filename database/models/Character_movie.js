const characters = require("./Character");
const movies = require("./Movie");

module.exports = (sequelize,dataTypes) => {

    const alias = "Character_movie";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        characterid : {
            type : dataTypes.INTEGER,
            allowNull : false,
        
        },
        movieid : {
            type : dataTypes.INTEGER,
            allowNull : false,
         
        }

    }

    const config = {
        table : "character_movies",
        timestamps: false,
        
    }


    const Character_movie = sequelize.define(alias,cols,config);

    
    return Character_movie;
}