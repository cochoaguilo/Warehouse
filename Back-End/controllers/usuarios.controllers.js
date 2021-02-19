const sequelize = require('../conexion');

const getUsuarios =  async (req, res) => {
    const query = 'SELECT * FROM usuarios';
    try {
      
      const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);
    } catch(e) {
      console.log(e);
    }
  };

const newUsuario =   async(req, res) => {
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
  };
const logIN = async (req, res) => {
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

exports.getUsuarios = getUsuarios;
exports.newUsuario = newUsuario;