// import React from "react";
// import { Link } from "react-router-dom";

// function NavTabs() {
//   return (
//     <ul className="nav nav-tabs">
      
//       <li className="nav-item">
//         <Link
//           to="/"
//           className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
//         >
//           Inicio
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link
//           to="/Registro"
//           className={window.location.pathname === "/Registro" ? "nav-link active" : "nav-link"}
//         >
//           Registro
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link
//           to="/Investigar"
//           className={window.location.pathname === "/Investigar" ? "nav-link active" : "nav-link"}
//         >
//           Investigar
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link
//           to="/Inversion"
//           className={window.location.pathname === "/Inversion" ? "nav-link active" : "nav-link"}
//         >
//           Inversion
//         </Link>
//       </li>
        
//     </ul>
//   );
// }

// export default NavTabs;

/* eslint-disable no-script-url */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1),
  },
}));

// This resolves to nothing and doesn't affect browser history
const Inicio = "/";
const Registro = "/Registro"
const Investigar = "/Investigar"
const Inversion = "/Inversion"

export default function Links() {
  const classes = useStyles();

  return (
    <Typography>
      <Link href={Inicio} className={classes.link}>
        Inicio
      </Link>
      <Link href={Registro} className={classes.link}>
        Registro
      </Link>
      <Link href={Investigar} className={classes.link}>
        Investigar
      </Link>
      <Link href={Inversion} className={classes.link}>
        Inversion
      </Link>
    </Typography>
  );
}