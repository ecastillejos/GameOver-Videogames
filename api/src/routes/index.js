const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const VideogamesRouter= require('./videogames');
const GenreRouter= require('./genres');
const VideogameRouter= require('./videogame')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', VideogamesRouter);
router.use('/genres', GenreRouter);
router.use('/videogame', VideogameRouter)


module.exports = router;
