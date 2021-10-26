

import React from 'react'

const PublicLayout = ({children}) => {
    return (
    <div>
        <header></header>
        <main>{children}</main>
        <footer></footer>
    </div>
    );
};

export default PublicLayout;
