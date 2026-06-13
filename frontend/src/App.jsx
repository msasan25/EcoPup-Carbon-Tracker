import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ImpactModule from "./pages/modules/ImpactModule";
import MealModule from "./pages/modules/MealModule";
import TransportModule from "./pages/modules/TransportModule";
import ProgressModule from "./pages/modules/ProgressModule";

import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/impact" element={<ImpactModule />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/meal" element={<MealModule />} />
            <Route path="/transport" element={<TransportModule />} />
            <Route path="/progress" element={<ProgressModule />} />
        </Routes>
    );
}