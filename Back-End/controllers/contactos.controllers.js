const sequelize = require('../conexion');


const getContactos =  async (req, res) => {
    const query = `SELECT  c.nombre,c.apellido, c.cargo , c.correo , c.direccion , 
              c.cuenta_usuario, p2.nombre nombre_pais, c2.nombre nombre_ciudad,
              r.nombre nombre_region, p3.nombre_preferencias, cc.canal, i.valor, 
              c4.nombre nombre_compania
              FROM contactos c
              LEFT JOIN ciudades c2 using(id_ciudad)
              LEFT JOIN paises p2 using(id_pais)
              LEFT JOIN regiones r using(id_region)
              LEFT JOIN preferencias p3 using (id_preferencias)
              LEFT JOIN canal_Contacto cc using (id_canal)
              LEFT JOIN interes i using (id_interes)
              LEFT JOIN compania c4 using (id_compania)`;
    try {
      
      const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);
    } catch(e) {
      console.log(e);
    }
  };

const newContacto =   async(req, res) => {
  
    try {
      console.log(req.body);
      const {nombre,  apellido, correo, compania, } = req.body;
      const queryCompania = `SELECT id_compania
                              FROM compania
                              WHERE nombre = ${compania}`;
      const query = 
      `INSERT INTO contactos (nombre, id_compania,Cargo, id_canal, id_interes,id_ciudad, 
        apellido, correo, direccion, cuenta_usuario, id_preferncias) 
      VALUES (?,?,?,?,?)`;

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


exports.getContactos = getContactos;
exports.newContacto = newContacto;
exports.deleteContacto = deleteContacto;
