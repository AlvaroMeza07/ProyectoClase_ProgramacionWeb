const {Router} = require('express');
const {check} = require('express-validator');
const {getCitas, crearCita, actualizarCita, eliminarCita} = require ('../controllers/cita');
const router = Router();



//PETICON DE GET
router.get('/', getCitas);
console.log('GET CITAS LEVANTADO CORRECTAMENTE');


//POST DE CITA
router.post('/', [
        check('id_paciente', 'El ID del Paciente es OBLIGATORIO').not().isEmpty(),
        check('nombre', 'El nombre del paciente es OBLIGATORIO').not().isEmpty(),
        check('telefono', 'El numero telefonico es OBLIGATORIO').not().isEmpty(),
        check('especialidad', 'La especialidad de la cita es OBLIGATORIA').not().isEmpty(),
        check('fecha_cita', 'La fecha de la cita es OBLIGATORIA').not().isEmpty(),
        check('hora_cita','La hora de la cita es OBLIGATORIA').not().isEmpty(),
        check('demerg').optional().isString().withMessage('El campo demerg debe ser una cadena de texto'),

], crearCita);
console.log('EL POST DE CITAS ESTA FUNCIONANDO CORRECTAMENTE');

//PUT DE CITA OSEA ACTUALIZAR

router.put('/:numero_cita', actualizarCita);
console.log('EL PUT DE CITAS ESTA FUNCIONANDO CORRECTAMENTE');


//DELETE DE CITA OSEA ELIMINAR
router.delete('/:numero_cita', eliminarCita);
console.log('EL DELETE DE CITAS ESTA FUNCIONANDO CORRECTAMENTE');



module.exports = router;

