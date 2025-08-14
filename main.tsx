import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.tsx';
import Results from './src/Results.tsx';
import Favorites from './src/Favorites.tsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './styles/indexStyle.css';
import { SearchProvider } from './src/SearchContext.tsx';
import Information from './src/Information.tsx';

//Creates/Defines the Router
let router = createBrowserRouter ([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/results",
        element: <Results />
    },
    {
        path: "/information",
        element: <Information />
    },
    {
        path: "/favorites",
        element: <Favorites />
    },
]);


//Renders the ROUTING SYSTEM to the DOM, which by default renders App.tsx
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SearchProvider>
            <RouterProvider router={router}/>
        </SearchProvider>
    </React.StrictMode>
);

//Functions to code ------------------------------------------------------------
// - Keep selected user highlighted
// - Add a search button next to the search bar
// - Decide on a design for displaying the information
// - Fix up Departments & Favorites Buttons