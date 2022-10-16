const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");


const crearUsuario = async (req, res = response) => {
    const { name, email, password } = req.body
    const usuario = new Usuario(req.body);
    try {
        let usuarioDB = await Usuario.findOne({ email });
        if (usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: "Un usuario existe con ese correo",
            });
            return;
        }
        const salt = await bcrypt.genSaltSync(10);
        usuario.password = await bcrypt.hashSync(password, salt);
        await usuario.save(); 
        //JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Falla en el servicio",
        });
        return;
    }
}
const revalidarToken = async(req, res) => {
   const  {uid,name} =req;   
   const token = await generarJWT(uid, name);
    res.json({
        ok: true,        
        uid,name,
        token

    });
}

const loginUsuario = async (req, res) => {
    const { email, password } = req.body
    try {
        let usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: "El usuario no existe",
            });
            return;
        }
        //Confirmar los password        
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: "La contrasenia no es correcta",
            });
            return;
        }
        const token = await generarJWT(usuarioDB.id, usuarioDB.name);
        res.json({
            ok: true,
            uid: usuarioDB.id,
            name: usuarioDB.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: "Error interno del sistema",

        });
        return;
    }
}

module.exports = { crearUsuario, revalidarToken, loginUsuario }


