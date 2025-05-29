import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🎵 My Records
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
