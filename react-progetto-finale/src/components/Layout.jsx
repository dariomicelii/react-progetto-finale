import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
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

      {/* Main Content */}
      <main className="flex-grow-1 container py-5">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-3 mt-auto">
        <div className="container">
          <small>&copy; 2025 My Records</small>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
