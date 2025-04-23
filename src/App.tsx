import React from 'react';
import { Outlet } from "react-router-dom";
import Box from './Box';

function App() {
    return (
        <div className="flex flex-col bg-gradient-to-b from-[#FFFEFF] from-35% to-[#6ad4fb] min-h-screen w-full bg-auto"> 
            {/* Header Section */}
            <div className="grid grid-cols-3 items-center"> 
                {/* Logo & Name */}
                <div className="flex flex-row gap-[0.5vw] px-[1vw] py-4 items-center">
                    <img className="h-[4vw]" src="images/TBHC Logo.png" alt="Logo"/>
                    <h1 className="font-bold text-[3vw]">Phonebook</h1>
                </div>
                
                {/* Search Bar */}
                <div className="flex flex-row gap-[1vh]">
                    <input 
                        className="px-4 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6af1fb] 
                                  focus:border-transparent w-[25vw]" 
                        type="text" 
                        placeholder="Enter partial or full name..."
                    />
                    <button className="bg-[#2a2d2d] text-white px-4 py-2 rounded-lg hover:bg-[#6af1fb] hover:text-black transition">
                        Search
                    </button>
                </div>
                
                {/* Extra Div To Center The Elements */}
                <div> 
                </div>
            </div>
            
            {/* Body */}
            <div className="flex w-screen">
                {/* Filters */}
                <div className="flex-1/6">
                    Filter
                </div>
                
                {/* Main Table */}
                <div className="flex-4/6">
                    Main Table
                </div>
                
                {/* Collapsable Information Secton */}
                <div className="flex-1/6">
                    Info Section
                </div>
            </div>
        </div>
    );
}

export default App;

/*6ad4fb Original Value*/