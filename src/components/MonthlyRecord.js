import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import ExpenseContext from "../context/expenses/ExpenseContext";
const MonthlyRecord = () => {
  const context = useContext(ExpenseContext);
  const { MonthlyCategoryData } = context;
  let location = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const categoryname = Object.entries(categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    MonthlyCategoryData(selectedMonth)
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <div className="container" style={{ textAlign: "center" }} />
        <div className="container">
          <label htmlFor="month-select">Select a month:</label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select a month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <button type="submit-button" class="btn btn-outline-dark mx-3 my-3">
          VIEW CATEGORY EXPENSE
        </button>
      </form>

      <div className="container">
        <div className="row">
          {categoryname.map(([category, budget]) => (
            <div key={category} className="col-md-3">
              <div className="card bg-light my-3">
                <div className="card-body">
                  <h5 className="card-title">{category}</h5>
                  <p
                    className="card-text"
                    style={{ color: budget > 500 ? "red" : "inherit" }}
                  >
                    Expense:{budget}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link
        className={`nav-link ${
          location.pathname === "/categoryDetails" ? "active" : ""
        }`}
        aria-current="page"
        to={!localStorage.getItem("token") ? `/` : "/categoryDetails"}
      >
        More Details
      </Link>
    </div>
  );
};

export default MonthlyRecord;
