import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.tsx';
import Box from './src/Box.tsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom"

let router = createBrowserRouter ([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "app",
                element: <Box />
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
);