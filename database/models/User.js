
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
            type : dataTypes.STRING(45),
            validate : {
                notEmpty : {
                    msg : "La contraseña no puede estar vacia"
                },
                len : {
                    args : [6,12],
                    msg : "La contraseña debe tener como minimo 6 y maximo 12 caracteres"
                }
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