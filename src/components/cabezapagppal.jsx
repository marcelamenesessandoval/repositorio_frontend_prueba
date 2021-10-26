import React from "react";

const CabezapaginaPpal = ({ logoppal }) => {
  return (
    <div className="navbar">
      <img src={logoppal} className="logo" alt="logo_ventisoft" />
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Nosotros</a>
        </li>
        <li>
          <a href="/">Clientes</a>
        </li>
        <li>
          <a href="/">Pics</a>
        </li>
        <li>
          <a href="/">Redes</a>
        </li>
      </ul>
    </div>
  );
};

export default CabezapaginaPpal;
