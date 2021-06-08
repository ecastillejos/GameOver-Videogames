import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllVideogames,
  filteredByExistents,
  filteredByAddedByUser,
  filteredByGenre,
  getGamesByGenre,
  changeStatus,
  clearSearch,
  getAllVideogamesToPg,
  order,
} from "../../actions/index";
import Videogame from "../Videogame/Videogame";
import Pagination from "../Pagination/Pagination";
import "./Home.css";
import loader from "../../img/load.png";
import home from "../../img/home.png";

function HomePage(props) {
  const [filter, setFilter] = useState("DEFAULT");
  const [update, setUpdate] = useState(false);
  const [order, setOrder] = useState("rel");
  const {
    getAllVideogames,
    filteredByExistents,
    getAllVideogamesToPg,
    filteredByAddedByUser,
    filteredByGenre,
    getGamesByGenre,
    searched,
    genres,
    changeStatus,
    status,
    clearSearch,
    filtered,
  } = props;

  var searchOrAll = "";
  if (searched.length === 0) {
    searchOrAll = filtered;
  } else {
    searchOrAll = searched;
  }
  console.log(searched);

  useEffect(
    () => {
      changeStatus(false);
      if (filter === "DEFAULT") {
        setPage(1);
        if (searchOrAll.length > 0) {
          getAllVideogames();
        } else {
          getAllVideogamesToPg();
        }
      } else if (filter === "existent") {
        filteredByExistents();
        setPage(1);
      } else if (filter === "added") {
        filteredByAddedByUser();
        setPage(1);
      } else if (filter === "genre") {
        filteredByGenre();
        setPage(1);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [filter, status, searched]
  );

  useEffect(() => {
    if (order === "rel") {
      setPage(1);
    }
    if (order === "az") {
      props.order(searchOrAll, "name");
      setPage(1);
    }
    if (order === "za") {
      props.order(searchOrAll, "name", "reverse");
      setPage(1);
    }
    if (order === "rat10") {
      props.order(searchOrAll, "rating", "reverse");
      setPage(1);
    }
    if (order === "rat1") {
      props.order(searchOrAll, "rating");
      setPage(1);
    }
    setUpdate(!update); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  function handleChange(e) {
    setFilter(e.target.value);
    document.getElementById("ord").value = "rel";
    setOrder("rel");
  }

  function handleGenre(e) {
    setFilter("togenre");
    getGamesByGenre(e.target.name);
  }

  function handleOrder(e) {
    setOrder(e.target.value);
  }

  function paginate(e, num) {
    e.preventDefault();
    setPage(num);
  }

  function handleButton(e) {
    e.preventDefault();
    setFilter("genre");
  }

  function handleClear(e) {
    e.preventDefault();
    clearSearch(e);
    document.getElementById("ord").value = "rel";
    setOrder("rel");
    setFilter("DEFAULT");
  }

  const [page, setPage] = useState(1);
  const [vgPerPage] = useState(15);

  let lastVg = page * vgPerPage;
  let firstVg = lastVg - vgPerPage;
  let current = searchOrAll.slice(firstVg, lastVg);
  let currentToLength = searchOrAll.length;

  return (
    <div className="Home">
      <div>
        <img id="hdr" src={home} alt="Home" />
      </div>
      {searched.length === 0 ? (
        <label className="lbl">
          {" "}
          Show:
          <select
            className="filterby"
            id="shw"
            name="select"
            defaultValue={"DEFAULT"}
            onChange={(e) => handleChange(e)}
          >
            <option value="DEFAULT">All</option>
            <option value="genre">Genre</option>
            <option value="added">Added by me</option>
            <option value="existent">Existent before</option>
          </select>
        </label>
      ) : (
        <button onClick={(e) => handleClear(e)}>Clear Search</button>
      )}
      <label className="lbl">
        {" "}
        Order by:
        <select
          className="filterby"
          id="ord"
          name="select"
          defaultValue={"rel"}
          onChange={(e) => handleOrder(e)}
        >
          <option value="rel" disabled>
            Relevance
          </option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="rat10">Top Rated</option>
          <option value="rat1">Worst Rated</option>
        </select>
        {filter === "togenre" && (
          <button onClick={(e) => handleButton(e)}>Another genre</button>
        )}
        {current.length === 0 && filter === "togenre" && (
          <div>No games here</div>
        )}
      </label>
      {current.length === 0 && filter !== "togenre" && filter !== "genre" && (
        <div id="ldr-cnt">
          <img src={loader} className="ldr" alt="loading" />
        </div>
      )}
      <div className='"vgs-cnt"'>
        {filter !== "genre" &&
          current.map((i) => (
            <Videogame
              key={i.id}
              name={i.name}
              id={i.id}
              img={i.img}
              genres={i.genres}
              rating={i.rating}
            />
          ))}
        <div id="cnt-gen">
          {filter === "genre" &&
            genres &&
            genres.map((i) => (
              <div key={i.id} id="gen">
                <button
                  id="btn-gnr"
                  onClick={(e) => handleGenre(e)}
                  name={i.name}
                >
                  {i.name}
                </button>
              </div>
            ))}
        </div>
      </div>
      {filter !== "genre" && (
        <Pagination
          vgPerPage={vgPerPage}
          totalVideogames={currentToLength}
          paginate={paginate}
        />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    genres: state.genres,
    searched: state.searched,
    status: state.status,
    filtered: state.filtered,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllVideogames: () => dispatch(getAllVideogames()),
    filteredByExistents: () => dispatch(filteredByExistents()),
    filteredByAddedByUser: () => dispatch(filteredByAddedByUser()),
    filteredByGenre: () => dispatch(filteredByGenre()),
    getGamesByGenre: (genre) => dispatch(getGamesByGenre(genre)),
    changeStatus: (val) => dispatch(changeStatus(val)),
    clearSearch: (e) => dispatch(clearSearch(e)),
    getAllVideogamesToPg: () => dispatch(getAllVideogamesToPg()),
    order: (arr, atr, ord) => dispatch(order(arr, atr, ord)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
