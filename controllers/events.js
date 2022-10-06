const { response } = require('express');

const Evento = require("../models/Evento");

const listarEventos = async (req, res = response) => {
    try {
        const eventos = await Evento.find().populate('user', 'name');
        return res.json({
            ok: true,
            eventos
        });
    } catch (error) {
        return res.json({
            ok: false,
            mensaje: "Contacte al administrador"
        });
    }
}

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);
    try {
        evento.user = req.uid;
        await evento.save();
    } catch (error) {
        console.log("En el error");
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
    res.json({
        ok: true,
        mensaje: "Evento registrado",
        evento
    });

}



const actualizarEvento = async (req, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "El usuario no puede modificar este evento"
            })
        }
        const newEvento = { ...req.body, user: uid };
        const eventoActualizado = await Evento.findByIdAndUpdate(id, newEvento, { new: true });
        return res.json({
            ok: true,
            mensaje: "EventoActualizado",
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }


}


const borrarEvento = async (req, res = response) => {
    const { id } = req.params;
    const ui = req.uid;

    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }

        if (evento.user.toString() !== ui) {
            return res.status(401).json({
                ok: false,
                msg: "El usuario no puede modificar este evento"
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(id);
        if (!eventoEliminado) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }




        return res.json({
            ok: true,
            evento: eventoEliminado,
            mensaje: "Evento eliminado"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Contacte al administrador"
        });

    }

}
module.exports = {
    listarEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}
