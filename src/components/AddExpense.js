import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ExpenseContext from "../context/expenses/ExpenseContext";
const AddExpense = (props) => {
  const context = useContext(ExpenseContext);
  const { categorybudget, categories, addNewExpense } = context;
  const [category, setCategory] = useState([]);
  const [expense, setExpense] = useState({
    name: "",
    info: "",
    amount: 0,
  });

  const handelChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
    console.log(expense);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewExpense(expense, props.showAlert);
  };

  useEffect(() => {
    categorybudget();
  }, []);
  const categoryname = Object.entries(categories);
  console.log(categoryname);

  const handlecategory = (event) => {
    setCategory(event.target.value);
    setExpense({ ...expense, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container col-md-6 p-4  border border-dark p-5 mb-3 bg-light">
        <h3>Add an Expense</h3>
        <form className="my-2" onSubmit={handleSubmit}>
          <label for="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handelChange}
            required
          />
          <br />

          <br />
          <select
            id="name"
            name="name"
            value={category}
            onChange={handlecategory}
            required
          >
            <option value="">-- Select a category --</option>
            {categoryname.map(([category, expense]) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div id="newcategory" className="form-text my-2">
            <Link to="/addCategory" className="btn btn-warning icon-link">
              Add a New Category
            </Link>
          </div>
          <div className="mb-3" style={{ marginTop: "10px" }}>
            <label for="info" className="form-label">
              Information
            </label>
            <input
              type="text"
              className="form-control"
              id="info"
              name="info"
              onChange={handelChange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="amount" className="form-label">
              Amount
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              name="amount"
              onChange={handelChange}
              pattern="[0-9]+"
              required
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
