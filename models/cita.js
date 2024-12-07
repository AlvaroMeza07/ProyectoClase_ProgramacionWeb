const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para Cita
const CitaSchema = new Schema({
    nombre_completo: {
        type: String,
        required: true
    },
    id_paciente: {
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo Paciente
        ref: 'Paciente',
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,  // Especialidad de la cita
        required: true
    },
    fecha_cita: {
        type: Date,  // Fecha de la cita
        required: true
    },

    hora_cita: {
        type: String,  // Hora de la cita (puedes usar tipo Date o String, dependiendo de cómo gestionas la hora)
        required: true
    }
}, {
    timestamps: true // Agrega automáticamente campos createdAt y updatedAt
});

// Crear el modelo basado en el esquema
const Cita = mongoose.model('Cita', CitaSchema);

// Exportar el modelo
module.exports = Cita;
