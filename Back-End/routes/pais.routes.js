const express = require("express");
const router = express.Router()
const paisControllers = require('../controllers/pais.controllers');
const middleware = require('../middleware')

router.get('/',middleware.autentificarUser, paisControllers.getPaises)

router.post('/',middleware.autentificarUser, paisControllers.newPais)

router.get('/region/:id_region', middleware.autentificarUser, paisControllers.getPaisByRegionId)

router.put('/:id',middleware.autentificarUser, paisControllers.updatePais)

router.delete('/:id',middleware.autentificarUser, paisControllers.deletePais)


module.exports = router