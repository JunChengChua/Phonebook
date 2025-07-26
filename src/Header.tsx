import React from 'react';
import { useState, useEffect } from 'react';
import Logo from './Logo';


const Header: React.FC = () => {
    const [isHoveringEmptySpace, setIsHoveringEmptySpace] = useState(false); //State to manage the hover state of the empty space
    const [searchInput, setSearchInput] = useState<string>(''); //State to manage the search input
    
    return (
        <div className="grid grid-cols-3 items-center h-[13%] m-4 mb-2.5 rounded-md bg-[#ffffff55] shadow-lg"> 
            {/* Logo & Name */}
            <Logo />
            
            {/* Extra Div To Center The Elements*/}
            <div className="text-center">
                <h1 className="font-bold text-[2.75em]">TBHC Directory</h1>
            </div>

            <div className="flex flex-row justify-end h-full group">
                {/* Empty Space Control */}
                <div className="flex-grow" 
                    onMouseEnter={() => setIsHoveringEmptySpace(true)} 
                    onMouseLeave={() => setIsHoveringEmptySpace(false)}>
                </div>

                {/* Departments Button */}
                <div className="relative flex items-center h-full">
                    {/* Custom Border 1*/}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[70%] w-[1.65px] bg-[#d3d3d3]" 
                        onMouseEnter={() => setIsHoveringEmptySpace(true)} 
                        onMouseLeave={() => setIsHoveringEmptySpace(false)}>
                    </div>
                    
                    <button className={`text-black cursor-pointer h-full w-40 font-bold text-[1.15em] transition-all duration-300 
                                        ease-in-out hover:bg-[#a4defc] ${isHoveringEmptySpace ? '' : 'group-hover:w-30 hover:w-50'}
                                        `}
                    >
                        Departments
                    </button>
                </div>

                {/* Favorites Button */}
                <div className="relative flex items-center h-full">
                    {/* Custom Border 2*/}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[70%] w-[1.15px] bg-[#d3d3d3]"></div>

                    <button className={`text-black cursor-pointer h-full w-40 font-bold text-[1.15em] transition-all duration-300 
                                        ease-in-out hover:bg-[#a4defc] ${isHoveringEmptySpace ? '' : 'group-hover:w-30 hover:w-50'}
                                        `}
                    >
                        Favorites
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;