import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Botonlogout = () => {
  const {logout} = useAuth0()

  return (
    <button onClick={() => logout()} type="button">
      <span></span> <label>Cerrar Sesion</label>
    </button>
  );
};

export default Botonlogout;
