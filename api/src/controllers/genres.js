const { Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');


function getGenres(req, res, next) {
    const findGenres = Genre.findAll()
        .then((response) => {
            if (response.length>0) {
                res.send(response)
            } else {
                axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
                    .then(response => {
                        const resApi = response.data.results;
                        const data = resApi.map(i => {
                            return {
                                id: i.id,
                                name: i.name
                            }
                        })
                        return data;
                    }).then(response => {
                        return Genre.bulkCreate(response)
                    }).then(() => {
                        const genres = Genre.findAll()
                        return genres
                    })
                    .then((response) => res.send(response))
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
}

module.exports = { getGenres }