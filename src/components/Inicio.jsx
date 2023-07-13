import React, { useContext } from "react";
import { UserContext } from "./UserContext";
function Inicio() {
  const { user } = useContext(UserContext);

  return (
    <>
      <h2 className="text-center">¡¡¡Bienvenido!!!</h2>
      <div>
        <img
          className="img-fluid mx-auto d-block"
          src="./logo.png"
          alt="logo"
        />
      </div>
    </>
  );
}

export default Inicio;
