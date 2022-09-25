
/*
Rutas de usuario
   /api/auth    
*/
const { Router } = require('express');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require("../middlewares/validar-jwt")

const router = Router();

router.post('/', [
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'El password debe de ser de 6 digitos').isLength({ min: 6 }),
   validarCampos
], loginUsuario);

router.post('/new', [
   check('name', 'El nombre es obligatorio').notEmpty(),
   check('email', 'El email es obligatorio').isEmail(),
   check('password', 'El password debe de ser de 6 digitos').isLength({ min: 6 }),
   validarCampos
], crearUsuario);
router.get('/renew', validarJWT, revalidarToken);


module.exports = router;


