const express = require ('express');
const app = express();
const port = 4500;
let jwt = require("jsonwebtoken");
const sequelize = require('./conexion');
const cors = require('cors');



const bodyParser = require("body-parser");

//app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));


// /usuarios
const contactosRoutes = require('./routes/contactos.routes');
const regionRoutes = require('./routes/region.routes')
const companiasRoutes = require('./routes/compañias.routes')
const paisesRoutes = require('./routes/pais.routes')
const ciudadesRoutes = require('./routes/ciudades.routes')
const usuariosRoutes = require('./routes/usuarios.routes')
const configRoutes = require('./routes/configuraciones.routes')

app.use('/contactos',contactosRoutes);
app.use('/regiones', regionRoutes);
app.use('/companias',companiasRoutes);
app.use('/paises', paisesRoutes);
app.use('/ciudades', ciudadesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/configuraciones', configRoutes)


app.listen(port, () => {
    console.log(`Server listeting on port ${port}`);
  });