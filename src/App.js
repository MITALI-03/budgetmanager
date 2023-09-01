import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import CategoryDetails from "./components/CategoryDetails";
import AddCategory from "./components/AddCategory";
import AddExpense from "./components/AddExpense";
import TotalRecord from "./components/TotalRecord";
import MonthlyRecord from "./components/MonthlyRecord";
import Data from "./components/Data";
import TotalDetails from "./components/TotalDetails";
import BudgetUpdate from "./components/BudgetUpdate";
import ExpenseState from "./context/expenses/ExpenseState";




const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  //in the routes, I am passing showAlert as the prop so that I can use alert functionality easily
  return (
    <>
      <ExpenseState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/categoryDetails" element={<CategoryDetails/>}></Route>
            <Route exact path="/add-Expense" element={<AddExpense showAlert={showAlert}/>}></Route>
            <Route exact path="/add-Category" element={<AddCategory showAlert={showAlert}/>}></Route>
            <Route exact path="/total-record" element={<TotalRecord/>}></Route>
            <Route exact path="/monthly-record" element={<MonthlyRecord/>}></Route>
            <Route exact path="/total-details" element={<TotalDetails/>}></Route>
            <Route exact path="/get-expense" element={<Data/>}></Route>
            <Route exact path="/budget-update" element={<BudgetUpdate showAlert={showAlert}/>}></Route>
            
            
            
          </Routes>
          <Footer />
        </Router>
        </ExpenseState>
    </>
  );
};
export default App;
