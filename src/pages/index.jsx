import CabezaPaginaPpal from "components/cabezapagppal";
import ContentPaginaPpal from "components/contentpagppal";
import BotonMain from "components/botonmain";
import PiePaginaPpal from "components/piepaginappal";
import logo from "media/logo.png";

import React from "react";

const Index = () => {
  return (
    <div>
      <header className="banner">
        <CabezaPaginaPpal logoppal={logo} />
      </header>
      <main>
        <div className="content">
          <ContentPaginaPpal />
          <div>
            <BotonMain />
          </div>
        </div>
      </main>
      <footer className="banner_inf">
        <PiePaginaPpal />
      </footer>
    </div>
  );
};

export default Index;
