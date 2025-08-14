import React from 'react';
import { useNavigate } from "react-router-dom";
import Box from './Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearch } from './SearchContext';
import Header from './Header';

function App() {
    const { data, setData } = useSearch();
    const [searchInput, setSearchInput] = useState<string>(''); //State to manage the search input
    const [searched, setSearched] = useState<boolean>(false); //State to manage the searched data
    const [isHoveringEmptySpace, setIsHoveringEmptySpace] = useState(false); //State to manage the hover state of the empty space
    const [isHoveringFavorites, setIsHoveringFavorites] = useState(false);
    const [isHoveringDepartments, setIsHoveringDepartments] = useState(false);
    const [departments, setDepartments] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = () => {
        axios                                           //Axios call: Sends an HTTP GET request to our Node.js API endpoint
            .get(`http://localhost:5000/api/data?search=${encodeURIComponent(searchInput)}`)
            .then((response) => {
                setData(response.data);                 //On success, store the returned JSON data in state
                navigate(`/results?search=${encodeURIComponent(searchInput)}`);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const navigate = useNavigate();

    //We return the HTML/jsx but the actual JavaScript logic is above.
    return (
        //The Root container
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#dadadaa7] from-35% to-[#9eddfc] w-full 
                        bg-auto relative">
            {/* Header Section */} 
            <Header showDirectoryTitle={false} />

            {/* Body */}
            <div className={"flex flex-grow h-[87%] m-4 mt-2.5 rounded-md bg-[#ffffff65] shadow-lg"}>    
                <div className="flex flex-col flex-grow items-center justify-center">
                    {/* Word "Phonebook" */}
                    <h1 className="absolute top-[39%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-[5em]">
                        TBHC Directory
                    </h1>
                    
                    {/* Search Bar */}
                    <div className="flex flex-row absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                    w-2/3 text-center">
                        <input 
                            className="px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 
                                    focus:ring-[#a4defc] focus:border-transparent w-9/10" 
                            type="text" 
                            placeholder="Enter partial or full name..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)} //Update the search input state on change
                            onKeyDown={(e) => { //Handle the Enter key press
                                if (e.key === 'Enter' && searchInput.trim() !== "") {
                                    handleSearch(); //Call the search function
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="ml-2 p-2 bg-[#dbdbdb] hover:bg-[#a4defc] transition border-2 border-black rounded-xl w-1/10
                                        hover:cursor-pointer flex items-center justify-center"
                            onClick={() => {
                                handleSearch();
                            }}
                            aria-label="Search"
                        >
                            <span className="material-symbols-outlined text-[2rem]">search</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

/*#bbe3f7 Original Color Value*/

/*Gradient Stuff for Root Background: bg-gradient-to-b from-[#FFFEFF] from-5% to-[#bbe3f7] */
/*Color for buttons in header: #6af1fb */