
import React from 'react'

const LogoSidebar = ({logoppal}) => {

    const logoSB = {
        width: '230px',
        marginTop: '40px',
    };

    return(
        <div>
            <div>
                    <div>
                        <img src={logoppal} style={logoSB} alt="logo_ventisoft" />
                    </div>
            </div>
        </div>
        )

}

export default LogoSidebar;
