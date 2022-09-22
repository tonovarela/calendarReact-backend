const { response } = require('express');
const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body

   
    res.status(201).json({
        ok: true,
        msg: "new",
        name,
        email,
        password
    });
}
const revalidarToken = (req, res) => {

    res.json({
        ok: true,
        mensaje: "renew",

    });
}

const loginUsuario = (req, res) => {
    const { email, password } = req.body

    res.json({
        ok: true,
        mensaje: "loginUsuario",
        email,
        password
    });
}


module.exports = { crearUsuario, revalidarToken, loginUsuario }


