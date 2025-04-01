import React from 'react';
import { Outlet } from "react-router-dom";
import Box from './Box';

function App() {
    return (
        <div className="flex flex-col bg-gradient-to-b from-[#FFFEFF] to-[#6ad4fb] min-h-screen w-full bg-auto"> 
            <div className="flex flex-row">
                <div>
                    <img src="images\TBHC Logo.jpg"/>
                </div>
                The Header
            </div>
            <div>
                The Search Bar and Button to Submit
            </div>
        </div>
    )
}

export default App;

/*
background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);
*/