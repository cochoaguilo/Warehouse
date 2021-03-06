const express = require("express");
const router = express.Router()
const ciudadesControllers = require('../controllers/ciudades.controllers');
const middleware = require('../middleware')

router.get('/', middleware.autentificarUser, ciudadesControllers.getCiudades)

router.post('/', middleware.autentificarUser, ciudadesControllers.newCiudad)

router.get('/pais/:id_pais', middleware.autentificarUser, ciudadesControllers.getCiudadByPaisId);

router.put('/:id',middleware.autentificarUser, ciudadesControllers.updateCiudad)

router.delete('/:id',middleware.autentificarUser, ciudadesControllers.deleteCiudad)


module.exports = router