const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'});
const contactosController = require('../controllers/contactos.controllers');
const middleware = require('../middleware')

router.get('/',contactosController.getContactos);

router.post('/', /*middleware.autentificarAdmin*/ contactosController.newContacto)


//router.put('/:id',contactosController)

router.delete('/:id', middleware.autentificarAdmin, middleware.autentificarUser, contactosController.deleteContacto)

module.exports = router;