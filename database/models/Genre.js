module.exports = (sequelize,dataTypes) => {

    const alias = "Genres";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true,
        },
        name : {
            type : dataTypes.STRING(150),
            allowNull : false
        },
        image : {
            type : dataTypes.STRING(100),
            allowNull : false
        }
    }

    const config = {
        table : "genres",
        timestamps: false
    }


    const Genre = sequelize.define(alias,cols,config);

    Genre.associate = (models) => {
        Genre.hasMany(models.Movies, {
            as : "Peliculas",
            foreignKey : "genreid"
        })
        
    }

    return Genre;
}