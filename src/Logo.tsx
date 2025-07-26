import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row gap-[0.5vw] px-[1vw] py-4 flex-shrink-0 cursor-pointer" 
            onClick={() =>  
            {
                navigate("/"); //Navigate to the home page
            }}
        >
            <img className="h-[2.5em]" src="images/TBHC Logo.png" alt="Logo"/>
            
            {/*TBHC Text*/}
            <div>
                <h1 className="font-bold text-[1em] mb-[-0.3em]">The Brooklyn</h1>
                <h1 className="font-bold text-[1em] mt-[-0.3em]">Hospital Center</h1>
            </div>
        </div>
    );
};

export default Logo;