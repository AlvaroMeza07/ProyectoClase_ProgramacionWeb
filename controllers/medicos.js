const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Medico = require('../models/medicos'); // Cambiado el modelo a 'medicos'

// GET - Visualizar
const getMedicos = async (req, res) => {
    const medicos = await Medico.find({}, 'id_doc nombredoc especialidad telefono ');

    res.status(200).json({
        ok: true,
        medicos
    });
};

// POST - Insertar
const crearMedico = async (req, res = response) => {
    const { id_doc, nombredoc, especialidad } = req.body;

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }

    try {
        const existeid_doc = await Medico.findOne({ id_doc });
        if (existeid_doc) {
            return res.status(400).json({
                ok: false,
                msg: 'El ID del Doctor ingresado ya existe!!!'
            });
        }

        const medico = new Medico(req.body);

        await medico.save();

        res.status(200).json({
            ok: true,
            medico
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!'
        });
    }
};

// PUT - Actualizar registros
const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id_doc);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra ese ID de medico'
            });
        }

        // Ejecutar actualización
        const campos = req.body;

        if (medicoDB.gmail === req.body.id_doc) {
            delete campos.id_doc;
        } else {
            const existeid_doc = await Medico.findOne({ gmail: req.body.id_doc });
            if (existeid_doc) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un paciente con ese Gmail'
                });
            }
        }

        const medicoActualizado = await Paciente.findByIdAndUpdate(id, campos, { new: true });
        res.json({
            ok: true,
            paciente: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, no se pudo actualizar!!!'
        });
    }
};

// DELETE - Borrar
const borrarMedico = async (req, res = response) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra ese ID del doctor'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico borrado correctamente!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede borrar'
        });
    }
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};
