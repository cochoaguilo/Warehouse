const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/warehouse'});
const usuariosControllers = require('../controllers/usuarios.controllers');
const middleware = require('../middleware')


router.post('/', middleware.autentificarAdmin, usuariosControllers.newUsuario)

router.post('/login', usuariosControllers.loginUsuario)


module.exports = router