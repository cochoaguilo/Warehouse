const express = require("express");
const router = express.Router()
const contactosController = require('../controllers/contactos.controllers');
const middleware = require('../middleware')

router.get('/', middleware.autentificarUser, contactosController.getContactos);

router.post('/', middleware.autentificarUser,  contactosController.newContacto)

router.put('/:id', middleware.autentificarUser, contactosController.updateContacto)

router.delete('/:id',  middleware.autentificarUser, contactosController.deleteContacto)

module.exports = router;