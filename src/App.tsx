import React from 'react';
import { Outlet } from "react-router-dom";
import Box from './Box';

function App() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default App;