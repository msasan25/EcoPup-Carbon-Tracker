import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <h3>Carbon Compass AI</h3>

            <div style={{ display: "flex", gap: "10px" }}>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/upload">Upload</Link>
                <Link to="/progress">Progress</Link>
            </div>
        </nav>
    );
}

export default Navbar;