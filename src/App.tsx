import React from 'react';
import { Outlet } from "react-router-dom";
import Box from './Box';

function App() {
    return (
        <div className="flex flex-col bg-gradient-to-b from-[#FFFEFF] from-35% to-[#6ad4fb] min-h-screen w-full bg-auto"> 
            <div className="flex flex-row items-center gap-[0.5vw] pl-[1vw]">
                <img className="h-[4vw]" src="images\TBHC Logo.png"/>
                <h1 className="flex font-bold text-[3vw]">
                    Phonebook
                </h1>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-[1vh]">
                <input className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6af1fb] 
                                  focus:border-transparent w-[25vw]" type="text" placeholder="Enter partial or full name..."/>
                <button className="bg-[#2a2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#6af1fb] hover:text-black transition">
                    Search
                </button>
            </div>
        </div>
    )
}

export default App;

/*6ad4fb Original Value*/