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
    const [loading, setLoading] = useState<boolean>(true);  //State to handle loading status
    const [error, setError] = useState<Error | null>(null); //State to capture errors if any arise during fetch

    useEffect(() => {                                       //"useEffect" hook to run once when the component mounts
        axios                                               //Axios call: Sends an HTTP GET request to our Node.js API endpoint
        .get("http://localhost:5000/api/data")
        .then((response) => {
            setData(response.data);                         //On success, store the returned JSON data in state
            setLoading(false);                              //Update loading state
        })
        .catch((err) => {                                   //If there's an error, capture and store it
            setError(err);
            setLoading(false);
        });
    }, []);                                                 //Empty dependency array means this runs once on mount

    if (loading) {                                          //While the data is loading, display a simple message
        return <div>Loading...</div>;
    }

    if (error) {                                            //Display an error message if the fetch failed
        return <div>Error: {error.message}</div>;
    }

    //We return the HTML/jsx but the actual JavaScript logic is above.
    return (
        <div className="flex flex-col bg-gradient-to-b from-[#FFFEFF] from-5% to-[#6ad4fb] min-h-screen w-full bg-auto"> 
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
            <div className="flex flex-grow w-screen">
                {/* Filters */}
                <div className="flex-1/6 bg-gray-200/40 rounded-2xl ml-2 mb-2 flex justify-center font-bold text-[1.5vw] underline"> 
                    Filter
                </div>
                
                {/* Main Table */}
                <div className="flex-4/6 bg-gray-200/40 rounded-2xl ml-2 mr-2 mb-2">
                    <table className="table-auto border-collapse border border-gray-400 w-full">
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.username}>
                                    <td className="border border-gray-400 px-4 py-2">{item.username}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                                    <td className="border border-gray-400 px-4 py-2">{item.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Collapsable Information Secton */}
                <div className="flex-1/6 bg-gray-200/40 rounded-2xl mr-2 mb-2 flex justify-center font-bold text-[1.5vw] underline">
                    Info Section
                </div>
            </div>
        </div>
    );
}

export default App;

/*6ad4fb Original Color Value*/