import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResults";
import ProductDetail from "./components/ProductDetail";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchBox />} />
      <Route path="/items" element={<SearchResult />} />
      <Route path="/items/:id" element={<ProductDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;
