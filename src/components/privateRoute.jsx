
import { useAuth0 } from "@auth0/auth0-react";


const PrivateRoute = ({ children }) => {
    const {  isAuthenticated, isLoading } = useAuth0();

  if(isLoading) return <div> Loading.....</div>;

  return isAuthenticated ? <>{children}</> : <div> NO ESTAS AUTORIZADO PARA INGRESAR SIN AUTORIZACION</div>

};

export default PrivateRoute;
    