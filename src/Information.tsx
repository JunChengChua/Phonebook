import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from './Box';
import Header from './Header';
import { useSearch } from './SearchContext';

function Information() {
    const { data, setData, selectedBox, selectedIndex, setSelectedBox, setSelectedIndex } = useSearch();
    const [searchInput, setSearchInput] = useState<string>(''); //State to manage the search input
    const [infoSelected, setInfoSelected] = useState<boolean>(false); //State to manage the selected info
    const [isFavorite, setIsFavorite] = useState(false); //For the favorite star button

    const navigate = useNavigate();

    const handleSearch = () => {
        axios                                           //Axios call: Sends an HTTP GET request to our Node.js API endpoint
            .get(`http://localhost:5000/api/data?search=${encodeURIComponent(searchInput)}`)
            .then((response) => {
                setData(response.data);                 //On success, store the returned JSON data in state                      //Update loading state
                navigate("/results");
            })
            .catch((err) => {
                console.error(err);
            });
    };
    
    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#dadadaa7] from-35% to-[#9eddfc] w-full 
                        bg-auto relative">
            {/* Header Section */}
            <Header />

            {/* Body */}
            <div className={"flex flex-grow h-[87%] m-4 mt-2.5 rounded-md"}>
                <div className="flex flex-row justify-around w-full h-full gap-3">
                    {/*Search Functionality*/}
                    <div className="w-[50%] h-[100%] bg-[#ffffff55] shadow-lg rounded-md">
                        {/* Search Function & Results */}
                        <div className="flex flex-col flex-grow items-center">
                            {/*Search Bar*/}
                            <div className="flex flex-row mt-10 w-2/3 text-center">
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
                                    className="ml-2 p-2 bg-[#bdbdbd] hover:bg-[#a4defc] transition border-2 border-black rounded-xl w-1/10
                                                hover:cursor-pointer flex items-center justify-center"
                                    onClick={() => {
                                        handleSearch();
                                    }}
                                    aria-label="Search"
                                >
                                    <span className="material-symbols-outlined text-[2rem]">search</span>
                                </button>
                            </div>

                            {/*Container for Results*/}
                            <div className="flex justify-center w-full pl-4 pr-4 flex-grow min-h-0">
                                <div className="grid grid-cols-2 auto-rows-[128px] gap-4 mt-10 w-full max-h-[65vh] overflow-y-auto pl-1 pr-1 pb-1.5">
                                    {data.map((row, index) => ( //Map through the data and create a Box for each entry
                                        <div key={index} className="shadow-md bg-transparent rounded-lg"> {/* Shadow on the grid cell */}
                                            <Box 
                                                username={row.username}
                                                name={row.name}
                                                title={row.title}
                                                department={row.department}
                                                phoneNumber={row.phoneNumber}
                                                mail={row.mail}
                                                onClick={() => {
                                                    setSelectedBox(row);
                                                    setSelectedIndex(index);
                                                    setInfoSelected(true);
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="w-[50%] h-[100%] bg-[#ffffff55] shadow-lg rounded-md">
                        {/* Button Container */}
                        <div className="flex flex-row justify-between pt-4 pl-4 pr-4 items-center">
                            {/* Navigation Buttons */}
                            <div className="flex flex-row w-[85%] gap-2">
                                {/* Previous Button */}
                                <button
                                    type="button"
                                    className="p-2 flex items-center justify-center rounded-xl bg-[#bdbdbd] hover:bg-[#a4defc] transition
                                        hover:cursor-pointer border-2 border-black group w-[50%]"
                                    aria-label="Previous"
                                    onClick={() => {
                                        if (
                                            selectedIndex !== null &&
                                            selectedIndex > 0
                                        ) {
                                            setSelectedIndex(selectedIndex - 1);
                                            setSelectedBox(data[selectedIndex - 1]);
                                        }
                                    }}
                                    disabled={selectedIndex === null || selectedIndex <= 0}
                                >
                                    <span className="material-symbols-outlined text-[2rem]">arrow_back_ios_new</span>
                                </button>
                                
                                {/* Next Button */}
                                <button
                                    type="button"
                                    className="p-2 flex items-center justify-center rounded-xl bg-[#bdbdbd] hover:bg-[#a4defc] transition
                                            hover:cursor-pointer border-2 border-black group w-[50%]"
                                    aria-label="Next"
                                    onClick={() => {
                                        if (
                                            selectedIndex !== null &&
                                            selectedIndex < data.length - 1
                                        ) {
                                            setSelectedIndex(selectedIndex + 1);
                                            setSelectedBox(data[selectedIndex + 1]);
                                        }
                                    }}
                                    disabled={selectedIndex === null || selectedIndex >= data.length - 1}
                                >
                                    <span className="material-symbols-outlined text-[2rem]">arrow_forward_ios</span>
                                </button>
                            </div>
                            
                            {/* Miscellaneous Buttons */}
                            <div className="flex flex-row w-[15%] justify-end gap-3.5">
                                {/* Favorite Button */}
                                <button
                                    type="button"
                                    className="p-2 flex items-center justify-center rounded-[100%] bg-[#bdbdbd] hover:bg-[#a4defc] transition
                                            hover:cursor-pointer border-2 border-black group"
                                    aria-label="Favorite"
                                    onClick={() => {
                                        setIsFavorite(!isFavorite);
                                    }}
                                >
                                    <span
                                        className="material-symbols-outlined text-[2rem] text-black group-hover:text-black rounded-[100%]"
                                        style={{
                                            fontVariationSettings: `'FILL' ${isFavorite ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
                                        }}
                                    >
                                        star
                                    </span>
                                </button>
                                
                                {/* Close Button */}
                                <button
                                    type="button"
                                    className="p-2 flex items-center justify-center rounded-[100%] bg-[#bdbdbd] hover:bg-[#a4defc] transition
                                            hover:cursor-pointer border-2 border-black group"
                                    aria-label="Close"
                                    onClick={() => {
                                        setInfoSelected(false);
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[2rem] transition-transform duration-500 group-hover:rotate-[270deg]">close</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Primary Info Container */}
                        <div className="grid grid-cols-5 justify-center p-4 gap-x-4 h-[50%]">
                            {/* Image */}
                            <div className="flex items-center justify-center h-full col-span-2">
                                <img
                                    src="images/Silhouette.jpg"
                                    alt="Profile"
                                    className="h-full w-auto object-cover rounded-2xl shadow-md"
                                />
                            </div>

                            {/* Primary Information */}
                            <div className="col-span-3 grid grid-rows-4 w-full gap-2">
                                {/* Name */}
                                <div className="flex justify-center items-center text-center w-full font-bold text-[2.25em]
                                                bg-[#f9fafb86] shadow-md rounded-lg row-span-2"
                                >
                                    {selectedBox?.name}
                                </div>

                                {/* Department */}
                                <div className="flex items-center justify-center text-center w-full text-[1.5em] font-bold
                                                bg-[#f9fafb86] shadow-md rounded-lg row-span-1">
                                    {selectedBox?.title}
                                </div>

                                {/* Title */}
                                <div className="flex items-center justify-center text-center w-full text-[1.5em] font-bold
                                                bg-[#f9fafb86] shadow-md rounded-lg row-span-1">
                                    {selectedBox?.department}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;