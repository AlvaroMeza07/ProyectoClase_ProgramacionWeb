//Importaciones

const mongoose = require('mongoose');

//Creacion de la funcion para la conexion 
const dbConnection = async () => {
        try {
            await mongoose.connect(process.env.DB_CNN, {});
            console.log('BASE DE DATOS ONLINE!!!')
        } catch (error) {
            console.error('NO SE PUEDE CONECTAR A LA BDD!!!', 
            error.message)
        }
    }
    module.exports = {
        dbConnection
    }
