import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import UploadMeal from "./pages/UploadMeal";
import Progress from "./pages/Progress";

function App() {
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<UploadMeal />} />
                <Route path="/progress" element={<Progress />} />
            </Routes>
        </div>
    );
}

export default App;