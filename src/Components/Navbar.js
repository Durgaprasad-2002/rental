import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Popper from "popper.js";

export default function Navbar() {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/Client_Car/Login";
  };

  return (
    <div className="NavBar">
      <nav
        className="navbar bg-body-tertiary fixed-top bg-dark"
        style={{ boxShadow: "0px 0px 10px 0px black" }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand text-white"
            href="#"
            style={{
              fontFamily: "Brush Script MT,cursive",
              fontSize: "30px",
            }}
          >
            Big Boy Toyz
          </a>
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header bg-dark text-white">
              <h5
                className="offcanvas-title"
                id="offcanvasNavbarLabel"
                style={{
                  fontFamily: "serif",
                  font: "18px",
                }}
              >
                {localStorage.getItem("userMail") !== null
                  ? localStorage.getItem("userMail")
                  : "Login for Bookings"}
              </h5>
              <button
                type="button"
                className="btn-close bg-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/Client_Car/dash"
                  >
                    Available Cars
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/Client_Car/status"
                  >
                    View Status
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    Rental Modification
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link active" aria-current="page">
                    Feedback
                  </a>
                </li> */}
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    style={{ cursor: "pointer" }}
                    // href="/Client_Car/Login"
                    onClick={Logout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
