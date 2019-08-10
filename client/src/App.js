import React from 'react';
import './App.css';
import Inicio from "./Pages/Inicio"
import Registro from "./Pages/Registro"
import Investigar from "./Pages/Investigar"
import Inversion from "./Pages/Inversion"
import NavTabs from "./Components/NavTabs"
import { BrowserRouter as Router, Route } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavTabs/>
          <br></br>
          <Route exact path="/" component={Inicio}/>
          <Route exact path="/Registro" component={Registro}/>
          <Route exact path="/Investigar" component={Investigar}/>
          <Route exact path="/Inversion" component={Inversion}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
