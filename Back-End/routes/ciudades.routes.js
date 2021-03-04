const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/warehouse'});
const ciudadesControllers = require('../controllers/ciudades.controllers');
const middleware = require('../middleware')

router.get('/',/*middleware.autentificarAdmin, middleware.autentificarUser*/ ciudadesControllers.getCiudades)

router.post('/',/* middleware.autentificarAdmin,middleware.autentificarUser*/ ciudadesControllers.newCiudad)

//router.put('/:id', upload.single('nombre'), ciudadesControllers.updateAlbum)

router.delete('/:id',middleware.autentificarAdmin,middleware.autentificarUser, ciudadesControllers.deleteCiudad)


module.exports = router