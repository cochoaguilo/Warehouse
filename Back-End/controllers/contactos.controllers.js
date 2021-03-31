const sequelize = require('../conexion');


const getContactos =  async (req, res) => {
    const query = `SELECT  c.id_contacto, c.nombre,c.apellido, c.cargo , c.correo , c.direccion , 
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
      const {nombre,  apellido, cargo, correo, compania, ciudad, direccion,
       interes, canal, cuenta, preferencias} = req.body;

      const queryCompania = 
      `SELECT id_compania                       
      FROM compania
      WHERE nombre = '${compania}'`;
        let Compania = await sequelize.query(queryCompania, {type:sequelize.QueryTypes.SELECT})

      const queryCiudad = 
      `SELECT id_ciudad                       
      FROM ciudades
      WHERE nombre = "${ciudad}"`;
      let Ciudad = await sequelize.query(queryCiudad, {type:sequelize.QueryTypes.SELECT});
       
      const queryInteres = 
      `SELECT id_interes                       
      FROM interes
      WHERE valor = "${interes}"`;

      let Interes = await sequelize.query(queryInteres, {type:sequelize.QueryTypes.SELECT});

      const queryCanal = 
      `SELECT id_canal                       
      FROM canal_Contacto
      WHERE canal = "${canal}"`;

      let Canal = await sequelize.query(queryCanal, {type:sequelize.QueryTypes.SELECT});
      

      const queryPreferencias = 
      `SELECT id_preferencias                       
      FROM preferencias
      WHERE nombre_preferencias = "${preferencias}"`;

      let Preferencias = await sequelize.query(queryPreferencias, {type:sequelize.QueryTypes.SELECT});

      const query = 
      `INSERT INTO contactos (nombre, id_compania,Cargo, id_canal, id_interes,id_ciudad, 
        apellido, correo, direccion, cuenta_usuario, id_preferencias) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

      sequelize.query(query, {
        replacements: [
          nombre, Compania[0].id_compania, cargo, Canal[0].id_canal, Interes[0].id_interes,
          Ciudad[0].id_ciudad, apellido, correo, direccion, cuenta, Preferencias[0].id_preferencias
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', usuario: req.body});
      })
    } catch(e) {
      console.log(e);
    }
};
const deleteContacto = async (req,res)=>{
    const id = req.params.id;
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

const updateContacto = async (req, res) =>{
  
  
  try {

    const {nombre,  apellido, cargo, correo, compania, ciudad, direccion,
      interes, canal, cuenta, preferencias} = req.body;

      const queryCompania = 
      `SELECT id_compania                       
      FROM compania
      WHERE nombre = '${compania}'`;
        let Compania = await sequelize.query(queryCompania, {type:sequelize.QueryTypes.SELECT})

      
      const queryInteres = 
      `SELECT id_interes                       
      FROM interes
      WHERE valor = "${interes}"`;

      let Interes = await sequelize.query(queryInteres, {type:sequelize.QueryTypes.SELECT});

      const queryCanal = 
      `SELECT id_canal                       
      FROM canal_Contacto
      WHERE canal = "${canal}"`;

      let Canal = await sequelize.query(queryCanal, {type:sequelize.QueryTypes.SELECT});
      

      const queryPreferencias = 
      `SELECT id_preferencias                       
      FROM preferencias
      WHERE nombre_preferencias = "${preferencias}"`;

      let Preferencias = await sequelize.query(queryPreferencias, {type:sequelize.QueryTypes.SELECT});
  
      const queryCiudad =  `SELECT id_ciudad
      FROM ciudades
      WHERE nombre = '${ciudad}'`;
      let Ciudad = await sequelize.query(queryCiudad, {type:sequelize.QueryTypes.SELECT});

      await sequelize.query(`UPDATE contactos 
      SET nombre = "${nombre}",
          apellido = "${apellido}",
          Cargo = "${cargo}"
          direccion = "${direccion}",
          correo = "${correo}",
          compania = "${Compania[0].id_compania}",
          id_ciudad = "${Ciudad[0].id_ciudad}",
          id_preferencias = "${Preferencias[0].id_preferencias}",
          id_canal = ${Canal[0].id_canal},
          cuenta_usuario = "${cuenta}",
          id_interes = ${Interes[0].id_interes}
      WHERE id_contacto = ${req.params.id}`,
      { type: sequelize.QueryTypes.INSERT })
      .then((data =>{

        res.status(201).json({
          message: 'pedido actualizado',
          data:req.body
      })
      })
      
      )

  } catch (error) {
      console.log(`error en la inserción ${error}`)
  }
}  


exports.getContactos = getContactos;
exports.newContacto = newContacto;
exports.deleteContacto = deleteContacto;
exports.updateContacto = updateContacto;
