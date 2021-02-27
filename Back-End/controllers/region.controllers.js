const sequelize = require('../conexion');

const getRegiones =  async (req, res) => {
    const query = `SELECT * FROM ciudades
                   LEFT JOIN   `;
    try {
      
      const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);
    } catch(e) {
      console.log(e);
    }
  };

const newRegion =   async(req, res) => {
    const query = 'INSERT INTO regiones (nombre_region) VALUES (?)';
    try {
      sequelize.query(query, {
        replacements: [
          req.body.nombre_region
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

exports.getRegiones = getRegiones;
exports.newRegion = newRegion;
exports.deleteRegion = deleteRegion;