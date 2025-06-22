import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";
import GenreFilter from "../components/GenreFilter";
import YearFilter from "../components/YearFilter";

function HomePage() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(""); // Stato filtro genere
  const [genres, setGenres] = useState([]); // Stato elenco generi
  const [selectedYear, setSelectedYear] = useState(""); // Stato filtro anno
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Carica i dischi
    axios
      .get("http://127.0.0.1:8000/api/records")
      .then((response) => {
        setRecords(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Errore nel recupero dei dischi");
        setLoading(false);
      });

    // Carica i generi per il filtro
    axios
      .get("http://127.0.0.1:8000/api/genres")
      .then((res) => setGenres(res.data.data))
      .catch(() => console.error("Errore nel recupero dei generi"));
  }, []);

  const years = Array.from(new Set(records.map((record) => record.year))).sort(
    (a, b) => b - a
  );

  const filteredRecords = records.filter((record) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      record.title.toLowerCase().includes(searchLower) ||
      record.artist.toLowerCase().includes(searchLower) ||
      (record.genre && record.genre.name.toLowerCase().includes(searchLower));

    const matchesGenre =
      !selectedGenre || (record.genre && record.genre.name === selectedGenre);

    const matchesYear = !selectedYear || String(record.year) === selectedYear;

    return matchesSearch && matchesGenre && matchesYear;
  });

  if (loading) return <p className="text-center mt-5">Caricamento...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">I Tuoi Dischi</h1>

      {/* Campo di ricerca */}
      <Searchbar onSearch={setSearch} />

      {/* Filtro per genere */}

      <div className="d-flex gap-3 mb-4 ">
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />

        {/* Filtro per anno */}
        <YearFilter
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>

      {/* Elenco dischi */}
      <div className="row">
        {filteredRecords.map((record) => (
          <div key={record.id} className="col-md-4 mb-4 mt-5">
            <Link
              to={`/records/${record.id}`}
              className="text-decoration-none text-dark"
            >
              <Card record={record} />
            </Link>
          </div>
        ))}
      </div>

      <Link to="/add" className="btn btn-dark mt-4">
        Aggiungi un nuovo disco
      </Link>
    </div>
  );
}

export default HomePage;
