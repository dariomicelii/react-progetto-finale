import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top mb-5">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <svg
            width="320"
            height="60"
            viewBox="0 0 320 90"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="MyRecords logo"
          >
            <circle cx="45" cy="45" r="30" style={{ fill: "#222" }} />
            <circle cx="45" cy="45" r="5" style={{ fill: "#e2b05b" }} />
            <text
              x="90"
              y="50"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 38,
                fill: "#3e2c1c",
              }}
            >
              MyRecords
            </text>
            <text
              x="90"
              y="70"
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 13,
                fill: "#b28d5b",
              }}
            >
              Vintage Vinyl Collection
            </text>
          </svg>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Aggiungi
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
