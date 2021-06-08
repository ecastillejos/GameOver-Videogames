import React from "react";
import { Route, useLocation } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing/Landing"
import HomePage from "./components/Home/Home"
import NavBar from "./components/NavBar/NavBar";
import AddVideogame from "./components/AddVideogame/AddVideogame"
import VideogameDetail from "./components/VideogameDetail/VideogameDetail"


function App() {
  const location = useLocation();
  return (
    <React.Fragment> 
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={HomePage} />
      <Route path="/add" component= {AddVideogame}/>
      <Route path="/videogame/:id" component={VideogameDetail} />
    </React.Fragment>
  )
}

export default App;
