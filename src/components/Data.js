import React, { useEffect, useState, useContext } from "react";
import ExpenseContext from "../context/expenses/ExpenseContext";
const Data = () => {
  const context = useContext(ExpenseContext);
  const { categorybudget, categories, filterexpenses ,filterallexpenses} = context;
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    categorybudget();
  }, []);
  const categoryname = Object.entries(categories);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "ALL") {
      // Call another function here
      filterallexpenses(startDate,endDate)
      .then((data) => {
        setExpenseData(data);
        calculateTotalAmount(data);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
    filterexpenses(category, startDate, endDate)
      .then((data) => {
        setExpenseData(data);
        calculateTotalAmount(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  }
  //To calculate total
  const calculateTotalAmount = (expenses) => {
    let total = 0;
    expenses.forEach((transaction) => {
      total += transaction.amount;
    });
    setTotalAmount(total);
  };

  return (
    <div>
      <div className="container col-md-6 p-4 ">
        <h3>Category Expense</h3>
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              className="form-control"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary my-3">
            Get Expense
          </button>
        </form>

        {expenseData.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((data) => (
                <tr key={data._id}>
                  <td>{data.name}</td>
                  <td>{data.amount}</td>
                  <td>{formatDate(data.date)}</td>
                  <td>{data.info}</td>
                </tr>
              ))}
            </tbody>
            <div className="container mt-4">
              <h4>Total Amount: {totalAmount}</h4>
            </div>
          </table>
        ) : (
          <div className="container mt-4">
            <p>No records found for the selected category and date range.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
