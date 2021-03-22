const sequelize = require('../conexion');

const getInteres = async(req,res) =>{

    try{
        const queryInteres = 'SELECT * FROM interes';

        const interes = await sequelize.query(queryInteres, 
            {type:sequelize.QueryTypes.SELECT})

        res.status(200).json(interes)
    }
    catch (e){
    console.log(e);
    }
}

const getPreferencias = async(req,res) =>{

    try{
        const queryPreferencia = 'SELECT * FROM preferencias';

        const preferencia = await sequelize.query(queryPreferencia, 
            {type:sequelize.QueryTypes.SELECT})

        res.status(200).json(preferencia)
    }
    catch(e){
        console.log(e);
    }
}

const getCanal = async(req,res) =>{

    try{
        const queryCanal = 'SELECT * FROM canal_Contacto';

        const canal = await sequelize.query(queryCanal, 
            {type:sequelize.QueryTypes.SELECT})

        res.status(200).json(canal)
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {
    getInteres,
    getPreferencias,
    getCanal
}