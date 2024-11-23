const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Definir el esquema para Paciente
const PacienteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    id: {
        type: String, // Puedes cambiar a Number si el ID no es alfanumérico
        required: true,
        unique: true
    },
    gmail: {
        type: String,
        required: true
    },
    telefono: {
        type: String, // O puedes usar Number si no incluyes prefijos como "+"
        required: true
    },
    lugarDondeVive: {
        type: String,
        required: true
    }
});

// Crear el modelo basado en el esquema
const Paciente = mongoose.model('Paciente', PacienteSchema);

// Exportar el modelo
module.exports = Paciente;
