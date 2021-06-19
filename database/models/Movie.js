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
                notEmpty : {
                    msg : "El campo title no puede estar vacio"
                },

            }
        },
        date : {
            type : dataTypes.DATE,
            allowNull : false,
            validate : {
                isDate : {
                    msg : "Formato de fecha invalido"
                },
                notEmpty : {
                    msg : "El campo date no puede estar vacio"
                }
            }
        },
        ranking : {
            type : dataTypes.FLOAT,
            allowNull : true,
            validate : {
                notEmpty : {
                    msg : "El campo ranking no puede estar vacio"
                }
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
                notEmpty : {
                    msg : "El campo genreid no puede estar vacio"
                },
                isInt : {
                    msg : "solo se aceptan digitos (field genreid)"
                }
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