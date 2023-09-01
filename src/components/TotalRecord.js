import React, { useEffect, useState, useContext } from "react";
import BudgetPieChart from "./BudgetPieChart";
import ExpenseContext from "../context/expenses/ExpenseContext";
import { Link, useLocation } from "react-router-dom";
const TotalRecord = () => {
  const context = useContext(ExpenseContext);
  const {
    categoryexpense,
    gettotalextra,
    categorybudget,
    categories,
    gettotalRecord,
  } = context;
  const [expense, setexpense] = useState([]);
  const [extraexpense, setextraexpense] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  let location = useLocation();
  const handleclick = () => {
    categorybudget();
    fetchData();
    fetchextraexpense();
  };
  const fetchData = async () => {
    try {
      const data = await categoryexpense();
      setexpense(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchextraexpense = async () => {
    try {
      const data = await gettotalextra();
      setextraexpense(data);
      console.log(extraexpense);
    } catch (error) {
      console.log(error);
    }
  };
  const categoryname = Object.entries(categories);
  const category_expense = Object.entries(expense);
  const category_extraexpense = Object.entries(extraexpense);
  useEffect(() => {
    gettotalRecord()
      .then((data) => {
        setBudgetData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [gettotalRecord]);

  return (
    <div>
      <form>
        <div className="container" />
        <button type="button" class="btn btn-warning mx-3 my-15">
          Total Expenses :{budgetData.totalExpense}
        </button>
        <button type="button" class="btn btn-warning mx-3 my-3">
          Total Budget:{budgetData.totalBudget}
        </button>
        <button type="button" class="btn btn-warning mx-3 my-3">
          Extra Expense :{budgetData.extraExpenses}
        </button>
      </form>
      <div classname="container">
        <BudgetPieChart />
      </div>

      <div class="row">
        <div class="col-9">
          <h2>Category-Wise Expenses</h2>
        </div>
        <button
          type="button"
          class="btn btn-outline-dark mx-3 my-3"
          onClick={handleclick}
        >
          VIEW CATEGORY EXPENSE
        </button>
        <div class="col-4">
          {categoryname.map(([category, budget]) => (
            <div key={category} className="budget-card">
              <h5>{category} </h5>
              <p>Budget: {budget}</p>
            </div>
          ))}
        </div>
        <div class="col-4">
          {category_expense.map(([category, expense]) => (
            <div key={category} className="budget-expense ">
              <h6>Expense: {expense}</h6>
              <br />
              <br />
            </div>
          ))}
        </div>

        <div className="col-3">
          {category_extraexpense.map(([category, expense]) => (
            <div key={category} className="budget-expense">
              <h6 style={{ color: expense > 0 ? "red" : "inherit" }}>
                Extra Expense: {expense}
              </h6>
              <br />
              <br />
            </div>
          ))}
        </div>
        <Link
          className={`nav-link ${
            location.pathname === "/total-details" ? "active" : ""
          }`}
          aria-current="page"
          to={!localStorage.getItem("token") ? `/` : "/total-details"}
          style={{ textAlign: "center" }}
        >
          More Details
        </Link>
        <Link
          className={`nav-link ${
            location.pathname === "/budget-update" ? "active" : ""
          }`}
          aria-current="page"
          to={!localStorage.getItem("token") ? `/` : "/budget-update"}
          style={{ textAlign: "center" }}
        >
          Update Budget
        </Link>
      </div>
    </div>
  );
};

export default TotalRecord;
