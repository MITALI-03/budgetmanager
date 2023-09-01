import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  //here navbar is created using bootstrap
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link
          className="navbar-brand "
          to={!localStorage.getItem("token") ? `/` : "/home"}
        >
          <img
            src={logo}
            alt=""
            width="30"
            height="30"
            className="mx-2 d-inline-block align-text-top"
          />
          BudgetTrack
        </Link>
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

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-warning mx-2" to="/signup" role="button">
                Sign Up
              </Link>
            </form>
          ) : (
            <div className="d-flex ">
              <div></div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/add-Expense" ? "active" : ""
                    }`}
                    aria-current="page"
                    to={!localStorage.getItem("token") ? `/` : "/add-Expense"}
                  >
                    Add Expense
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/add-Category" ? "active" : ""
                    }`}
                    aria-current="page"
                    to={!localStorage.getItem("token") ? `/` : "/add-Category"}
                  >
                    Add Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/total-record" ? "active" : ""
                    }`}
                    aria-current="page"
                    to={!localStorage.getItem("token") ? `/` : "/total-record"}
                  >
                    Total Expenses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/monthly-record" ? "active" : ""
                    }`}
                    aria-current="page"
                    to={
                      !localStorage.getItem("token") ? `/` : "/monthly-record"
                    }
                  >
                    Monthly Expenses
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/get-expense" ? "active" : ""
                    }`}
                    aria-current="page"
                    to={!localStorage.getItem("token") ? `/` : "/get-expense"}
                  >
                    Get Expenses
                  </Link>
                </li>
              </ul>
              <button onClick={handleLogout} className="btn btn-warning mx-5">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
