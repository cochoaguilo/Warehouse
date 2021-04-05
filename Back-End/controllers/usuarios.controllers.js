const sequelize = require('../conexion');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const newUsuario =   async(req, res) => {
  
    try {
      console.log(req.body);
      const {nombre,  apellido, correo, perfil, contrasena } = req.body;

      const queryPerfil = 
        `SELECT id_perfil FROM perfil
          WHERE nombre_perfil = '${perfil}'`

      let Perfil = await sequelize.query(queryPerfil,{type: sequelize.QueryTypes.SELECT})
      
      const query = 
      `INSERT INTO usuarios (nombre,  
        apellido, correo, id_perfil, contrasena) 
      VALUES (?,?,?,?,?)`;

      const hashedPassword = await bcrypt.hash(contrasena,saltRounds);
      sequelize.query(query, {
        replacements: [
          nombre, apellido, correo, Perfil[0].id_perfil, hashedPassword
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', usuario: req.body});
      })
    } catch(e) {
      console.log(e);
    }
};

const loginUsuario = async(req, res) => {
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
        
      }
      if (result.length == 1) {
       // console.log(result[0].id_perfil);
        let token = jwt.sign({correo: result[0].correo, tipo: result[0].id_perfil}, clave);
       
        if (await bcrypt.compare(contrasena, result[0].contrasena)) {
          res.status(200).json({msj: 'usuario loggeado', token: token, tipo:result[0].id_perfil});
        }else{
          res.status(404).json({msj: 'contraseña incorrecta'});
        }
      } 
      
      }
    catch (e){
      console.log(e);
    }
  };

  exports.newUsuario = newUsuario;
  exports.loginUsuario = loginUsuario;