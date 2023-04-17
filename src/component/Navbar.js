import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {

  let navigate = useNavigate();


  let location = useLocation();
  useEffect(() => {

  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary fixnav navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            iNotebook
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === "/" ? "active" : ""
                    }`}
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link ${location.pathname === "/about" ? "active" : ""
                    }`}
                  aria-current="page"
                  href="/about"
                >
                  About
                </a>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link className="btn btn-dark mx-1" to="/login" role="button">Login </Link>
              <Link className="btn btn-dark mx-1" to="/signup" role="button">Signup</Link>


            </form> : <button onClick={handleLogout} className="btn btn-dark">Logout</button>}
          </div>
        </div>
      </nav >
    </div >
  );
};

export default Navbar;
