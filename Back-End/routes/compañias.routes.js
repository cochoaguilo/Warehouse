const express = require("express");
const router = express.Router();
const companiasControllers = require('../controllers/compañias.controllers');
const middleware = require('../middleware')

router.get('/',/*middleware.autentificarAdmin, middleware.autentificarUser,*/ companiasControllers.getCompanias)

router.post('/', /*middleware.autentificarAdmin,middleware.autentificarUser,*/ companiasControllers.newCompania)

//router.put('/:id', upload.single('nombre'), companiasControllers.updateAlbum)

router.delete('/:id',middleware.autentificarAdmin,middleware.autentificarUser, companiasControllers.deleteCompania)


module.exports = router