import { Link } from "react-router-dom";
import React from "react";
import Botonlogout from "./botonlogout";
import { useAuth0 } from "@auth0/auth0-react";

const BotonSidebar = () => {
  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated);

  return (
    <div>
      <Link to="/ventas">
        <button type="button">
          <span></span>Gestionar Ventas
        </button>
      </Link>
      <Link to="/admin/productos">
        <button type="button">
          <span></span>Gestionar Productos
        </button>
      </Link>
      <Link to="/admin/usuarios">
        <button type="button">
          <span></span>Gestionar usuarios
        </button>
      </Link>
      <Link to='/'>
        <Botonlogout />
      </Link>
    </div>
  );
};

export default BotonSidebar;
