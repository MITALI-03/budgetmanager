import React, { useEffect, useState, useContext } from "react";
import ExpenseContext from "../context/expenses/ExpenseContext";
const CategoryDetails = (props) => {
  const context = useContext(ExpenseContext);
  const { categorybudget, categories, categorymonthexpense,MonthAllExpense } = context;
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [expense, setExpense] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "ALL") {
      // Call another function here
      MonthAllExpense (month)
      .then((data) => {
        setExpense(data);
        calculateTotalAmount(data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
    categorymonthexpense(category, month)
      .then((data) => {
        setExpense(data);
        calculateTotalAmount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };}

  useEffect(() => {
    categorybudget();
  }, []);
  const categoryname = Object.entries(categories);

  const calculateTotalAmount = (expenses) => {
    let total = 0;
    expenses.forEach((transaction) => {
      total += transaction.amount;
    });
    setTotalAmount(total);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="category">Category</label>

                <select
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">-- Select a category --</option>
                  <option value="ALL">ALL</option>
                  {categoryname.map(([category, expense]) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <label htmlFor="month">Select a month:</label>
              <select
                id="month"
                className="form-control"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
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

            <div className="col">
              <button type="submit" className="btn btn-primary mt-4">
                View Record
              </button>
            </div>
          </div>
        </div>
      </form>
      {expense.length > 0 ? (
        <div className="container mt-4">
          <h3>Category Expense Report</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Info</th>
              </tr>
            </thead>
            <tbody>
              {expense.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.name}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="container mt-4">
            <h4>Total Amount: {totalAmount}</h4>
          </div>
        </div>
      ) : (
        <div className="container mt-4">
          <p>No records found for the selected category and month.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
