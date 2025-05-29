import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  if (loading) return <p className="text-center mt-4">Caricamento...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">I Tuoi Dischi</h1>

      {/* Campo di ricerca */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Cerca per titolo, artista o genere..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtro per genere */}

      <div className="d-flex gap-3 mb-4 ">
        <select
          className="form-select mb-4"
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

        <select
          className="form-select mb-4"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Tutti gli anni</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Elenco dischi */}
      <div className="row">
        {filteredRecords.map((record) => (
          <div key={record.id} className="col-md-4 mb-4 mt-5">
            <Link
              to={`/records/${record.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 d-flex flex-column">
                <div className="ratio ratio-1x1 overflow-hidden">
                  <img
                    src={
                      record.cover_image
                        ? record.cover_image
                        : "/img/placeholder.jpg"
                    }
                    alt={record.title}
                    className="card-img-top w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="card-body">
                  <h4 className="card-title">{record.title}</h4>
                  <span className="card-subtitle">- {record.artist}</span>
                  <h6 className="card-subtitle mb-2 mt-2 text-muted">
                    {record.year}
                  </h6>
                  <p className="card-text">
                    Genere: {record.genre ? record.genre.name : "Sconosciuto"}
                  </p>
                  <Link
                    to={`/records/${record.id}/edit`}
                    className="btn btn-dark mt-2 ms-2 me-2"
                  >
                    Modifica
                  </Link>
                </div>
              </div>
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function HomePage() {
//   const [records, setRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [genres, setGenres] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("");

//   const filteredRecords = records.filter((record) => {
//     const searchLower = search.toLowerCase();
//     const matchesSearch =
//       record.title.toLowerCase().includes(searchLower) ||
//       record.artist.toLowerCase().includes(searchLower) ||
//       (record.genre && record.genre.name.toLowerCase().includes(searchLower));

//     const matchesGenre =
//       !selectedGenre || (record.genre && record.genre.name === selectedGenre);

//     return matchesSearch && matchesGenre;
//   });

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/records")
//       .then((response) => {
//         setRecords(response.data.data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Errore nel recupero dei dati");
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/genres")
//       .then((res) => setGenres(res.data))
//       .catch((err) => console.error("Errore generi:", err));
//   }, []);

//   if (loading) return <p className="text-center mt-4">Caricamento...</p>;
//   if (error) return <p className="text-danger text-center mt-4">{error}</p>;

//   return (
//     <div className="container mt-5 mb-5">
//       <h1 className="mb-4">I Tuoi Dischi</h1>

//       <input
//         type="text"
//         className="form-control mb-5"
//         placeholder="Cerca per titolo..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="row mb-4">
//         <div className="col-md-6">
//           <select
//             className="form-select"
//             value={selectedGenre}
//             onChange={(e) => setSelectedGenre(e.target.value)}
//           >
//             <option value="">Tutti i generi</option>
//             {genres.map((genre) => (
//               <option key={genre.id} value={genre.name}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="row">
//         {filteredRecords.map((record) => (
//           <div key={record.id} className="col-md-4 mb-4 mt-5">
//             <Link
//               to={`/records/${record.id}`}
//               className="text-decoration-none text-dark"
//             >
//               <div className="card h-100 d-flex flex-column">
//                 {/* 👇 Mostra immagine */}

//                 <img
//                   src={
//                     record.cover_image
//                       ? record.cover_image
//                       : "/img/placeholder.jpg"
//                   }
//                   alt={record.title}
//                   className="card-img-top"
//                   style={{ objectFit: "cover", height: "100%" }}
//                 />

//                 <div className="card-body">
//                   <h4 className="card-title">{record.title}</h4>
//                   <span className="card-subtitle">- {record.artist}</span>
//                   <h6 className="card-subtitle mb-2 mt-2 text-muted">
//                     {record.year}
//                   </h6>
//                   <p className="card-text">
//                     Genere: {record.genre ? record.genre.name : "Sconosciuto"}
//                   </p>
//                   <Link
//                     to={`/records/${record.id}/edit`}
//                     className="btn btn-dark mt-2 ms-2 me-2"
//                   >
//                     Modifica
//                   </Link>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//       <Link to="/add" className="btn btn-dark mt-4">
//         Aggiungi un nuovo disco
//       </Link>
//     </div>
//   );
// }

// export default HomePage;
