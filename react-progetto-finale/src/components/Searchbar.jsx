import React, { useState } from "react";

function Searchbar({ onSearch }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (onSearch) {
      onSearch(value); // <-- chiama la funzione passata dal componente padre
    }
  };

  return (
    <input
      type="text"
      className="form-control mb-3 rounded-5"
      placeholder="Cerca per titolo, artista o genere..."
      value={search}
      onChange={handleChange}
    />
  );
}

export default Searchbar;
