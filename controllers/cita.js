const {response} = require('express');
const {validationResult} = require('express-validator');
const Cita = require('../models/cita');


//GET CITA (VAMOS A MOSTRAR LAS CITAS REGISTRADAS)
const getCitas = async (req, res) => {
    try {
        // Obtén las citas de la base de datos
        const citas = await Cita.find({}, 'nombre id_paciente telefono especialidad fecha_cita hora_cita demerg numero_cita');
        
        // Devuelve las citas en la respuesta
        res.status(200).json({
            ok: true,
            msj: 'PETICIÓN REALIZADA CORRECTAMENTE',
            citas
        });
    } catch (error) {
        console.error("Error al obtener las citas:", error.message);

        // Manejo de errores
        res.status(500).json({
            ok: false,
            msj: 'ERROR INESPERADO AL OBTENER LAS CITAS',
            error: error.message
        });
    }
};

//POST CITA (AQUI ES DONDE VAMOS A REGISTRAR LAS CITAS)
const crearCita = async (req, res) => {
    try {
        const { id_paciente, nombre, telefono, especialidad, fecha_cita, hora_cita, demerg } = req.body;

        // Aquí iría la lógica para guardar en la base de datos
        const nuevaCita = new Cita({
            id_paciente,
            nombre,
            telefono,
            especialidad,
            fecha_cita,
            hora_cita,
            demerg: demerg || null
        });

        await nuevaCita.save(); // Asegúrate de que tu modelo esté correctamente configurado

        res.status(201).json({
            ok: true,
            msg: "Cita creada correctamente",
            cita: nuevaCita
        });
    } catch (error) {
        console.error("Error al guardar la cita:", error);
        res.status(500).json({
            ok: false,
            msg: "ERROR INESPERADO AL GUARDAR"
        });
    }
};


//PUT DE ACTUALIZAR LA CITA MEDIANTE LA BUSQUEDA DEL NUMERO DE CITA
const actualizarCita = async (req, res) => {
    try {
        const { numero_cita } = req.params; // Obtenemos el número de cita desde los parámetros
        const { telefono, especialidad, fecha_cita, hora_cita, demerg } = req.body; // Obtenemos los campos que se van a actualizar

        // Validamos que el número de cita exista
        const citaExistente = await Cita.findOne({ numero_cita });
        if (!citaExistente) {
            return res.status(404).json({
                ok: false,
                msg: `NO SE ENCONTRO CITA CON NUMERO: ${numero_cita}`
            });
        }

        // Actualizamos solo los campos permitidos
        citaExistente.telefono = telefono || citaExistente.telefono;
        citaExistente.especialidad = especialidad || citaExistente.especialidad;
        citaExistente.fecha_cita = fecha_cita || citaExistente.fecha_cita;
        citaExistente.hora_cita = hora_cita || citaExistente.hora_cita;
        citaExistente.demerg = demerg || citaExistente.demerg;

        // Guardamos los cambios
        const citaActualizada = await citaExistente.save();

        res.status(200).json({
            ok: true,
            msg: "CITA ACTUALIZADA CORRECTAMENTE",
            cita: citaActualizada
        });
    } catch (error) {
        console.error("ERROR AL ACTUALIZAR LA CITA:", error);
        res.status(500).json({
            ok: false,
            msg: "ERROR INESPERADO AL ACTUALIZAR"
        });
    }
};

//DELETE CITA ELIMINAR UNA CITA POR NUMERO DE CITA
const eliminarCita = async (req, res) => {
    try {
        const { numero_cita } = req.params; // Obtenemos el número de cita 

        // Buscar y eliminar la cita
        const citaEliminada = await Cita.findOneAndDelete({ numero_cita });

        if (!citaEliminada) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una cita con el número: ${numero_cita}`
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Cita eliminada correctamente",
            cita: citaEliminada
        });
    } catch (error) {
        console.error("Error al eliminar la cita:", error);
        res.status(500).json({
            ok: false,
            msg: "ERROR INESPERADO AL ELIMINAR"
        });
    }
};



module.exports = {
    getCitas,
    crearCita,
    actualizarCita,
    eliminarCita
}

console.log('CONTROLLER FUNCIONANDO CORRECTAMENTE');