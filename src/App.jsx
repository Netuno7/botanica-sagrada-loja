import { BrowserRouter, Routes, Route } from "react-router-dom";
import LojaEsoterica from "./LojaEsoterica.jsx";
import Velas from "./Velas.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LojaEsoterica />} />
        <Route path="/velas" element={<Velas />} />
      </Routes>
    </BrowserRouter>
  );
}