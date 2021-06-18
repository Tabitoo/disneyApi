module.exports = (sequelize,dataTypes) => {

    const alias = "Characters";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        name : {
            type : dataTypes.STRING(45),
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : "El campo nombre no puede estar vacio"
                },

            }
        },
        age : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : "El campo Edad no puede estar vacio"
                },
                isInt : {
                    msg : "Solo se aceptan digitos (field age)"
                }
            }
        },
        weight : {
            type : dataTypes.FLOAT,
            allowNull : true,
            validate : {
                notEmpty : {
                    msg : "El campo Peso no puede estar vacio"
                },
                isFloat : {
                    msg : "El numero debe tener decimal (field weight)"
                }
            }
        },
        history : {
            type : dataTypes.STRING(1000),
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : "El campo historia no puede estar vacio"
                },
                max : {
                    args : [1000],
                    msg : "El campo historia no puede superar los mil caracteres"
                }
            }
        },
        image : {
            type : dataTypes.STRING(100),
            allowNull : false
        }

    }

    const config = {
        table : "characters",
        timestamps: false
    }


    const Character = sequelize.define(alias,cols,config);

    
    Character.associate = (models) => {
        Character.belongsToMany(models.Movies,{
            through : "Character_movie",
            as : "peliculas",
            foreignkey : "characterid",
            otherKey : "movieid"
        })
    }

    return Character;
}