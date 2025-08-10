import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from './Box';
import Header from './Header';
import { useSearch } from './SearchContext';

function Results() {
    const { data, setData, setSelectedBox, setSelectedIndex } = useSearch();
    const [searchInput, setSearchInput] = useState<string>(''); //State to manage the search input
    
    const navigate = useNavigate();
    const location = useLocation();

    const updateURLParams = (params: Record<string, string | number | undefined>) => {
        const searchParams = new URLSearchParams(location.search);
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                searchParams.set(key, String(value));
            } else {
                searchParams.delete(key);
            }
        });
        navigate({ pathname: "/results", search: searchParams.toString() });
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get("search") || "";
        if (search) {
            setSearchInput(search);
            axios
                .get(`http://localhost:5000/api/data?search=${encodeURIComponent(search)}`)
                .then((response) => setData(response.data))
                .catch((err) => console.error(err));
        }
    }, [location.search]);

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

    return (
        //The root contianer
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#dadadaa7] from-35% to-[#9eddfc] w-full 
                        bg-auto relative">
            {/* Header Section */}
            <Header />

            {/* Body */}
            <div className={"flex flex-grow h-[87%] m-4 mt-2.5 rounded-md bg-[#ffffff65] shadow-lg"}>
                {/* Search Function & Results */}
                <div className="flex flex-col flex-grow items-center h-full">
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
                        <div className="grid grid-cols-4 auto-rows-[128px] gap-4 mt-9 w-full max-h-[65vh] overflow-y-auto pl-1 pr-1 pb-1.5 pt-1">
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
                                        onClick={() => {
                                            setSelectedBox(row); //Set the selected box on click
                                            setSelectedIndex(index); //Set the selected index
                                            navigate(
                                                `/information?search=${encodeURIComponent(searchInput)}&selected=${index}`
                                            );
                                        }} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Results;