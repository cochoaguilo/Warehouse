const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'});
const usuariosController = require('../controllers/usuarios.controllers');
const middleware = require('../middleware')

router.get('/',usuariosController.getUsuarios);

router.post('/', usuariosController.newUsuario)
//router.post('/login',usuariosController.)

router.put('/:id',usuariosController)

router.delete('/:id', usuariosController)

module.exports = router;