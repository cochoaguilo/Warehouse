const sequelize = require('../conexion');

const getRegiones =  async (req, res) => {
    
    
    const queryRegion = 'SELECT * FROM regiones'
    
    try {
      const regiones = await sequelize.query(queryRegion, {type:sequelize.QueryTypes.SELECT});
    
      res.json(regiones);
      
    } catch(e) {
      console.log(e);
    }
  };


const newRegion =   async(req, res) => {
    const query = 'INSERT INTO regiones (nombre) VALUES (?)';
    try {
     await sequelize.query(query, {
        replacements: [
          req.body.nombre
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', region: req.body});
      })
    } catch(e) {
      console.log(e);
    }
  };

const deleteRegion = async (req,res)=>{
    const id = req.params.id;
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

const updateRegion = async (req, res) =>{
  

    try {
        await sequelize.query(`UPDATE regiones 
        SET nombre = "${req.body.nombre}"  
        WHERE id_region = ${req.params.id}`,
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

exports.getRegiones = getRegiones;
exports.newRegion = newRegion;
exports.deleteRegion = deleteRegion;
exports.updateRegion = updateRegion;
