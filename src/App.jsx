import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Velas from "./pages/Velas.jsx";
import Banhos from "./pages/Banhos.jsx";
import Oleos from "./pages/Oleos.jsx";
import Chas from "./pages/Chas.jsx";
import Patuas from "./pages/Patuas.jsx";
import Kits from "./pages/Kits";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/velas" element={<Velas />} />
        <Route path="/banhos" element={<Banhos />} />
        <Route path="/oleos" element={<Oleos />} />
        <Route path="/chas" element={<Chas />} />
        <Route path="/patuas" element={<Patuas />} />
        <Route path="/kits" element={<Kits />} />
      </Routes>
    </BrowserRouter>
  );
}