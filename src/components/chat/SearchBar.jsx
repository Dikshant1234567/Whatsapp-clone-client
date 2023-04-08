import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ text, setText }) {
  return (
    <div className="searchBar">
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div>
        <SearchIcon fontSize="small" />
      </div>
    </div>
  );
}

export default SearchBar;
