const router = require('express').Router();
const {getVideogames, getToPage} = require ('../controllers/videogames');

router.get('/', getVideogames)
router.get('/toPg', getToPage)

module.exports= router;