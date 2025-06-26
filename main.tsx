import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.tsx';
import Box from './src/Box.tsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './styles/indexStyle.css';

//Creates/Defines the Router
let router = createBrowserRouter ([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Box username={''} name={''} title={''} department={''} phoneNumber={''} mail={''} onClick={function (): void {
                    throw new Error('Function not implemented.');
                } } />
            },
        ],
    },
]);


//Renders the ROUTING SYSTEM to the DOM, which by default renders App.tsx
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

//Functions to code ------------------------------------------------------------
// - Keep selected user highlighted
// - Add a search button next to the search bar
// - Decide on a design for displaying the information