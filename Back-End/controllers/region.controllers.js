const sequelize = require('../conexion');

const getRegiones =  async (req, res) => {
    /*const query = `SELECT c.id_ciudad, c.nombre nombre_ciudad, 
                  p.nombre nombre_pais, r.nombre nombre_region
                  FROM ciudades c
                  LEFT JOIN paises p using(id_pais)
                  LEFT JOIN regiones r using(id_region) `;*/
    
    const queryRegion = 'SELECT * FROM regiones'
    //const queryPaises = 'SELECT * FROM paises'
    //const queryCiudades = 'SELECT * FROM ciudades'
    try {
      const regiones = await sequelize.query(queryRegion, {type:sequelize.QueryTypes.SELECT});
      
      //const paises = await sequelize.query(queryPaises, {type:sequelize.QueryTypes.SELECT});
     
      //const ciudades = await sequelize.query(queryCiudades, {type:sequelize.QueryTypes.SELECT});
      res.json(regiones);
      /*const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);*/
    } catch(e) {
      console.log(e);
    }
  };

  const getAllTables = async(req,res) =>{
    const query = `SELECT c.id_ciudad, c.nombre nombre_ciudad, 
                  p.nombre nombre_pais, r.nombre nombre_region
                  FROM ciudades c
                  LEFT JOIN paises p using(id_pais)
                  LEFT JOIN regiones r using(id_region) `;
    
                  
     try {
      
      const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);
     } catch(e) {
      console.log(e);
      }
  }

const newRegion =   async(req, res) => {
    const query = 'INSERT INTO regiones (nombre) VALUES (?)';
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

let deleteRegion = async (req,res)=>{
    const id = req.query.id_region;
    const query = 'DELETE FROM regiones WHERE id_region= ?';
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
exports.getAllTables = getAllTables;
exports.getRegiones = getRegiones;
exports.newRegion = newRegion;
exports.deleteRegion = deleteRegion;