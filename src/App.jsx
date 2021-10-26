import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "pages/index";
import AdminSidebar from "pages/admin/admin";
import VentasPage from "pages/ventas";
import ProductosPage from "pages/admin/productos";
import UsuariosPage from "pages/admin/usuarios";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import IngresarPage from "pages/admin/productos/Ingresar";
import EditarPage from "pages/admin/productos/editar";
import EditarUsuario from "pages/admin/usuario/editarUsuario";
import RegVenta from "pages/admin/ventas/regVenta";
import EdiVenta from "pages/admin/ventas/EdiVenta";
import "styles/stylesppal.css";
import "styles/styleslogin.css";
import "styles/stylesregister.css";
import "styles/stylesproduct.css";
import "styles/stylestable.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { isAuthenticated } = useAuth0();

  console.log(isAuthenticated);
 
  return (
    <Auth0Provider
      domain="misiontic-equipo-of-de-five.us.auth0.com"
      clientId="6g2j9VBu7LSi57EG1ugKpa5xCvXKVRMK"
      redirectUri={"https://evening-wildwood-64160.herokuapp.com/admin"}
    >
      <div className="App">
        <Router>
          <Switch>
            {/* PRIVATE */}
            <Route
              exact
              path={[
                "/admin",
                "/nuevaventa",
                "/ventas",
                "/admin/productos",
                "/admin/usuarios",
                "/admin/productos/ingresar",
                "/admin/productos/editar",
                "/admin/usuarios/editarUsuario",
                "/ventas/ingresarVenta",
                "/ventas/editarVenta",
              ]}
            >
              <PrivateLayout>
                <Switch>
                  <Route exact path="/ventas/editarVenta">
                    <EdiVenta />
                  </Route>
                  <Route exact path="/ventas/ingresarVenta">
                    <RegVenta />
                  </Route>
                  <Route exact path="/ventas">
                    <VentasPage />
                  </Route>
                  <Route exact path="/admin/productos">
                    <ProductosPage />
                  </Route>
                  <Route exact path="/admin/productos/ingresar">
                    <IngresarPage />
                  </Route>
                  <Route exact path="/admin/productos/editar">
                    <EditarPage />
                  </Route>
                  <Route exact path="/admin/usuarios/editarUsuario">
                    <EditarUsuario />
                  </Route>
                  <Route exact path="/admin/usuarios">
                    <UsuariosPage />
                  </Route>
                  <Route exact path="/admin">
                    <AdminSidebar />
                  </Route>
                </Switch>
              </PrivateLayout>
            </Route>

            {/* AUTHOLAY0UT */}

            {/* <Route path={['/login','/registro']}>
            <AuthLayout>
              <Switch>
                <Route exact path='/login'>
                  <LoginPage />
                </Route>
                <Route exact path='/registro'>
                  <RegistroPage />
                </Route>
              </Switch>
            </AuthLayout>
          </Route> */}

            {/* PRUBLIC */}
            <Route exact path={["/"]}>
              <PublicLayout>
                <Route>
                  <Index />
                </Route>
              </PublicLayout>
            </Route>
          </Switch>
        </Router>
      </div>
    </Auth0Provider>
  );
}

export default App;