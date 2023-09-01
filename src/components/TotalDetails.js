import React, { useEffect, useState, useContext } from "react";
import ExpenseContext from "../context/expenses/ExpenseContext";

const TotalDetails = (props) => {
  const context = useContext(ExpenseContext);
  const { categorybudget, categories, CategoryTotalDetails,TotalAllDetails } = context;
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category === "ALL") {
      // Call another function here
      TotalAllDetails()
      .then((data) => {
        setExpense(data);
        calculateTotalAmount(data);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
    CategoryTotalDetails(category)
      .then((data) => {
        setExpense(data);
        calculateTotalAmount(data);
        setDataLoaded(true);
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
              <button type="submit" className="btn btn-primary mt-4">
                View Record
              </button>
            </div>
          </div>
        </div>
      </form>
      {dataLoaded && expense.length > 0 ? ( // Add dataLoaded check here
        <div className="container mt-4">
          <h3>Category Expense Record</h3>
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
          {dataLoaded && <p>No records found for the selected category</p>}
        </div>
      )}
    </div>
  );
};

export default TotalDetails;
