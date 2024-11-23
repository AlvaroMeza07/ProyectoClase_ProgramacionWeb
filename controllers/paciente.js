const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const Paciente = require('../models/paciente'); // Cambiado el modelo a 'pacientes'

// GET - Visualizar
const getPacientes = async (req, res) => {
    const pacientes = await Paciente.find({}, 'nombre gmail id telefono lugarDondeVive');

    res.status(200).json({
        ok: true,
        pacientes
    });
};

// POST - Insertar
const crearPaciente = async (req, res = response) => {
    const { gmail, id, nombre } = req.body;

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }

    try {
        const existeGmail = await Paciente.findOne({ gmail });
        if (existeGmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El Gmail ingresado ya existe!!!'
            });
        }

        const paciente = new Paciente(req.body);

        await paciente.save();

        res.status(200).json({
            ok: true,
            paciente
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
const actualizarPaciente = async (req, res = response) => {
    const id = req.params.id;

    try {
        const pacienteDB = await Paciente.findById(id);

        if (!pacienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra ese ID de paciente'
            });
        }

        // Ejecutar actualización
        const campos = req.body;

        if (pacienteDB.gmail === req.body.gmail) {
            delete campos.gmail;
        } else {
            const existeGmail = await Paciente.findOne({ gmail: req.body.gmail });
            if (existeGmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un paciente con ese Gmail'
                });
            }
        }

        const pacienteActualizado = await Paciente.findByIdAndUpdate(id, campos, { new: true });
        res.json({
            ok: true,
            paciente: pacienteActualizado
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
const borrarPaciente = async (req, res = response) => {
    const id = req.params.id;

    try {
        const pacienteDB = await Paciente.findById(id);
        if (!pacienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra ese ID de paciente'
            });
        }

        await Paciente.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Paciente borrado correctamente!!!'
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
    getPacientes,
    crearPaciente,
    actualizarPaciente,
    borrarPaciente
};
