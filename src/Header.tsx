import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from './SearchContext';
import axios from 'axios';

interface HeaderProps {
    showDirectoryTitle?: boolean; // optional prop, defaults to true
}

const Header: React.FC<HeaderProps> = ({ showDirectoryTitle = true }) => {
    const [isHoveringEmptySpace, setIsHoveringEmptySpace] = useState(false); //State to manage the hover state of the empty space
    const [isHoveringFavorites, setIsHoveringFavorites] = useState(false);
    const [isHoveringDepartments, setIsHoveringDepartments] = useState(false);
    const { setSelectedIndex, setSelectedBox } = useSearch(); 

    const navigate = useNavigate();
    const location = useLocation();

    const [departments, setDepartments] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";

    // Favorites button
    const favoritesWidth = showDropdown
        ? "w-30"                     // dropdown open → shrink
        : isHoveringFavorites
        ? "w-50"                     // hovered → grow
        : isHoveringDepartments
        ? "w-30"                     // other button hovered → shrink
        : "w-40";                    // default

    const favoritesTextSize = showDropdown
        ? "text-base"                // dropdown open → small
        : isHoveringFavorites
        ? "text-lg"                  // hovered → large
        : isHoveringDepartments
        ? "text-base"                // other button hovered → small
        : "text-lg";                 // default

    // Departments button
    const departmentsWidth = showDropdown
        ? "w-50"                     // dropdown open → expanded
        : isHoveringDepartments
        ? "w-50"                     // hovered → grow
        : isHoveringFavorites
        ? "w-30"                     // other button hovered → shrink
        : "w-40";                    // default

    const departmentsTextSize = showDropdown
        ? "text-lg"                  // dropdown open → stay large
        : isHoveringDepartments
        ? "text-lg"                  // hovered → large
        : isHoveringFavorites
        ? "text-base"                // other button hovered → shrink
        : "text-lg";                 // default

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
                setIsHoveringDepartments(false);
                setIsHoveringFavorites(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/departments")
            .then(res => setDepartments(res.data))
            .catch(err => console.error("Error fetching departments:", err));
    }, []);

    const goToFavorites = () => {
        setSelectedIndex(null);
        setSelectedBox(null);
        navigate(`/favorites?search=${encodeURIComponent(search)}`);
    };

    return (
        <div className="grid grid-cols-3 items-center h-[10%] m-4 mb-2.5 rounded-md bg-[#ffffff55] shadow-lg"> 
            {/* Logo & Name */}
            <Logo />
            
            {/* Extra Div To Center The Elements*/}
            <div className="text-center">
                {showDirectoryTitle && (
                    <h1 className="font-bold text-[2.75em]">TBHC Directory</h1>
                )}
            </div>

            <div className="flex flex-row justify-end h-full group">
                {/* Empty Space Control */}
                <div className="flex-grow" 
                    onMouseEnter={() => setIsHoveringEmptySpace(true)} 
                    onMouseLeave={() => setIsHoveringEmptySpace(false)}>
                </div>

                {/* Favorites Button */}
                <div className="relative flex items-center h-full">
                    {/* Custom Border 2*/}
                    <div 
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[70%] w-[1.15px] bg-[#d3d3d3]"
                        onMouseEnter={() => setIsHoveringEmptySpace(true)}
                        onMouseLeave={() => setIsHoveringEmptySpace(false)}
                    >
                    </div>
                    
                    <button 
                        className={`text-black cursor-pointer h-full font-bold transition-all duration-300 
                                    ease-in-out hover:bg-[#a4defc] ${favoritesWidth} ${favoritesTextSize}
                                    ${isHoveringDepartments ? 'text-base' : 'text-lg'}
                                    ${showDropdown || isHoveringEmptySpace ? '' : 'hover:w-50'}`}
                        onMouseEnter={() => !showDropdown && setIsHoveringFavorites(true)}
                        onMouseLeave={() => !showDropdown && setIsHoveringFavorites(false)}
                        onClick={goToFavorites}
                    >
                        Favorites
                    </button>
                </div>

                {/* Departments Button */}
                <div className="relative flex items-center h-full" ref={dropdownRef}>
                    {/* Custom Border 1 */}
                    <div
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[70%] w-[1.65px] bg-[#d3d3d3]">
                    </div>

                    <button
                        className={`text-black cursor-pointer h-full font-bold transition-all duration-300 
                                    ease-in-out hover:bg-[#a4defc] ${departmentsWidth} ${departmentsTextSize}
                                    ${isHoveringFavorites ? 'text-base' : 'text-lg'}
                                    ${showDropdown || isHoveringEmptySpace ? '' : 'hover:w-50'}`}
                        onMouseEnter={() => !showDropdown && setIsHoveringDepartments(true)}
                        onMouseLeave={() => !showDropdown && setIsHoveringDepartments(false)}
                        onClick={() => setShowDropdown((prev) => !prev)}
                    >
                        Departments
                    </button>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div
                            className="absolute right-0 top-full mt-1 bg-[#ffffff] border border-gray-300 rounded shadow-lg z-50 w-56 max-h-60 overflow-y-auto"
                        >
                            {departments.map((dept, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2 hover:bg-[#a4defc] cursor-pointer"
                                    onClick={() => {
                                        setSelectedBox(null);
                                        setSelectedIndex(null);
                                        setShowDropdown(false);
                                        navigate(`/results?search=&department=${encodeURIComponent(dept)}`);
                                    }}
                                >
                                    {dept}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;