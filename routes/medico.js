const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, actualizarMedico, crearMedico, borrarMedico } = require('../controllers/medicos');

const router = Router();

router.get('/', getMedicos);

router.post('/', [
    check('nombredoc', 'El nombre del paciente es obligatorio').not().isEmpty(),
    check('id_doc', 'El ID es obligatorio').not().isEmpty(),
    check('especialidad', 'Especialidad del medico').isEmail(),
    check('telefono', 'El teléfono es obligatorio y debe ser un número').not().isEmpty(),
    check('clinica', 'Consultorio asignado').not().isEmpty()
], crearMedico);

router.put('/:id_doc', [
    check('nombredoc', 'El nombre del paciente es obligatorio').not().isEmpty(),
    check('especialidad', 'Especialidad del medico').isEmail(),
    check('telefono', 'El teléfono es obligatorio y debe ser un número').not().isEmpty(),
    check('clinica', 'Consultorio asignado').not().isEmpty()
], actualizarMedico);

router.delete('/:id_doc', borrarMedico);

module.exports = router;
