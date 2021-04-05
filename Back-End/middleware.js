const jwt = require('jsonwebtoken');





const autentificarUser = (req,res,next) =>{
    //autenticacion(req,res, next, 2)
    const jwtToken = req.headers["authorization"];
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    let clave = "marcos21";
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, clave, (error, decoded) => {
        
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        
        if (decoded.tipo ==2 || decoded.tipo ==1) {
            
            next();
        }else{
            return res.status(401).json({message: 'usuario no permitido'})
        }
    });
}
const autentificarAdmin = (req, res, next) => {
    //autenticacion(req,res, next, 1) 
    const jwtToken = req.headers["authorization"];
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    let clave = "marcos21";
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, clave, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        
        if (decoded.tipo ==1) {
            next();
        }else{
            return res.status(401).json({message: 'usuario no permitido'})
        }
    });   
  };


  exports.autentificarUser = autentificarUser;
  exports.autentificarAdmin = autentificarAdmin;