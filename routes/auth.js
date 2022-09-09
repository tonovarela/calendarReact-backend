
/*
Rutas de usuario
   /api/auth    
*/
const { Router } = require('express');
const { crearUsuario, validarToken ,loginUsuario} = require('../controllers/auth');

const router = Router();

router.post('/', loginUsuario);
router.get('/new', crearUsuario);
router.get('/renew', validarToken);

module.exports = router;


