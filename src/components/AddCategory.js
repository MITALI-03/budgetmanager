import React, { useState, useContext } from "react";
import ExpenseContext from "../context/expenses/ExpenseContext";

const AddCategory = (props) => {
  const context = useContext(ExpenseContext);
  const { addNewCategory } = context;

  const [category, setCategory] = useState({
    name: "",
    budget: 0,
  });

  const handelChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
    console.log(category);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewCategory(category, props.showAlert);
  };

  return (
    <div>
      <div className="container col-md-6 p-4 container col-md-6 p-4  border border-dark p-5 mb-3 bg-light">
        <h3>Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              name
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              name="name"
              onChange={handelChange}
              required
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Budget
            </label>
            <input
              type="number"
              class="form-control"
              id="exampleInputPassword1"
              name="budget"
              onChange={handelChange}
              required
              defaultValue="100"
            />
          </div>
          <button type="submit" class="btn btn-warning">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
