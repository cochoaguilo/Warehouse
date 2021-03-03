const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/warehouse'});
const regionControllers = require('../controllers/region.controllers');
const middleware = require('../middleware')

router.get('/',/*middleware.autentificarAdmin, middleware.autentificarUser*/ regionControllers.getRegiones)

router.post('/',/* middleware.autentificarAdmin,middleware.autentificarUser*/ regionControllers.newRegion)

//router.put('/:id', upload.single('nombre'), regionControllers.updateAlbum)

router.delete('/:id',middleware.autentificarAdmin,middleware.autentificarUser, regionControllers.deleteRegion)


module.exports = router