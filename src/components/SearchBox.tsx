import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="searchBox">
      <input
        className="searchBox__input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca tu producto..."
        aria-label="Buscar producto"
      />
      <button type="submit" className="searchBox__button">
        <SearchIcon sx={{ height: "100%" }} />
      </button>
    </form>
  );
};

export default SearchBox;
