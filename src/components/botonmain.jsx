import { useAuth0 } from "@auth0/auth0-react";

const BotonMain = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()}>
      <span></span>Ingresar
    </button>
  );
};
export default BotonMain;
