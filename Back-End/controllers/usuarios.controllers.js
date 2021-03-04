const sequelize = require('../conexion');
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const newUsuario =   async(req, res) => {
  
    try {
      console.log(req.body);
      const {nombre,  apellido, correo, compania, } = req.body;
      
      const query = 
      `INSERT INTO usuarios (nombre, id_compania,Cargo, id_canal, id_interes,id_ciudad, 
        apellido, correo, direccion, cuenta_usuario, id_preferncias) 
      VALUES (?,?,?,?,?)`;

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

  exports.newUsuario = newUsuario;
  exports.loginUsuario = loginUsuario;