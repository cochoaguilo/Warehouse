const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/warehouse'});
const ciudadesControllers = require('../controllers/ciudades.controllers');
const middleware = require('../middleware')

router.get('/', middleware.autentificarUser, ciudadesControllers.getCiudades)

router.post('/', middleware.autentificarUser, ciudadesControllers.newCiudad)

router.get('/pais/:id_pais', middleware.autentificarUser, ciudadesControllers.getCiudadByPaisId);

router.put('/:id',middleware.autentificarUser, ciudadesControllers.updateCiudad)

router.delete('/:id',middleware.autentificarUser, ciudadesControllers.deleteCiudad)


module.exports = router