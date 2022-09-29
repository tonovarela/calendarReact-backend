const { Schema, model } = require("mongoose")

const EventoSchema = Schema({
    id: { type: String, required: true },
    titulo: { type: String, required: true },
    notes: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'Usuario',        
    }
    
});

module.exports = model('Evento', EventoSchema);