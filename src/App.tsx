import React from 'react';
import { Outlet } from "react-router-dom";

function App(){
    return (
        <div>
            <header>App</header>
            <p>test</p>
            <Outlet />
        </div>
    )
}

export default App;