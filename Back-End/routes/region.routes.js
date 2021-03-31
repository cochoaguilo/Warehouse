const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/warehouse'});
const regionControllers = require('../controllers/region.controllers');
const middleware = require('../middleware')

router.get('/', middleware.autentificarUser, regionControllers.getRegiones)

router.post('/', middleware.autentificarUser, regionControllers.newRegion)

router.put('/:id',  middleware.autentificarUser,regionControllers.updateRegion)

router.delete('/:id',middleware.autentificarUser, regionControllers.deleteRegion)


module.exports = router