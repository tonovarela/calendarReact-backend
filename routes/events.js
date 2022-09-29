const { Router } = require('express');
const { listarEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();
router.use(validarJWT);


router.get('/',  listarEventos);
router.post('/', crearEvento);
router.put("/:id", actualizarEvento)
router.delete("/:id", borrarEvento)

module.exports = router;
