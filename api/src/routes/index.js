const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const country = require ('./country.js')
const TouristActivity = require('./TouristActivity.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', country)
router.use('/', TouristActivity);

module.exports = router;
