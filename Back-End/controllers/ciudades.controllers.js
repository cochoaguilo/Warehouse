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
      const query = `SELECT * FROM ciudades WHERE id_pais =${req.params.id_pais}
                      LIMIT 1`
      await sequelize.query(query).then((response)=>{
        //console.log(response);
        res.send({data: response[0]})
      })
    }catch(e){
      console.log(e);
    }
  }
const newCiudad =   async(req, res) => {
    const query = 'INSERT INTO ciudades (nombre) VALUES (?)';
    try {
     await sequelize.query(query, {
        replacements: [
          req.body.nombre
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', usuario: req.body});
      })
    } catch(e) {
      console.log(e);
    }
  };

let deleteCiudad = async (req,res)=>{
    const id = req.query.id_region;
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

exports.getCiudades = getCiudades;
exports.getCiudadByPaisId = getCiudadByPaisId;
exports.newCiudad = newCiudad;
exports.deleteCiudad = deleteCiudad;