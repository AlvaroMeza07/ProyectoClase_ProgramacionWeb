const { Schema, model } = require('mongoose');

// Esquema para manejar los contadores
const CounterSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true // Nombre del contador (en este caso será 'numero_cita')
    },
    seq: {
        type: Number,
        default: 0 // Valor inicial
    }
});

module.exports = model('Counter', CounterSchema);
console.log('ARCHIVO MODEL DEL CONTADOR DE LA CITA CARGADO CORRECTAMENTE');

