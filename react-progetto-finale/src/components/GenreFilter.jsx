import React from "react";

function GenreFilter({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <select
      className="form-select mb-4 rounded-5"
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
    >
      <option value="">Tutti i generi</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.name}>
          {genre.name}
        </option>
      ))}
    </select>
  );
}
export default GenreFilter;
