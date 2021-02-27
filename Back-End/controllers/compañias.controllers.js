const sequelize = require('../conexion');


const getCompanias =  async (req, res) => {
    const query = `SELECT c.nombre, c.telefono , c.correo , c.direccion , 
    p.nombre nombre_pais, c3.nombre nombre_ciudad 
    FROM compania c
    left join ciudades c3 using (id_ciudad)
    left join paises p using(id_pais)`;
    try {
      
      const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);
    } catch(e) {
      console.log(e);
    }
  };

const newCompania =   async(req, res) => {
    
    
    try {
     // const {nombre, direccion, correo, telefono, ciudad} = req.body;
     const queryCiudad =  `SELECT id_ciudad
    FROM ciudades
    WHERE nombre = ?`;
    
     let Ciudad =  await sequelize.query(queryCiudad, {
        replacements: [
          req.query.ciudad
        ]
      })

     const query = `INSERT INTO compania (nombre, direccion, correo, 
            telefono, id_ciudad) 
            VALUES (?,?,?,?,${Ciudad})`;
    
      await sequelize.query(query, {
        replacements: [
          nombre, direccion, correo, telefono, Ciudad
        ]
      }).then((response)=>{
        console.log(response);
        res.status(201).json({mensaje: 'enviado', usuario: req.body});
      })
    } catch(e) {
      console.log(e);
    }
}
let deleteCompania = async (req,res)=>{
    const id = req.query.id_contacto;
    const query = 'DELETE FROM compania WHERE id_compania= ?';
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


exports.getCompanias = getCompanias;
exports.newCompania = newCompania;
exports.deleteCompania = deleteCompania;
