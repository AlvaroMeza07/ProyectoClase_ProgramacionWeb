const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MedicosSchema = new Schema({
    nombredoc: {
        type: String,
        required: true
    },
    id_doc: {
        type: String,
        required: true,
        unique: true
    },
    especialidad: {
        type: String,
        required: true
    },
    telefono: {
        type: String, 
        required: true
    },
    clinica: {
        type: String,
        required: true
    }
});


const Medico = mongoose.model('Medico', MedicosSchema);

module.exports = Medico;
