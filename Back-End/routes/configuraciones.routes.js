const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/warehouse'});
const configControllers = require('../controllers/configuraciones.controllers');
const middleware = require('../middleware')

router.get('/interes',/*middleware.autentificarAdmin, middleware.autentificarUser*/ configControllers.getInteres)

router.get('/preferencias',  configControllers.getPreferencias);

router.get('/canal',/*middleware.autentificarAdmin,middleware.autentificarUser, */ configControllers.getCanal)

module.exports = router