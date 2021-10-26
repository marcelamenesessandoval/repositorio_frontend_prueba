
import PrivateRoute from 'components/privateRoute';
import Sidebar from 'components/Sidebar';
import React from 'react'


const PrivateLayout = ({children}) => {
    
<PrivateRoute>

</PrivateRoute>

const BodySidebar = {
    display: 'flex',
    width: '100%',
    hight:"100%",
 };

 const MainSidebar = {
    display: 'flex',
    width: '100%',
    hight: '100vh',
 };
    
 return (
    <div style= {BodySidebar}>
        <Sidebar />
        <main style= {MainSidebar}>{children}</main> 
    </div>
    );
     
     
    
};

export default PrivateLayout;
