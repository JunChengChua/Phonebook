import React from 'react';
import { Outlet } from "react-router-dom";
import Box from './Box';

function App() {
    return (
        <div className="text-3xl font-bold underline">
            <Outlet />
        </div>
    )
}

export default App;