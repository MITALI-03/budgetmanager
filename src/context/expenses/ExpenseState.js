import {useState } from "react";
import ExpenseContext from "./ExpenseContext";
import axios from "axios";

const ExpenseState = (props) => {
const host = "http://localhost:5000"
//total value for the pie chart
  const gettotalRecord = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${host}/api/transactions/mothlytotalexpense`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  
//Fetch Categories
const [categories, setCategories] = useState([]);
 
    const categorybudget = async () => {
      try {
      const token = localStorage.getItem("token");
      const data = await axios.get(
        `${host}/api/transactions/categoryBudget`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      if (data) {
        setCategories(data.data);
        console.log(categories);
      }
    } catch (err) {
      console.log(err);
    }
  };


//Category wise total expenses
const categoryexpense = async (e) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(
      `${host}/api/transactions/getcategoryexpense`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    if (data) {
      console.log(data.data)
      return data.data;
      
    }
  } catch (err) {
    console.log(err);
  }
};

//Get total extra expense
const gettotalextra = async (e) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get(
      `${host}/api/transactions/mothlyExpenseRecord`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    if (data) {
      console.log(data.data)
      //setextraexpense(data.data)
      return data.data;
      
    }
  } catch (err) {
    console.log(err);
  }
};
 //Month Category data
 const MonthlyCategoryData = async (selectedMonth) => {
  const response = await fetch(
    `${host}/api/transactions/monthly-data/${selectedMonth}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    }
  );
  const data = await response.json();
  return data;
  
  
};
//Category Total Details
const CategoryTotalDetails = async (category) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${host}/api/transactions/categorytotalexpense/${category}`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    const data=response.data;
    return data;
    
  } catch (error) {
    console.error(error);
  }
};
//TotalAllExpense
const TotalAllDetails = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${host}/api/transactions/TotalAllExpenses`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    const data=response.data;
    return data;
    
  } catch (error) {
    console.error(error);
  }
};
//Month all expense
const MonthAllExpense = async (month) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${host}/api/transactions/monthallexpense/${month}`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    const data=response.data;
    return data;
    
  } catch (error) {
    console.error(error);
  }
};
//Category expenses with date filter
const filterexpenses = async (category,startDate,endDate) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${host}/api/transactions/get-expense/${category}/${startDate}/${endDate}`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
      );
    const data=response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
//all expenses with date filter
const filterallexpenses = async (startDate,endDate) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${host}/api/transactions/getallexpense/${startDate}/${endDate}`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
      );
    const data=response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

// calculate expenses with category and month
const categorymonthexpense = async (category,month) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${host}/api/transactions/categorymonthexpense/${category}/${month}`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
      );
    const data=response.data;
    return data;
    
  } catch (error) {
    console.error(error);
  }
};

const updatebudget = async (category, budget, showAlert) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${host}/api/category/updatebudget/${category}/${budget}`,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    if (response) {
      console.log(response);
      showAlert("Budget Updated", "success");
    }
  } catch (error) {
    console.error(error);
  }
};
//ADD NEW CATEGORY
const addNewCategory = async (category, showAlert) => {
  try {
    const token = localStorage.getItem("token");
    const { name, budget } = category;
    const response = await axios.post(
      `${host}/api/category/addCategory`,
      { name, budget },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    if (response) {
      console.log(response);
      showAlert("Category Added", "success");
    }
  } catch (error) {
    console.error(error);
    showAlert("Category Failed", "danger");
  }
};
//ADD NEW EXPENSE
const addNewExpense = async (expense, showAlert) => {
  try {
    const token = localStorage.getItem("token");
    const { date, name, info, amount } = expense;
    const response = await axios.post(
      `${host}/api/category/addExpense`,
      { date, name, info, amount },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    if (response) {
      console.log(response);
      showAlert("Expense Added", "success");
    }
  } catch (error) {
    console.error(error);
  }
};




  return (
    <ExpenseContext.Provider value={{gettotalRecord,categories,categorybudget,categoryexpense,gettotalextra,
    MonthlyCategoryData,CategoryTotalDetails,filterexpenses,categorymonthexpense,updatebudget,
    addNewCategory,addNewExpense,TotalAllDetails,MonthAllExpense,filterallexpenses}}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
