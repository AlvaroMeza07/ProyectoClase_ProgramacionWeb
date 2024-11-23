const { Router } = require('express');
const { check } = require('express-validator');
const { getPacientes, crearPaciente, actualizarPaciente, borrarPaciente } = require('../controllers/paciente');

const router = Router();

// Ruta para obtener todos los pacientes
router.get('/', getPacientes);

// Ruta para crear un nuevo paciente
router.post('/', [
    check('nombre', 'El nombre del paciente es obligatorio').not().isEmpty(),
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('gmail', 'El Gmail es obligatorio y debe ser válido').isEmail(),
    check('telefono', 'El teléfono es obligatorio y debe ser un número').not().isEmpty(),
    check('lugarDondeVive', 'El lugar donde vive es obligatorio').not().isEmpty()
], crearPaciente);

// Ruta para actualizar un paciente
router.put('/:id', [
    check('nombre', 'El nombre del paciente es obligatorio').not().isEmpty(),
    check('gmail', 'El Gmail debe ser válido').optional().isEmail(),
    check('telefono', 'El teléfono debe ser un número').optional().not().isEmpty(),
    check('lugarDondeVive', 'El lugar donde vive no puede estar vacío').optional().not().isEmpty()
], actualizarPaciente);

// Ruta para eliminar un paciente
router.delete('/:id', borrarPaciente);

module.exports = router;
