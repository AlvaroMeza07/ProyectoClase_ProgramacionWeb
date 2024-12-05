const mongoose = require('mongoose');


require('dotenv').config(); //cargando variales de entorno


// Función para la conexión a la base de datos


const dbConnection = async () => {
    try {
      // Conexión a la base de datos de Médicos
      await mongoose.createConnection(process.env.DB_CNN_MEDICOS, {
      });
      console.log('Conexión a la base de datos "Medico" exitosa.');
  
      // Conexión a la base de datos de Pacientes
      await mongoose.createConnection(process.env.DB_CNN_CITA, {
      });
      console.log('Conexión a la base de datos "Pacientes" exitosa.');
    } catch (error) {
      console.error('Error al conectar a las bases de datos:', error);
      process.exit(1);
    }
  };

module.exports = {
    dbConnection,
};

