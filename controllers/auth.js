const { response } = require('express');

const crearUsuario = (req, res = response) => {
    res.json({
        ok: true,
        msg: "new"
    });
}
const validarToken = (req, res) => {
    res.json({
        ok: true,
        mensaje: "renew"
    });
}

const loginUsuario =(req,res)=>{
    res.json({
        ok: true,
        mensaje: "loginUsuario"
    });
}


module.exports = { crearUsuario, validarToken ,loginUsuario}


