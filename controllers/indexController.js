

module.exports = {
    Index : (req,res) => {

        res.status(200).json({
            meta : {
                status : 200
            },
            data : {
                message : "Servidor funcionando correctamente"
            }
        }) 

    },

    userRegister : (req,res) => {

    },

    userLogin : (req,res) => {

    }
    
}
