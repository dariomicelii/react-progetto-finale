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
  const [coverImage, setCoverImage] = useState(null);

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
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("year", parseInt(year));
    formData.append("genre_id", parseInt(genre_id));
    if (coverImage) {
      formData.append("cover_image", coverImage); // 👈 campo immagine
    }

    axios
      .post("http://127.0.0.1:8000/api/records", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Disco creato con successo!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Errore nella creazione del disco.");
      })
      .finally(() => {
        setLoading(false);
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
          <label htmlFor="artist" className="form-label">
            Artista
          </label>
          <input
            type="text"
            id="artist"
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

        <div className="mb-3">
          <label htmlFor="coverImage" className="form-label">
            Immagine di copertina
          </label>
          <input
            type="file"
            id="coverImage"
            className="form-control"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Caricamento..." : "Aggiungi Disco"}
        </button>
      </form>
    </div>
  );
}

export default AddRecordForm;
