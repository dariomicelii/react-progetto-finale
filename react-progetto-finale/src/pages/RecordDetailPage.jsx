import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function RecordDetail() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/records/${id}`)
      .then((response) => {
        setRecord(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Errore:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-4">Caricamento...</p>;
  if (!record)
    return <p className="text-center mt-4 text-danger">Disco non trovato.</p>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Torna alla lista
      </Link>
      <h2>{record.title}</h2>
      <p>
        <strong>Anno:</strong> {record.year}
      </p>
      <p>
        <strong>Genere:</strong>{" "}
        {record.genre ? record.genre.name : "Sconosciuto"}
      </p>
    </div>
  );
}

export default RecordDetail;
