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
                notEmpty : true,

            }
        },
        age : {
            type : dataTypes.INTEGER,
            allowNull : false,
            validate : {
                notEmpty : true,
                isInt : true
            }
        },
        weight : {
            type : dataTypes.FLOAT,
            allowNull : true,
            validate : {
                notEmpty : true,
            }
        },
        history : {
            type : dataTypes.STRING(1000),
            allowNull : false,
            validate : {
                notEmpty : true,
                max : 1000
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