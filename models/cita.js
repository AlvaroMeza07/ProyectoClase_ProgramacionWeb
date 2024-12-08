const {Schema, model} = require('mongoose');
const Counter = require('./Counter');

const CitaSchema = Schema({    

    nombre: {
        type: String,
        required: true
    },
    id_paciente: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
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
        type: String,  // Hora de la cita 
        required: true
    },

    demerg: {
        type: String,
        default: null //SE COLOCA ASI PORQUE CUANDO AGREGEMOS UNA CITA NORMAL NO OCUPAMOS ESTE CAMPO SOLO EN EMERGENCIA
    },

    numero_cita: {
        type: Number,
        unique: true // Este sera un contador de citas sin que se repita la misma
    }
});


CitaSchema.pre('save', async function (next) {
    if (!this.isNew) return next(); // Solo se genera número de cita para documentos nuevos

    try {
        // Busca y actualiza el contador correspondiente
        const counter = await Counter.findOneAndUpdate(
            { name: 'numero_cita' },
            { $inc: { seq: 1 } }, // Incrementa el contador en 1
            { new: true, upsert: true } // Crea el documento si no existe
        );

        // Asigna el valor incrementado al campo numero_cita
        this.numero_cita = counter.seq;
        next();
    } catch (error) {
        next(error); // Propaga el error
    }
});


CitaSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();

    object.uid=_id;

    return object;

})


module.exports = model('Cita', CitaSchema);
console.log('ARCHIVO MODEL CARGADO CORRECTAMENTE');
