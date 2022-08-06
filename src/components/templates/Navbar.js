import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import React from "react";

function Navbar() {
  const location = useLocation();
  let local = location.pathname.substring(1);

  return (
    <div className={`${styles.navbarStyles} ${styles[local]}`}>
      <Link to="/home">Home</Link>
      <Link to="/homepos">Caixa</Link>
      <Link to="/homeclient">Cadastro de Cliente</Link>
      <Link to="/homereceipt">Recibo</Link>
      <Link to="/homeserviceorder">Ordem de Serviço</Link>
    </div>
  );
}

export default Navbar;
