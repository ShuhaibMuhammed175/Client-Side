import React, { useContext } from 'react';
import '../css/nav.css';
import AuthContext from './AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleAdminClick = () => {
    // Redirect to the admin link
    window.location.href = 'http://127.0.0.1:8000/admin/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="fine-dine">
          FineDine
        </a>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="/reservation-details" className="nav-link">
              Reservations
            </a>
          </li>
          {user && user.is_admin === true && (
            <li>
              <a
                href="#"
                className="nav-link"
                onClick={handleAdminClick}
              >
                Admin
              </a>
            </li>
          )}

          <li>
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
          <li>
            {user ? (
              <a href="/login" className="nav-link" onClick={logoutUser}>
                Logout
              </a>
            ) : (
              <a href="/login" className="nav-link">
                Login
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
