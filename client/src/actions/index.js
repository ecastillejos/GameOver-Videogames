import axios from "axios";

export function getAllVideogames() {
  return {
    type: "GET_VIDEOGAMES",
  };
}

export function getAllVideogamesToPg() {
  return function (dispatch) {
    return axios("http://localhost:3001/videogames/toPg").then((response) =>
      dispatch({ type: "GET_TOPG", payload: response.data })
    );
  };
}

export function filteredByExistents() {
  return {
    type: "F_EXISTENTS",
  };
}

export function filteredByAddedByUser() {
  return {
    type: "F_ADDED",
  };
}

export function filteredByGenre() {
  return function (dispatch) {
    return axios("http://localhost:3001/genres").then((response) =>
      dispatch({ type: "GET_GENRES", payload: response.data })
    );
  };
}

export function getGamesByGenre(genre) {
  return {
    type: "GET_GBGENRE",
    payload: genre,
  };
}

export function addVideogame(newGame) {
  return function (dispatch) {
    return axios
      .post("http://localhost:3001/videogame", newGame)
      .then((response) => dispatch({ type: "ADD_VG", payload: response.data }));
  };
}

export function addPlatform(e, platform) {
  e.preventDefault();
  document.getElementById("platf").value = "";
  return {
    type: "ADD_PLATFORM",
    payload: platform,
  };
}

export function deletePlatform(e) {
  e.preventDefault();
  return {
    type: "DELETE_PLATFORM",
    payload: e.target.name,
  };
}

export function updateGenres(num) {
  return {
    type: "UPDATE_GENRES",
    payload: num,
  };
}

export function getVideogameDetail(id) {
  return function (dispatch) {
    return axios("http://localhost:3001/videogame/" + id).then((response) =>
      dispatch({ type: "VG_DETAIL", payload: response.data })
    );
  };
}

export function searchVideogame(vgName) {
  return function (dispatch) {
    return axios(
      `http://localhost:3001/videogames/toPg?name=${vgName}`
    ).then((response) =>
      dispatch({ type: "SEARCH_VG", payload: response.data })
    );
  };
}

export function changeStatus(val) {
  return {
    type: "UPDATE_STATUS",
    payload: val,
  };
}

export function clearSearch(e) {
  return {
    type: "CLEAR_SEARCH",
  };
}

export function order(parArray, parAttribute, parOrder) {
  var varChange = 1;
  if (parOrder === "reverse") {
    varChange = -1;
  }
  parArray.sort((a, b) => {
    if (a[parAttribute] < b[parAttribute]) {
      return -1 * varChange;
    }
    if (b[parAttribute] < a[parAttribute]) {
      return 1 * varChange;
    }
    return 0;
  });
  return {
    type: "ORDER",
    payload: parArray,
  };
}

export function setCreated() {
  return {
    type: "SET_CREATED",
  };
}

export function setPlatforms() {
  return {
    type: "SET_PLATFORMS",
  };
}
