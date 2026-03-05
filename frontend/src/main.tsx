import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./pages/App";
import PropertiesPage from "./pages/PropertiesPage";
import BookingPage from "./pages/BookingPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Navigate to="/properties" replace />} />
                    <Route path="properties" element={<PropertiesPage />} />
                    <Route path="bookings" element={<BookingPage />} />
                    <Route path="availability" element={<AvailabilityPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);