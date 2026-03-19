import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./pages/App";
import PropertiesPage from "./pages/PropertiesPage";
import BookingPage from "./pages/BookingPage";
import AvailabilityPage from "./pages/AvailabilityPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "properties",
                element: <PropertiesPage />,
            },
            {
                path: "bookings",
                element: <BookingPage />,
            },
            {
                path: "availability",
                element: <AvailabilityPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);