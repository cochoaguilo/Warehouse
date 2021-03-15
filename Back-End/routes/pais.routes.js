const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/warehouse'});
const paisControllers = require('../controllers/pais.controllers');
const middleware = require('../middleware')

router.get('/',/*middleware.autentificarAdmin, middleware.autentificarUser*/ paisControllers.getPaises)

router.post('/',/* middleware.autentificarAdmin,middleware.autentificarUser*/ paisControllers.newPais)

router.get('/region/:id_region',  paisControllers.getPaisByRegionId)

router.put('/:id',/*middleware.autentificarAdmin,middleware.autentificarUser, */paisControllers.updatePais)

router.delete('/:id',/*middleware.autentificarAdmin,middleware.autentificarUser, */paisControllers.deletePais)


module.exports = router