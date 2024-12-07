const { response } = require('express');
const { validationResult } = require('express-validator');
const Cita = require('../models/cita'); // Modelo de Cita

// GET - Visualizar
const getCitas = async (req, res) => {
    try {
        const citas = await Cita.find({})
            .populate('id_paciente', 'nombre telefono') // Popula los datos del paciente
            .exec();
        
        res.status(200).json({
            ok: true,
            citas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las citas'
        });
    }
};

// POST - Crear cita
const crearCita = async (req, res = response) => {
    const { nombre_completo, id_paciente, telefono, especialidad, fecha_cita, hora_cita } = req.body;

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }

    try {
        // Verificar si el paciente existe
        const paciente = await Cita.findById(id_paciente);
        if (!paciente) {
          return res.status(404).json({
            ok: false,
            msg: 'Paciente no encontrado'
          });
        }
      
        // Verificar si ya existe una cita para el paciente en esa fecha y hora
        const citaExistente = await Cita.findOne({ id_paciente, fecha_cita, hora_cita });
        if (citaExistente) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe una cita para este paciente en esa fecha y hora.'
          });
        }
      
        // Crear la cita
        const cita = new Cita(req.body);
        await cita.save();
      
        res.status(200).json({
          ok: true,
          cita
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Error inesperado al crear la cita'
        });
    }
}
      

// PUT - Actualizar cita
const actualizarCita = async (req, res = response) => {
    const id = req.params.id;

    try {
        const citaDB = await Cita.findById(id);

        if (!citaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra esa cita'
            });
        }

        // Ejecutar actualización
        const campos = req.body;

        const citaActualizada = await Cita.findByIdAndUpdate(id, campos, { new: true });
        res.json({
            ok: true,
            cita: citaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, no se pudo actualizar la cita'
        });
    }
};

// DELETE - Borrar cita
const borrarCita = async (req, res = response) => {
    const id = req.params.id;

    try {
        const citaDB = await Cita.findById(id);
        if (!citaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra esa cita'
            });
        }

        await Cita.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Cita borrada correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar la cita'
        });
    }
};

module.exports = {
    getCitas,
    crearCita,
    actualizarCita,
    borrarCita,
};
