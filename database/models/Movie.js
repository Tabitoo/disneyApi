module.exports = (sequelize,dataTypes) => {

    const alias = "Movies";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        title : {
            type : dataTypes.STRING(150),
            allowNull : false,
            validate : {
                notEmpty : true,

            }
        },
        date : {
            type : dataTypes.DATE,
            allowNull : false,
            validate : {
                isDate : true,
                notEmpty : true
            }
        },
        ranking : {
            type : dataTypes.FLOAT,
            allowNull : true,
            validate : {
                notEmpty : true
            }
        },
        image : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        genreid : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true,
                isInt : true
            } 
        }

    }

    const config = {
        table : "movies",
        timestamps: false
    }


    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = (models) => {
        
        Movie.belongsTo(models.Genres, {
            as : "Generos",
            foreignKey: "genreid"
        })

        Movie.belongsToMany(models.Characters,{
            as : "personajes",
            through : "Character_movie",
            foreignkey : "movieid",
            otherKey : "characterid"
        })
    }

    return Movie;
}