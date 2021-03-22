const sequelize = require('../conexion');


const getCompanias =  async (req, res) => {
    const query = `SELECT c.id_compania, c.nombre, c.telefono , c.correo , c.direccion , 
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
      console.log(req.body);
     const {nombre, direccion, correo, telefono, ciudad} = req.body;
     const queryCiudad =  `SELECT id_ciudad
    FROM ciudades
    WHERE nombre = '${ciudad}'`;

    let Ciudad = await sequelize.query(queryCiudad, {type:sequelize.QueryTypes.SELECT});
    
    //console.log(Ciudad);
    
     //let Ciudad = queryCiudad.indexOf(ciudad);
     

     const query = `INSERT INTO compania (nombre, direccion, correo, 
            telefono, id_ciudad) 
            VALUES (?,?,?,?,${Ciudad[0].id_ciudad})`;
    
      await sequelize.query(query, {
        replacements: [
          nombre, direccion, correo, telefono
        ]
      }).then((response)=>{
        console.log(response);
        res.status(201).json({mensaje: 'enviado'});
      })
    } catch(e) {
      console.log(e);
    }
}

const updateCompania = async (req, res) =>{
  
  
  try {

    const {nombre, direccion, correo, telefono, ciudad} = req.body;
  const queryCiudad =  `SELECT id_ciudad
    FROM ciudades
    WHERE nombre = '${ciudad}'`;
    let Ciudad = await sequelize.query(queryCiudad, {type:sequelize.QueryTypes.SELECT});

      await sequelize.query(`UPDATE compania 
      SET nombre = "${nombre}",
          direccion = "${direccion}",
          correo = "${correo}",
          telefono = "${telefono}",
          id_ciudad = "${Ciudad[0].id_ciudad}"
      WHERE id_compania = ${req.params.id}`,
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
const deleteCompania = async (req,res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM compania WHERE id_compania= ?';
    try{
    await sequelize.query(query, {
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
exports.updateCompania = updateCompania;
exports.deleteCompania = deleteCompania;
