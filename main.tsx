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
                element: <Box />
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