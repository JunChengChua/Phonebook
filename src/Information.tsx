import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Box from './Box';
import Header from './Header';
import { useSearch } from './SearchContext';
import Cookies from "js-cookie";

function Information() {
    const { data, setData, selectedBox, selectedIndex, setSelectedBox, setSelectedIndex } = useSearch();
    const [searchInput, setSearchInput] = useState<string>(''); //State to manage the search input
    const [isFavorite, setIsFavorite] = useState(false); //For the favorite star button
    const [showNavButtons, setShowNavButtons] = useState(false); //State to manage the visibility of navigation buttons
    const mouseTimeout = useRef<number | null>(null);
    
    const location = useLocation();
    const navigate = useNavigate();

    // Helper to update URL params
    const updateURLParams = (params: Record<string, string | number | undefined>) => {
        const searchParams = new URLSearchParams(location.search);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                searchParams.set(key, String(value));
            } else {
                searchParams.delete(key);
            }
        });
        navigate({ search: searchParams.toString() }, { replace: true });
    };

    const handleSearch = () => {
        axios                                           //Axios call: Sends an HTTP GET request to our Node.js API endpoint
            .get(`http://localhost:5000/api/data?search=${encodeURIComponent(searchInput)}`)
            .then((response) => {
                setData(response.data);                 //On success, store the returned JSON data in state                      //Update loading state
                updateURLParams({ search: searchInput });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    //When selecting a box, update the selected param
    const handleSelectBox = (row: any, index: number) => {
        setSelectedBox(row);
        setSelectedIndex(index);
        updateURLParams({ search: searchInput, selected: index });
    };

    //Handles the fading of the navigation buttons
    const handleMouseMove = () => {
        setShowNavButtons(true);
        if (mouseTimeout.current) clearTimeout(mouseTimeout.current);
        mouseTimeout.current = setTimeout(() => setShowNavButtons(false), 3000);
    };

    //Handles the mouse entering and leaving the details area
    useEffect(() => {
        const detailsDiv = document.getElementById('details-area');
        
        if (detailsDiv) {
            detailsDiv.addEventListener('mousemove', handleMouseMove);
        }
        
        return () => {
            if (detailsDiv) {
                detailsDiv.removeEventListener('mousemove', handleMouseMove);
            }
            if (mouseTimeout.current) clearTimeout(mouseTimeout.current);
        };
    }, []);

    //Fetch data based on search params when component mounts
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get("search") || "";
        const selected = searchParams.get("selected");

        if (search) {
            setSearchInput(search);
            axios
                .get(`http://localhost:5000/api/data?search=${encodeURIComponent(search)}`)
                .then((response) => {
                    setData(response.data);
                    if (selected && !isNaN(Number(selected))) {
                        const idx = Number(selected);
                        setSelectedIndex(idx);
                        setSelectedBox(response.data[idx]);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [location.search]);

    //This is for the favorite star button
    useEffect(() => {
        if (selectedBox?.username) {
            const favorites = JSON.parse(Cookies.get("favorites") || "[]") as string[];
            console.log("Favorites cookie:", favorites);
            setIsFavorite(favorites.includes(selectedBox.username));
        }
    }, [selectedBox]);

    const toggleFavorite = () => {
        const username = selectedBox?.username;
        if (!username) return;

        // Get current favorites from cookie or start with empty array
        let favorites: string[] = [];
        
        try {
            favorites = JSON.parse(Cookies.get("favorites") || "[]") as string[];
        } catch (err) {
            favorites = [];
        }

        if (favorites.includes(username)) {
            favorites = favorites.filter(fav => fav !== username); //Remove from favorites
            setIsFavorite(false); //Update the favorite state
        } else {
            favorites.push(username); //Add to favorites
            setIsFavorite(true); //Update the favorite state
        }

        Cookies.set("favorites", JSON.stringify(favorites), { expires: 365 });
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
                    <div className="w-[50%] h-[100%] bg-[#ffffff90] shadow-lg rounded-md">
                        {/* Search Function & Results */}
                        <div className="flex flex-col flex-grow items-center h-[100%]">
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
                                    className="ml-2 p-2 bg-[#dbdbdb] hover:bg-[#a4defc] transition rounded-xl w-1/10
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
                                <div className="grid grid-cols-2 auto-rows-[128px] gap-4 mt-9 w-full max-h-[67vh] overflow-y-auto pl-1 pr-1 pb-1.5 pt-1">
                                    {data.map((row, index) => ( //Map through the data and create a Box for each entry
                                        <div key={index} className="shadow-md bg-transparent rounded-lg">
                                            <Box 
                                                key={index} 
                                                username={row.username} 
                                                name={row.name} 
                                                title={row.title} 
                                                department={row.department} 
                                                phoneNumber={row.phoneNumber} 
                                                mail={row.mail}
                                                selected={selectedIndex === index} 
                                                onClick={() => {
                                                    setSelectedBox(row); //Set the selected box on click
                                                    setSelectedIndex(index); //Set the selected index
                                                    handleSelectBox(row, index);
                                                }} 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div id="details-area" className="w-[50%] h-[100%] bg-[#ffffff90] shadow-lg rounded-md flex flex-col">
                        {/* Button Container */}
                        <div className="flex-none flex flex-row justify-between pt-4 pl-4 pr-4 items-center">
                            {/* Miscellaneous Buttons */}
                            <div className="flex flex-row justify-end gap-3.5">
                                {/* Close Button */}
                                <button
                                    type="button"
                                    className="p-2 flex items-center justify-center rounded-[100%] bg-[#dbdbdb] hover:bg-[#a4defc] transition
                                            hover:cursor-pointer group"
                                    aria-label="Close"
                                    onClick={() => {
                                        setSelectedBox(null);
                                        setSelectedIndex(null);
                                        const searchParams = new URLSearchParams(location.search);
                                        const search = searchParams.get("search") || "";
                                        navigate(`/results${search ? `?search=${encodeURIComponent(search)}` : ""}`);
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[2rem] transition-transform duration-500 group-hover:rotate-[270deg]">close</span>
                                </button>
                                
                                {/* Favorite Button */}
                                <button
                                    type="button"
                                    className="p-2 flex items-center justify-center rounded-[100%] bg-[#dbdbdb] hover:bg-[#a4defc] transition
                                            hover:cursor-pointer group"
                                    aria-label="Favorite"
                                    onClick={toggleFavorite}
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
                            </div>
                        </div>
                        
                        {/* Primary Info Container */}
                        <div className="grid grid-cols-5 justify-center p-4 gap-x-4 h-[50%] flex-none">
                            {/* Image */}
                            <div className="flex items-center justify-center h-full col-span-2">
                                <img
                                    src="images/Silhouette.jpg"
                                    alt="Profile"
                                    className="h-full w-auto object-cover rounded-2xl shadow-md"
                                />
                            </div>

                            {/* Primary Information */}
                            <div className="col-span-3 grid grid-rows-3 w-full shadow-md rounded-lg">
                                {/* Name */}
                                <div className="flex justify-center items-center text-center w-full font-bold text-[2.15em]
                                                bg-[#f9fafb86] rounded-lg row-span-1"
                                >
                                    {selectedBox?.title === "Doctor" ? `Dr. ${selectedBox?.name}` : selectedBox?.name}
                                </div>

                                {/* Department */}
                                <div className="flex items-center justify-center text-center w-full text-[1.5em] font-bold
                                                bg-[#f9fafb86] rounded-lg row-span-1">
                                    {selectedBox?.title}
                                </div>

                                {/* Title */}
                                <div className="flex items-center justify-center text-center w-full text-[1.5em] font-bold
                                                bg-[#f9fafb86] rounded-lg row-span-1">
                                    {selectedBox?.department}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-rows-2 gap-4 pr-4 pl-4 h-[25%] flex-none">
                            {/* Mail */}
                            <div className="flex items-center justify-center text-center w-full text-[1.5em] font-bold
                                            bg-[#f9fafb86] shadow-md rounded-lg">
                                {selectedBox?.mail}
                            </div>

                            {/* Phone Number */}
                            <div className="flex items-center justify-center text-center w-full text-[1.5em] font-bold
                                            bg-[#f9fafb86] shadow-md rounded-lg">
                                {selectedBox?.phoneNumber}
                            </div>
                        </div>

                        {/* Circular Button Area */}
                        <div className={"flex-1 w-full flex flex-row justify-center items-center gap-20 z-20"}>
                            {/* Back Button */}
                            <button
                                type="button"
                                className={`p-6 rounded-full bg-[#dbdbdb] hover:bg-[#a4defc] flex items-center justify-center disabled:opacity-0 hover:cursor-pointer disabled:cursor-default 
                                            transition-opacity duration-1000 ${showNavButtons ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
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

                            {/* Page Indicator */}
                            {selectedIndex !== null && data.length > 0 && (
                                <span className="text-lg font-medium">
                                    {selectedIndex + 1} of {data.length}
                                </span>
                            )}

                            {/* Next Button */}
                            <button
                                type="button"
                                className={`p-6 rounded-full bg-[#dbdbdb] hover:bg-[#a4defc] flex items-center justify-center disabled:opacity-0 hover:cursor-pointer disabled:cursor-default 
                                            transition-opacity duration-1000 ${showNavButtons ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;