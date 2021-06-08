const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

function getVideogames(req, res, next) {
  if (req.query.name) {
    const name = req.query.name;
    const videogamesApi = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`
    );
    const videogamesDb = Videogame.findAll(
      { where: { name } },
      { include: Genre }
    );
    Promise.all([videogamesApi, videogamesDb])
      .then((response) => {
        let [videogamesApiRes, videogamesDbRes] = response;
        let apiResults = videogamesApiRes.data.results.map((result) => {
          let genres = result.genres.map((i) => {
            return { name: i.name, id: i.id };
          });
          return {
            id: result.id,
            name: result.name,
            img: result.background_image,
            genres: genres,
            rating: result.rating,
          };
        });
        let gamesByName = apiResults.concat(videogamesDbRes);
        if (gamesByName.length > 0) {
          return res.send(gamesByName.slice(0, 15));
        } else {
          return res
            .status(404)
            .send(
              "Oops... that game doesn't exist. Maybe you could create it!"
            );
        }
      })
      .catch((err) => next(err));
  } else {
    const videogamesApi = axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=15`
    );
    const videogamesDb = Videogame.findAll({ include: Genre });
    Promise.all([videogamesApi, videogamesDb])
      .then((response) => {
        let [videogamesApiRes, videogamesDbRes] = response;
        let apiResults = videogamesApiRes.data.results.map((result) => {
          let genres = result.genres.map((i) => {
            return { name: i.name, id: i.id };
          });
          return {
            id: result.id,
            name: result.name,
            img: result.background_image,
            genres: genres,
          };
        });
        return res.send(apiResults.concat(videogamesDbRes).slice(0, 15));
      })
      .catch((err) => next(err));
  }
}

async function getToPage(req, res, next) {
  if (req.query.name) {
    let name = req.query.name;
    try {
      let api = `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`;
      let allGames = [];
      for (let index = 0; index < 5; index++) {
        let resApi = await axios.get(api);
        if (resApi.data.count === 0) {
          break;
        } else if (resApi.data.next === null) {
          let vgArray = resApi.data.results.map((i) => {
            let genres = i.genres.map((g) => {
              return { name: g.name, id: g.id };
            });
            var game = {
              name: i.name,
              img: i.background_image,
              genres: genres,
              id: i.id,
              rating: i.rating,
            };
            return game;
          });
          allGames = allGames.concat(vgArray);
        } else {
          api = `${resApi.data.next}`;
          let vgArray = resApi.data.results.map((i) => {
            let genres = i.genres.map((g) => {
              return { name: g.name, id: g.id };
            });
            var game = {
              name: i.name,
              img: i.background_image,
              genres: genres,
              id: i.id,
              rating: i.rating,
            };
            return game;
          });
          allGames = allGames.concat(vgArray);
        }
      }
      let dbGames = await Videogame.findAll(
        { where: { name: name } },
        { include: Genre }
      );
      let games = allGames.concat(dbGames);
      if (games.length > 0) {
        return res.send(games);
      } else {
        return res
          .status(404)
          .send("Oops... that game doesn't exist. Maybe you could create it!");
      }
    } catch {
      (err) => next(err);
    }
  } else {
    let api = `https://api.rawg.io/api/games?key=${API_KEY}`;
    let allGames = [];
    for (let index = 0; index < 5; index++) {
      let resApi = await axios.get(api);
      api = resApi.data.next;
      let vgArray = resApi.data.results.map((i) => {
        let genres = i.genres.map((g) => {
          return { name: g.name, id: g.id };
        });
        var game = {
          name: i.name,
          img: i.background_image,
          genres: genres,
          id: i.id,
          rating: i.rating,
        };
        return game;
      });
      allGames = allGames.concat(vgArray);
    }
    let dbGames = await Videogame.findAll({ include: Genre });
    res.send(allGames.concat(dbGames));
  }
}

module.exports = { getVideogames, getToPage };
