const express = require ('express');
const app = express();
const port = 4500;
let jwt = require("jsonwebtoken");
const sequelize = require('./conexion');
const cors = require('cors');


const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));



app.get('/usuarios', async (req, res) => {
  const query = 'SELECT * FROM usuarios';
  try {
    
    const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
    res.json(u);
  } catch(e) {
    console.log(e);
  }
});

const emailValid = (req, res, next) => {
  var correo = req.body.email;
  arroba = correo.indexOf("@");
  punto = correo.lastIndexOf(".");
  extension = correo.split(".")[1];

  if (arroba < 1 || punto - arroba < 2 || correo === "") {
    res.send("correo invalido");
  } else if (extension.length > 3) {
    res.send("correo invalido");
  } else {
    res.send("correo valido");
  }

  next();
};
app.post("/usuario", emailValid, async(req, res) => {
  const query = 'INSERT INTO usuarios (nombre, apellido, email, telefono, direccion, pass) VALUES (?,?,?,?,?,?)';
  try {
    const {nombre, apellido, email, telefono, direccion, pass} = req.body;
    sequelize.query(query, {
      replacements: [
        nombre, apellido, email, telefono, direccion, pass
      ]
    }).then((response)=>{
      res.send({mensaje: 'enviado', usuario: req.body});
    })
  } catch(e) {
    console.log(e);
  }
});
app.post("/usuario/login", (req, res) => {
    let { nombre, pass } = req.body;
    usuarios.find((usuario) => {
      if (nombre == usuario.nombre && pass == usuario.pass && email) {
        let obj = {
          id: usuario.id,
          nombre: usuario.nombre,
        };
  
        let token = jwt.sign(obj, clave);
  
        res.send(token);
      } else {
        res.status(401).send("usuario incorrecto");
      }
    });
  });
  

app.listen(port, () => {
    console.log(`Server listeting on port ${port}`);
  });