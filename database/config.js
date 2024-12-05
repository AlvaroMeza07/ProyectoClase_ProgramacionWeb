const mongoose = require('mongoose');


require('dotenv').config(); //cargando variales de entorno


// Función para la conexión a la base de datos


const dbConnection = async () => {
  try {
      await mongoose.connect(process.env.DB_CNN, {});
      console.log('Base de datos de CITAS Online!!!')
  } catch (error) {
      console.error('No se puede conectar a la BDD!!!', 
      error.message)
  }
}
module.exports = {
  dbConnection
}
