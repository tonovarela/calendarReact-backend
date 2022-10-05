const { Router } = require('express');
const { listarEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require("../helpers/isDate");

const { check } = require("express-validator");

const Evento = require("../models/Evento");


const router = Router();
router.use(validarJWT);
router.get('/', listarEventos);
router.post('/',
  [
    check("title", "El titulo es obligatorio").not().isEmpty(), check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha fin es obligatoria").custom(isDate),
    validarCampos
  ],
  crearEvento);
router.put("/:id", [
  check('id','El id no es valido').isMongoId(),
  check("title", "El titulo es obligatorio").not().isEmpty(), check("start", "Fecha de inicio es obligatoria").custom(isDate),
  check("end", "Fecha fin es obligatoria").custom(isDate),
  validarCampos
], actualizarEvento)
router.delete("/:id", [check('id','El id no es valido').isMongoId()], borrarEvento)

module.exports = router;
