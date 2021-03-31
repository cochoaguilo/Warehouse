const express = require("express");
const router = express.Router();
const companiasControllers = require('../controllers/compañias.controllers');
const middleware = require('../middleware')

router.get('/', middleware.autentificarUser, companiasControllers.getCompanias)

router.post('/', middleware.autentificarUser, companiasControllers.newCompania)

router.put('/:id',middleware.autentificarUser, companiasControllers.updateCompania);

router.delete('/:id',middleware.autentificarUser, companiasControllers.deleteCompania)


module.exports = router