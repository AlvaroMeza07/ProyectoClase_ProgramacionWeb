var express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

var app = express();

// Configuración del CORS
app.use(cors());

// Lectura y Parseo del Body
app.use(express.json());

// Conectar a la base de datos
dbConnection();

// Usar las rutas de los libros desde el archivo paciente.js
app.use('/api/cita', require('./routes/cita')); // Ruta para los pacientes

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server Puerto 3000:\x1b[32m%s\x1b[0m', 'Online')
});
