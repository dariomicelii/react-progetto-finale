import React from "react";
import { Link } from "react-router-dom";

function Card({ record }) {
  return (
    <div className="card h-100 d-flex flex-column shadow-lg rounded-4">
      <div className="ratio ratio-1x1 overflow-hidden">
        <img
          src={record.cover_image ? record.cover_image : "/img/placeholder.jpg"}
          alt={record.title}
          className="card-img-top w-100 h-100 object-fit-cover"
        />
      </div>
      <div className="card-body">
        <h4 className="card-title">{record.title}</h4>
        <span className="card-subtitle">- {record.artist}</span>
        <h6 className="card-subtitle mb-2 mt-2 text-muted">{record.year}</h6>
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
  );
}

export default Card;
