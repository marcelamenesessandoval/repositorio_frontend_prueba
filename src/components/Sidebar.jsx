import React from 'react';
import LogoSidebar from 'components/logosidebar';
import logo from 'media/logo.png';
import BotonSidebar from './botonsidebar';

const Sidebar = () => {

    const SidebarStyle = {
        width: '300px',
        height: '100vh',
        background: '#000000a9',
    };

    return <nav style={SidebarStyle}>
              <LogoSidebar logoppal={logo} />
              <BotonSidebar />      
    </nav>

};

export default Sidebar;



