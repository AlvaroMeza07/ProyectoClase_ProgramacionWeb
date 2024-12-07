const { Router } = require('express');
const { check } = require('express-validator');
const { getCitas, crearCita, borrarCita, actualizarCita } = require('../controllers/cita');

const router = Router();

// Ruta para obtener todas las citas
router.get('/', getCitas);

// Ruta para agendar una cita
router.post('/cita', [
    check('nombre_completo', 'El nombre completo es obligatorio').not().isEmpty(),
    check('id_paciente', 'El ID del paciente es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio y debe ser un número').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('fecha_cita', 'La fecha de la cita es obligatoria y debe ser una fecha válida').isDate(),
    check('hora_cita', 'La hora de la cita es obligatoria').not().isEmpty()
], crearCita);


// Ruta para actualizar una cita
router.put('/:id', [
    check('nombre_completo', 'El nombre completo es obligatorio').not().isEmpty(),
    check('id_paciente', 'El ID del paciente es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono debe ser un número').optional().not().isEmpty(),
    check('especialidad', 'La especialidad debe ser válida').optional().not().isEmpty(),
    check('fecha_cita', 'La fecha de la cita es obligatoria y debe ser una fecha válida').isDate(),
    check('hora_cita', 'La hora de la cita debe ser válida').optional().not().isEmpty()
], actualizarCita);

// Ruta para eliminar una cita
router.delete('/:id', borrarCita);

module.exports = router;

