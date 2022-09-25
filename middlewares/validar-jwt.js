const { response } = require("express")
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
    //Se leen los headers
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            error: "No hay token"
        });
    }

    try {
        const {uid,name} = jwt.verify(token, process.env.JWT_SECRET);
        if (!uid) {
            return res.status(401).json({
                ok: false,
                error: "No valid token"
            });
        }
        req.uid =uid;
        req.name =name;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        })
    }





    next();


}

module.exports = { validarJWT }