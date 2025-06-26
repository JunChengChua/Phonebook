import React from 'react';
import { Outlet } from "react-router-dom";
import Box from './Box';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    interface Row {                                         //State to store the fetched data
        username: string; 
        name: string; 
        title: string;
        department: string;
        phoneNumber: string;
        mail: string;
    }
    
    const [data, setData] = useState<Row[]>([]);
    const [selectedBox, setSelectedBox] = useState<Row | null>(null); //State to manage the selected box
    const [searchInput, setSearchInput] = useState<string>(''); //State to manage the search input
    const [searched, setSearched] = useState<boolean>(false); //State to manage the searched data
    const [infoSelected, setInfoSelected] = useState<boolean>(false); //State to manage the selected info
    const [isHoveringEmptySpace, setIsHoveringEmptySpace] = useState(false); //State to manage the hover state of the empty space

    const handleSearch = () => {
        axios                                           //Axios call: Sends an HTTP GET request to our Node.js API endpoint
            .get(`http://localhost:5000/api/data?search=${encodeURIComponent(searchInput)}`)
            .then((response) => {
                console.log("Data returned from server:", response.data); //Log the data to the console
                setData(response.data);                 //On success, store the returned JSON data in state
                setSearched(true);                      //Update loading state
            })
            .catch((err) => {
                console.error(err);
            });
    };

    //We return the HTML/jsx but the actual JavaScript logic is above.
    return (
        //The Root container
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#dadadaa7] from-35% to-[#9eddfc] w-full 
                        bg-auto relative"> 
            {/* Header Section */}
            <div className="grid grid-cols-3 items-center h-[13%] m-4 mb-2.5 rounded-md bg-[#ffffff55] shadow-lg"> 
                {/* Logo & Name */}
                <div className="flex flex-row gap-[0.5vw] px-[1vw] py-4 flex-shrink-0 cursor-pointer" 
                    onClick={() => window.location.reload()}
                >
                    <img className="h-[2.5em]" src="images/TBHC Logo.png" alt="Logo"/>
                    
                    {/*TBHC Text*/}
                    <div>
                        <h1 className="font-bold text-[1em] mb-[-0.3em]">The Brooklyn</h1>
                        <h1 className="font-bold text-[1em] mt-[-0.3em]">Hospital Center</h1>
                    </div>
                </div>
                
                {/* Extra Div To Center The Elements ("Phonebook" will go here upon a search)*/}
                <div className="text-center">
                    {searched && (
                        <h1 className="font-bold text-[3em]">TBHC Directory</h1> // Display "Phonebook" only after a search
                    )}
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
                        
                        <button className={`text-black cursor-pointer h-full w-40 font-bold text-[1em] transition-all duration-300 
                                            ease-in-out hover:bg-[#a4defc] ${isHoveringEmptySpace ? '' : 'group-hover:w-30 hover:w-50'}
                                            `}
                        >
                            Departments
                        </button>
                    </div>

                    {/* Favorites Button */}
                    <div className="relative flex items-center h-full">
                        {/* Custom Border 2*/}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[70%] w-[1.65px] bg-[#d3d3d3]"></div>

                        <button className={`text-black cursor-pointer h-full w-40 font-bold text-[1em] transition-all duration-300 
                                            ease-in-out hover:bg-[#a4defc] ${isHoveringEmptySpace ? '' : 'group-hover:w-30 hover:w-50'}
                                            `}
                        >
                            Favorites
                        </button>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className={`flex flex-grow h-[87%] m-4 mt-2.5 rounded-md ${ !infoSelected ? 'bg-[#ffffff55] shadow-lg' : '' } h-full`}>
                {!searched && !infoSelected && (
                    //Search Function
                    <div className="flex flex-col flex-grow items-center justify-center">
                        {/* Word "Phonebook" */}
                        <h1 className="absolute top-[39%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-[5em]">
                            TBHC Directory
                        </h1>
                        
                        
                        {/*Search Bar*/}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 text-center">
                            <input 
                                className="px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 
                                        focus:ring-[#a4defc] focus:border-transparent w-full" 
                                type="text" 
                                placeholder="Enter partial or full name..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)} //Update the search input state on change
                                onKeyDown={(e) => { //Handle the Enter key press
                                    if (e.key === 'Enter' && searchInput.trim() !== "") {
                                        setSearched(true); //Set searched state to true
                                        handleSearch(); //Call the search function
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}
                
                {searched && !infoSelected && (
                    //Search Function & Results
                    <div className="flex flex-col flex-grow items-center h-full">
                        {/*Search Bar*/}
                        <div className="mt-10 w-2/3 text-center">
                            <input 
                                className="px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 
                                        focus:ring-[#a4defc] focus:border-transparent w-full" 
                                type="text" 
                                placeholder="Enter partial or full name..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)} //Update the search input state on change
                                onKeyDown={(e) => { //Handle the Enter key press
                                    if (e.key === 'Enter' && searchInput.trim() !== "") {
                                        setSearched(true); //Set searched state to true
                                        handleSearch(); //Call the search function
                                    }
                                }}
                            />
                        </div>

                        {/*Container for Results*/}
                        <div className="flex justify-center w-full pl-4 pr-4 flex-grow overflow-hidden">
                            <div className="grid grid-cols-4 auto-rows-[126px] gap-4 mt-10 w-full h-full overflow-y-auto" id='resultsCard'>
                                {data.map((row, index) => ( //Map through the data and create a Box for each entry
                                    <Box 
                                        key={index} 
                                        username={row.username} 
                                        name={row.name} 
                                        title={row.title} 
                                        department={row.department} 
                                        phoneNumber={row.phoneNumber} 
                                        mail={row.mail} 
                                        onClick={() => {
                                            setSelectedBox(row); //Set the selected box on click
                                            setInfoSelected(true); //Set info selected state to true
                                        }} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {searched && infoSelected && (
                    //Fake Body
                    <div className="flex flex-row justify-around w-full h-full gap-3">
                        {/*Search Functionality*/}
                        <div className="w-[50%] h-[100%] bg-[#ffffff55] shadow-lg rounded-md">
                            {/* Search Function & Results */}
                            <div className="flex flex-col flex-grow items-center">
                                {/*Search Bar*/}
                                <div className="mt-10 w-2/3 text-center">
                                    <input 
                                        className="px-4 py-2 border-2 border-black rounded-xl focus:outline-none focus:ring-2 
                                                focus:ring-[#a4defc] focus:border-transparent w-full" 
                                        type="text" 
                                        placeholder="Enter partial or full name..."
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)} //Update the search input state on change
                                        onKeyDown={(e) => { //Handle the Enter key press
                                            if (e.key === 'Enter' && searchInput.trim() !== "") {
                                                setSearched(true); //Set searched state to true
                                                handleSearch(); //Call the search function
                                            }
                                        }}
                                    />
                                </div>

                                {/*Container for Results*/}
                                <div className="flex justify-center w-full pl-4 pr-4 flex-grow min-h-0">
                                    <div className="grid grid-cols-2 auto-rows-[126px] gap-4 mt-10 w-full max-h-[65vh] overflow-y-auto">
                                        {data.map((row, index) => ( //Map through the data and create a Box for each entry
                                            <Box 
                                                key={index} 
                                                username={row.username} 
                                                name={row.name} 
                                                title={row.title} 
                                                department={row.department} 
                                                phoneNumber={row.phoneNumber} 
                                                mail={row.mail} 
                                                onClick={() => {
                                                    setSelectedBox(row) //Set the selected box on click
                                                    setInfoSelected(true); //Set info selected state to true
                                                }} 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Details*/}
                        <div className="w-[50%] h-[100%] bg-[#ffffff55] shadow-lg rounded-md">

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

/*#bbe3f7 Original Color Value*/

/*Gradient Stuff for Root Background: bg-gradient-to-b from-[#FFFEFF] from-5% to-[#bbe3f7] */
/*Color for buttons in header: #6af1fb */