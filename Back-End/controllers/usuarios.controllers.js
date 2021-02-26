const sequelize = require('../conexion');
let jwt = require('jsonwebtoken');

const getContactos =  async (req, res) => {
    const query = 'SELECT * FROM contactos';
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
let deleteContacto = async (req,res)=>{
    const id = req.query.id_contacto;
    const query = 'DELETE FROM contactos WHERE id_contacto= ?';
    try{
    sequelize.query(query, {
      replacements:[id]
    }).then((data => {
      res.send({status: 'eliminado'});
    }))}
    catch(e){
      res.status(400);
      console.log(e)
    }
};
let loginUsuario = async(req, res) => {
  let clave = "marcos21";
  const { correo } = req.body;
  
  try{
    const query = `SELECT * FROM usuarios
  WHERE correo = ? LIMIT 1`;
    let result = await sequelize.query(query,{replacements:[correo],
      type:sequelize.QueryTypes.SELECT
    });
    console.log(result);
    if(result.length ==0){
      res.send("usuario incorrecto");
      //console.log(result);
    }
    if (result.length == 1) {
      console.log(result)
      let token = jwt.sign({correo: result.correo, tipo: result.id_perfil}, clave);
      
      res.status(200).json({msj: 'usuario loggeado', token: token})
    } 
    
    }
  catch (e){
    console.log(e);
  }
};

exports.getContactos = getContactos;
exports.newUsuario = newUsuario;
exports.deleteContacto = deleteContacto;
exports.loginUsuario = loginUsuario;