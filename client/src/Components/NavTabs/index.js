import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
  return (
    <ul className="nav nav-tabs">
      
      <li className="nav-item">
        <Link
          to="/"
          className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Inicio
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Registro"
          className={window.location.pathname === "/Registro" ? "nav-link active" : "nav-link"}
        >
          Registro
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Investigar"
          className={window.location.pathname === "/Investigar" ? "nav-link active" : "nav-link"}
        >
          Investigar
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/Inversion"
          className={window.location.pathname === "/Inversion" ? "nav-link active" : "nav-link"}
        >
          Inversion
        </Link>
      </li>
        
    </ul>
  );
}

export default NavTabs;