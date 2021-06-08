import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { changeStatus, searchVideogame } from "../../actions/index";
import "./NavBar.css";
import logo from "../../img/lg.png";

function NavBar(props) {
  const [search, setSearch] = useState("");
  console.log();

  function handleSubmit(e) {
    e.preventDefault();
    props.searchVideogame(search);
    document.getElementById("frm").value = "";
    //document.getElementById('ord').value = "rel"
    props.changeStatus(true);
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <nav>
      <ul className="list">
        <NavLink exact to="/home">
          <img id="img-lg" src={logo} alt="logo" />
        </NavLink>
        <div id="nav-cnt">
          <li className="lst">
            <NavLink className="ind" exact to="/home">
              Home
            </NavLink>
          </li>
          <li className="lst">
            <NavLink className="ind" exact to="/add">
              Add Videogame
            </NavLink>
          </li>
          <li className="lst list-item">
            <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                id="frm"
                placeholder="Search a videogame..."
                onChange={(e) => handleChange(e)}
              ></input>
              <button id="btn-frm" type="submit">
                Buscar &#127918;
              </button>
            </form>
          </li>
        </div>
      </ul>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    status: state.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchVideogame: (vgName) => dispatch(searchVideogame(vgName)),
    changeStatus: (val) => dispatch(changeStatus(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
