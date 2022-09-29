const { response } = require('express');
const listarEventos = (req, res = response) => {
    return res.json({
        ok: true,
        mensaje: "Listar eventos"
    })
}
const crearEvento = (req, res = response) => {

    console.log(req.body);
    return res.json({
        ok: true,
        mensaje: "Crear eventos"
    })
}
const actualizarEvento = (req, res = response) => {
    return res.json({
        ok: true,
        mensaje: "Actualizar eventos"
    })
}
const borrarEvento = (req, res = response) => {
    const {id} = req.params; 
    return res.json({
        ok: true,
        mensaje: "Eliminar eventos"
    })
}
module.exports = {
    listarEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}
