const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');


function getAParticularlyVideogame(req, res, next) {
    const id = req.params.id;
    if (!isNaN(id)) {
        axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            .then(response => {
                const resApi = response.data;
                return res.send({
                    name: resApi.name,
                    img: resApi.background_image,
                    genres: resApi.genres.map(i=>{return { name: i.name, id: i.id}}),
                    description: resApi.description,
                    released: resApi.released,
                    rating: resApi.rating,
                    platforms: resApi.platforms ? resApi.platforms.map(i => i.platform.name) : 'Not specified'
                })
            }).catch(err => next(err))
    } else {
        Videogame.findByPk(id, {include: Genre})
        .then(response=> {
            return res.send(response)
        }).catch(err => next(err))
    }
}

function addVideogame(req, res, next) {
    const id = uuidv4();
    const {name, description, platforms, genres, released, rating}= req.body
    const videogameBody = { name, description, platforms, released, rating, id }
    Videogame.findOrCreate({ where: { name: videogameBody.name }, defaults: videogameBody })
        .then(createdVideogame => {
            createdVideogame[0].setGenres(genres)
            return res.send(createdVideogame[0])
        })
        .catch(err => next(err))
}


module.exports = { getAParticularlyVideogame, addVideogame }