const express = require("express");
const router = express.Router();
const configControllers = require('../controllers/configuraciones.controllers');
const middleware = require('../middleware')

router.get('/interes',middleware.autentificarUser,configControllers.getInteres)

router.get('/preferencias',middleware.autentificarUser, configControllers.getPreferencias);

router.get('/canal',middleware.autentificarUser,  configControllers.getCanal)

module.exports = router