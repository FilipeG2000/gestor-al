import { NavLink, Outlet } from "react-router-dom";

export default function App() {
    return (
        <div style={{ fontFamily: "system-ui", padding: 16, maxWidth: 1000, margin: "0 auto" }}>
            <h1>Gestor AL</h1>

            <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <NavLink to="/properties">Properties</NavLink>
                <NavLink to="/bookings">Bookings</NavLink>
                <NavLink to="/availability">Availability</NavLink>
            </nav>

            <Outlet />
        </div>
    );
}