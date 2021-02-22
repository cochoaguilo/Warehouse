const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'});
const usuariosController = require('../controllers/usuarios.controllers');
const middleware = require('../middleware')

router.get('/',usuariosController.getContactos);

router.post('/', middleware.autentificarAdmin, usuariosController.newUsuario)
router.post('/login',usuariosController.loginUsuario)

//router.put('/:id',usuariosController)

router.delete('/:id', middleware.autentificarAdmin, middleware.autentificarUser, usuariosController.deleteContacto)

module.exports = router;