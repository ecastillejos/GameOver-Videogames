const router = require('express').Router();
const { getAParticularlyVideogame, addVideogame} = require ('../controllers/videogame');

router.get('/:id', getAParticularlyVideogame)
router.post('/', addVideogame)



module.exports= router;