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
    const query = `SELECT * FROM paises 
    WHERE id_region =${req.params.id_region}`
    let queryPais = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT})
    res.send({data: queryPais})
  }catch(e){
    console.log(e);
  }
}
const newPais =   async(req, res) => {
    
    const query = 'INSERT INTO paises (nombre, id_region, id_pais) VALUES (?,?,?)';
    try {
     await sequelize.query(query, {
        replacements: [
          req.body.nombre,
          req.body.id_region,
          req.body.id_pais
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', pais: req.body});
      })
    } catch(e) {
      console.log(e);
    }
  };

const deletePais = async (req,res)=>{
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

  const updatePais = async (req, res) =>{
  

    try {
        await sequelize.query(`UPDATE paises 
        SET nombre = "${req.body.nombre}"  
        WHERE id_pais = ${req.params.id}`,
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

exports.getPaises = getPaises;
exports.getPaisByRegionId = getPaisByRegionId;
exports.newPais = newPais;
exports.deletePais = deletePais;
exports.updatePais = updatePais;