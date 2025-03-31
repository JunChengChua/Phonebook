import React from 'react';
import { Outlet } from "react-router-dom";
import Box from './Box';

function App() {
    return (
        <div className="flex flex-col items-center bg-gradient-to-r from-[#30cfd0] to-[#330867]">
            <h1 className="font-bold text-4xl">Hello World</h1> 
        </div>
    )
}

export default App;