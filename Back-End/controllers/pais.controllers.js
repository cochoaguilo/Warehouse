const { response } = require('express');
const sequelize = require('../conexion');

const getPaises =  async (req, res) => {
    /*const query = `SELECT c.id_ciudad, c.nombre nombre_ciudad, 
                  p.nombre nombre_pais, r.nombre nombre_region
                  FROM ciudades c
                  LEFT JOIN paises p using(id_pais)
                  LEFT JOIN regiones r using(id_region) `;*/
    
    
    const queryPaises = 'SELECT * FROM paises'
   
    try {
      
      
      const paises = await sequelize.query(queryPaises, {type:sequelize.QueryTypes.SELECT});
     
      
      res.json(paises);
      /*const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);*/
    } catch(e) {
      console.log(e);
    }
  };
const getPaisByRegionId = async(req,res) =>{
  

  try{
    const query = `SELECT * FROM paises WHERE id_region =${req.params.id_region}
                    LIMIT 1`
    await sequelize.query(query).then((response)=>{
      //console.log(response);
      res.send({data: response[0]})
    })
  }catch(e){
    console.log(e);
  }
}
const newPais =   async(req, res) => {
    const query = 'INSERT INTO paises (nombre) VALUES (?)';
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

let deletePais = async (req,res)=>{
    const id = req.params.id;
    const query = 'DELETE FROM paises WHERE id_pais= ?';
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

exports.getPaises = getPaises;
exports.getPaisByRegionId = getPaisByRegionId;
exports.newPais = newPais;
exports.deletePais = deletePais;