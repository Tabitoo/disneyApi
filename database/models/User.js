
module.exports = (sequelize,dataTypes) => {

    const alias = "Users";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        email : {
            type : dataTypes.STRING(100),
            allowNull : false,
            validate : {
                notEmpty : {
                    msg : "El campo Email no puede estar vacio"
                },
                isEmail : {
                    msg : "Formato invalido, debe ser un email"
                }
            }
        },
        password : {
            type : dataTypes.STRING(150),
            validate : {
                notEmpty : {
                    msg : "La contraseña no puede estar vacia"
                },
            }
        }
    }

    const config = {
        table : "users",
        timestamps : false
    }

    const User = sequelize.define(alias, cols, config);

    return User


}