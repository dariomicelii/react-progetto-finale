import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    year: "",
    genre_id: "",
  });

  useEffect(() => {
    // Recupera i dati del record
    axios.get(`http://127.0.0.1:8000/api/records/${id}`).then((res) => {
      setRecord(res.data.data);
      setFormData({
        title: res.data.data.title,
        year: res.data.data.year,
        genre_id: res.data.data.genre_id || "",
      });
    });

    // Recupera i generi
    axios.get("http://127.0.0.1:8000/api/genres").then((res) => {
      setGenres(res.data.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/records/${id}`, formData)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  if (!record) return <p className="text-center mt-5">Caricamento...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Modifica Disco</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Titolo</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Artista</label>
          <input
            type="text"
            name="artist"
            className="form-control"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Anno</label>
          <input
            type="number"
            name="year"
            className="form-control"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Genere</label>
          <select
            name="genre_id"
            className="form-control"
            value={formData.genre_id}
            onChange={handleChange}
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

        <button type="submit" className="btn btn-success">
          Salva modifiche
        </button>
      </form>
    </div>
  );
}

export default EditRecord;
