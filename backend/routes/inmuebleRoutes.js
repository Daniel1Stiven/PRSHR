const express = require('express');
const router = express.Router();
const inmuebleController = require('../controllers/inmuebleController');

// Ruta para obtener todos los inmuebles
router.get('/inmuebles', inmuebleController.getInmuebles);

// Ruta para crear un nuevo inmueble
router.post('/inmuebles', inmuebleController.createInmueble);

// Ruta para eliminar un inmueble
router.delete('/inmuebles/:id', inmuebleController.deleteInmueble);

module.exports = router;
