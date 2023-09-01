import React, { useEffect, useState, useContext } from "react";
import ExpenseContext from "../context/expenses/ExpenseContext";

const BudgetUpdate = (props) => {
  const context = useContext(ExpenseContext);
  const { categorybudget, categories, updatebudget } = context;
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    categorybudget();
  }, []);
  const categoryname = Object.entries(categories);
  console.log(categoryname);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatebudget(category, budget, props.showAlert);
  };

  return (
    <div>
      <div className="container col-md-6 p-4 ">
        <h3>Category Expense</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">-- Select a category --</option>
              {categoryname.map(([category, expense]) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
              onChange={(e) => setBudget(e.target.value)}
              pattern="[0-9]+"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary my-3">
            Update Budget
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetUpdate;
