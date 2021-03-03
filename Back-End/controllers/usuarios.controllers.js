const sequelize = require('../conexion');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    const query = 
    `INSERT INTO usuarios (nombre, apellido, correo, id_perfil, contrasena) 
    VALUES (?,?,?,?,?)`;
    try {
      const {nombre, apellido, correo, id_perfil, contrasena} = req.body;
      const hashedPassword = await bcrypt.hash(contrasena,saltRounds);
      sequelize.query(query, {
        replacements: [
          nombre, apellido, correo, id_perfil, hashedPassword
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
  const { correo, contrasena } = req.body;
  
  try{
    const query = `SELECT * FROM usuarios
  WHERE correo = ? LIMIT 1`;
    let result = await sequelize.query(query,{replacements:[correo],
      type:sequelize.QueryTypes.SELECT
    });
  
    if(result.length ==0){
      res.send("usuario incorrecto");
      console.log(result);
    }
    if (result.length <= 1) {
      
      let token = jwt.sign({correo: result.correo, tipo: result.id_perfil}, clave);
     
      if (await bcrypt.compare(contrasena, result[0].contrasena)) {
        res.status(200).json({msj: 'usuario loggeado', token: token});
      }else{
        res.status(404).json({msj: 'contraseña incorrecta'});
      }
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