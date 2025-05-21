import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredRecords = records.filter((record) => {
    const searchLower = search.toLowerCase();
    return (
      record.title.toLowerCase().includes(searchLower) ||
      record.artist.toLowerCase().includes(searchLower) ||
      (record.genre && record.genre.name.toLowerCase().includes(searchLower))
    );
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/records")
      .then((response) => {
        setRecords(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Errore nel recupero dei dati");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4">Caricamento...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">I Tuoi Dischi</h1>

      <input
        type="text"
        className="form-control mb-5"
        placeholder="Cerca per titolo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredRecords.map((record) => (
          <div key={record.id} className="col-md-4 mb-4 mt-5">
            <Link
              to={`/records/${record.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 d-flex flex-column">
                {/* 👇 Mostra immagine */}

                <img
                  src={
                    record.cover_image
                      ? record.cover_image
                      : "/img/placeholder.jpg"
                  }
                  alt={record.title}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "100%" }}
                />

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

// function HomePage() {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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

//   if (loading) return <p>Caricamento dati...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Catalogo Dischi</h1>
//       <ul>
//         {records.map((record) => (
//           <li key={record.id} style={{ marginBottom: "10px" }}>
//             <strong>{record.title}</strong> ({record.year})<br />
//             Genere: {record.genre ? record.genre.name : "Sconosciuto"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default HomePage;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/records")
//       .then((response) => {
//         setRecords(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Errore nel recupero dei dati:", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Catalogo dischi</h1>
//       <ul>
//         {records.map((record) => (
//           <li key={record.id}>
//             <strong>{record.title}</strong> - {record.year}
//             <br />
//             Genere: {record.genre ? record.genre.name : "Nessun genere"}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
