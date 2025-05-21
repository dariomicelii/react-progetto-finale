import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RecordDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const confirmDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/records/${id}`)
      .then(() => {
        closeModal();
        navigate("/");
      })
      .catch((err) => console.error("Errore eliminazione:", err));
  };

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
      <Link to="/" className="btn btn-dark mb-3">
        ← Torna alla lista
      </Link>
      <br />
      <img
        src={record.cover_image ? record.cover_image : "/img/placeholder.jpg"}
        alt={record.title}
        className="img-fluid mb-3"
        style={{ maxHeight: "300px", objectFit: "cover" }}
      />

      <h2>{record.title}</h2>
      <p>
        <strong>Anno:</strong> {record.year}
      </p>
      <p>
        <strong>Genere:</strong>{" "}
        {record.genre ? record.genre.name : "Sconosciuto"}
      </p>

      <button className="btn btn-danger mt-2" onClick={openModal}>
        Elimina
      </button>

      {showModal && (
        <>
          {/* Backdrop scuro */}
          <div className="custom-backdrop" onClick={closeModal}></div>

          {/* Finestra modale */}
          <div className="custom-modal">
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                <h5>Conferma eliminazione</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="custom-modal-body">
                <p>Sei sicuro di voler eliminare questo disco?</p>
              </div>
              <div className="custom-modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Annulla
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Elimina
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecordDetail;
