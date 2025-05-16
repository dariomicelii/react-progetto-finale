import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRecordForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [genre_id, setGenreId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Recupera i generi
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/genres")
      .then((response) => setGenres(response.data.data))
      .catch((err) => setError("Errore nel recupero dei generi"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/records", {
        title,
        artist,
        year: parseInt(year),
        genre_id: parseInt(genre_id),
      })
      .then((response) => {
        alert("Disco creato con successo!");
        navigate("/"); // reindirizza alla homepage
      })
      .catch((error) => {
        console.error(error);
        alert("Errore nella creazione del disco.");
      });
  };

  return (
    <div className="container mt-5">
      <h1>Aggiungi un nuovo disco</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titolo
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Artista
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Anno
          </label>
          <input
            type="number"
            id="year"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genere
          </label>
          <select
            id="genre"
            className="form-control"
            value={genre_id}
            onChange={(e) => setGenreId(e.target.value)}
            required
          >
            <option value="">Seleziona un genere</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Caricamento..." : "Aggiungi Disco"}
        </button>
      </form>
    </div>
  );
}

export default AddRecordForm;
