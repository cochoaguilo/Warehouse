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

  const getAllTables = async(req,res) =>{
    
    const queryRegion = 'SELECT * FROM regiones'
                  
     try {
      
      const u = await sequelize.query(queryRegion, {type:sequelize.QueryTypes.SELECT});
      
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

  function selectAllInfoLocation(req, res) {
    let sql = `SELECT * FROM regiones`;

    sequelize.query(sql, function (err, regiones) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {
            regiones.forEach(re => {
                re.type = "region"
            })

            let sqlCon = `SELECT * FROM paises`;

            sequelize.query(sqlCon, function (err, paises) {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Internal error' });

                } else {

                    paises.forEach(co => {
                        co.type = "pais"
                        regiones.push(co)
                    })

                    let sqlCit = `SELECT * FROM ciudades`;

                    sequelize.query(sqlCit, function (err, ciudades) {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ error: 'Internal error' });

                        } else {

                            ciudades.forEach(ci => {
                                ci.type = "ciudad"
                                regiones.push(ci)
                            })
                            res.send(regiones)

                        }
                    })
                }
            })

        }
    })
}
exports.getAllTables = getAllTables;
exports.getRegiones = getRegiones;
exports.newRegion = newRegion;
exports.deleteRegion = deleteRegion;
exports.selectAllInfoLocation =selectAllInfoLocation;