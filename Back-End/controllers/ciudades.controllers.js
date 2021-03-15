const sequelize = require('../conexion');

const getCiudades =  async (req, res) => {
    /*const query = `SELECT c.id_ciudad, c.nombre nombre_ciudad, 
                  p.nombre nombre_pais, r.nombre nombre_region
                  FROM ciudades c
                  LEFT JOIN paises p using(id_pais)
                  LEFT JOIN regiones r using(id_region) `;*/
    
    
    const queryCiudades = 'SELECT * FROM ciudades'
    try {
      
     
      const ciudades = await sequelize.query(queryCiudades, {type:sequelize.QueryTypes.SELECT});
      res.json(ciudades);
      /*const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);*/
    } catch(e) {
      console.log(e);
    }
  };
  const getCiudadByPaisId = async(req,res) =>{
  

    try{
      const query = `SELECT * FROM ciudades WHERE id_pais =${req.params.id_pais}`
      let queryCiudad = await sequelize.query(query,
        {type:sequelize.QueryTypes.SELECT})
      res.send({data: queryCiudad})
    }catch(e){
      console.log(e);
    }
  }
const newCiudad =   async(req, res) => {
    const query = 'INSERT INTO ciudades (nombre, id_pais) VALUES (?, ?)';
    try {
     await sequelize.query(query, {
        replacements: [
          req.body.nombre,
          req.body.id_pais
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', usuario: req.body});
      })
    } catch(e) {
      console.log(e);
    }
  };

const deleteCiudad = async (req,res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM ciudades WHERE id_ciudad= ?';
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

const updateCiudad = async(req, res) =>{
  try {
    await sequelize.query(`UPDATE ciudades 
    SET nombre = "${req.body.nombre}"  
    WHERE id_ciudad = ${req.params.id}`,
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

exports.getCiudades = getCiudades;
exports.getCiudadByPaisId = getCiudadByPaisId;
exports.newCiudad = newCiudad;
exports.deleteCiudad = deleteCiudad;
exports.updateCiudad = updateCiudad;