const express = require("express");
const router = express.Router()
const usuariosControllers = require('../controllers/usuarios.controllers');
const middleware = require('../middleware')


router.post('/', middleware.autentificarAdmin, usuariosControllers.newUsuario)

router.post('/login', usuariosControllers.loginUsuario)


module.exports = router