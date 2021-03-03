const express = require ('express');
const app = express();
const port = 4500;
let jwt = require("jsonwebtoken");
const sequelize = require('./conexion');
const cors = require('cors');



const bodyParser = require("body-parser");

//app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit:'100mb' }));


// /usuarios
const usuariosRoutes = require('./routes/usuarios.routes');
const regionRoutes = require('./routes/region.routes')
const companiasRoutes = require('./routes/compañias.routes')

app.use('/usuarios',usuariosRoutes);
app.use('/regiones', regionRoutes);
app.use('/companias',companiasRoutes)





  

app.listen(port, () => {
    console.log(`Server listeting on port ${port}`);
  });