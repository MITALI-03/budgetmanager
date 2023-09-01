const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const fetchuser =require('../middleware/fetchuser')

// Route to calculate mothly expense category wise 
router.get('/mothlyExpenseRecord', fetchuser, async (req, res) => {
    try {
        let date = new Date();
        let month = date.getMonth();

        //expense current month
        const monthlyData = await Expense.find({
            date: {
                $gte: new Date(new Date().getFullYear(), month, 1),
                $lt: new Date(new Date().getFullYear(), month + 1, 1),
            },
            user: req.user.id,
        });

        if (!monthlyData) {
            return res.status(201).send("No data for this month");
        }

        const category = await Category.find({ user: req.user.id });

        let totalExpense = 0;           //total expense month
        let category_expense = {};      //store category wise expense
        let totalBudget = 0;            //Total Budget
        let category_budget = {};       //store category wise budget
        let extraExpence = 0;           // extra expense
        let extraExpence_category = {}; //Category wise extra expense

       
        for (let index = 0; index < category.length; index++) {
            category_expense[`${category[index].name}`] = 0;
            totalBudget += category[index].budget;
            extraExpence_category[`${category[index].name}`] = 0;
            //Calculating category wise budget
            if (category_budget[`${category[index].name}`]) {
                category_budget[`${category[index].name}`] += category[index].budget;
            } else {
                category_budget[`${category[index].name}`] = category[index].budget;
            }
        }

        //Calculation of expense
        for (let index = 0; index < monthlyData.length; index++) {
            totalExpense += monthlyData[index].amount;
            category_expense[`${monthlyData[index].name}`] += monthlyData[index].amount;
        }

        //Total extra expence
        if (totalExpense > totalBudget) {
            extraExpence = totalExpense - totalBudget;
        }

        //Calculation of category wise extra expense 
        for (let key in category_budget) {
            if (category_budget[key] < category_expense[key]) {
                extraExpence_category[key] = category_expense[key] - category_budget[key];
            }
        }

        res.json( extraExpence_category );
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.get('/categoryBudget', fetchuser, async (req, res) => {
    try {
        let date = new Date();
        let month = date.getMonth();

        //expense current month
        const monthlyData = await Expense.find({
            date: {
                $gte: new Date(new Date().getFullYear(), month, 1),
                $lt: new Date(new Date().getFullYear(), month + 1, 1),
            },
            user: req.user.id,
        });

        if (!monthlyData) {
            return res.status(201).send("No data for this month");
        }

        const category = await Category.find({ user: req.user.id });
  
        let totalExpense = 0;           //total expense month
        let category_expense = {};      //store category wise expense
        let totalBudget = 0;            //Total Budget
        let category_budget = {};       //store category wise budget
        let extraExpence = 0;           // extra expense
        let extraExpence_category = {}; //Category wise extra expense
       
        for (let index = 0; index < category.length; index++) {
            category_expense[`${category[index].name}`] = 0;
            totalBudget += category[index].budget;
            extraExpence_category[`${category[index].name}`] = 0;
            //Calculating category wise budget
            if (category_budget[`${category[index].name}`]) {
                category_budget[`${category[index].name}`] += category[index].budget;
            } else {
                category_budget[`${category[index].name}`] = category[index].budget;
            }
        }

        res.json(category_budget);
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

//Route to get monthly total expense
router.get('/mothlytotalexpense', fetchuser, async (req, res) => {
    try {
        let date = new Date();
        let month = date.getMonth();

        //expense current month
        const monthlyData = await Expense.find({
            date: {
                $gte: new Date(new Date().getFullYear(), month, 1),
                $lt: new Date(new Date().getFullYear(), month + 1, 1),
            },
            user: req.user.id,
        });

        if (!monthlyData) {
            return res.status(201).send("No data for this month");
        }

        const category = await Category.find({ user: req.user.id });

        let totalExpense = 0;           //total expense month
        let category_expense = {};      //store category wise expense
        let totalBudget = 0;            //Total Budget
        let category_budget = {};       //store category wise budget
        let extraExpence = 0;           // extra expense
        let extraExpence_category = {}; //Category wise extra expense

       
        for (let index = 0; index < category.length; index++) {
            category_expense[`${category[index].name}`] = 0;
            totalBudget += category[index].budget;
            extraExpence_category[`${category[index].name}`] = 0;
            //Calculating category wise budget
            if (category_budget[`${category[index].name}`]) {
                category_budget[`${category[index].name}`] += category[index].budget;
            } else {
                category_budget[`${category[index].name}`] = category[index].budget;
            }
        }

        //Calculation of expense
        for (let index = 0; index < monthlyData.length; index++) {
            totalExpense += monthlyData[index].amount;
            category_expense[`${monthlyData[index].name}`] += monthlyData[index].amount;
        }

        //Total extra expence
        if (totalExpense > totalBudget) {
            extraExpence = totalExpense - totalBudget;
        }

        //Calculation of category wise extra expense 
        for (let key in category_budget) {
            if (category_budget[key] < category_expense[key]) {
                extraExpence_category[key] = category_expense[key] - category_budget[key];
            }
        }

        res.json({ totalExpense,totalBudget,extraExpence});
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.get('/getcategoryexpense', fetchuser, async (req, res) => {
    try {
        let date = new Date();
        let month = date.getMonth();

        //expense current month
        const monthlyData = await Expense.find({
            date: {
                $gte: new Date(new Date().getFullYear(), month, 1),
                $lt: new Date(new Date().getFullYear(), month + 1, 1),
            },
            user: req.user.id,
        });

        if (!monthlyData) {
            return res.status(201).send("No data for this month");
        }

        const category = await Category.find({ user: req.user.id });

        let totalExpense = 0;           //total expense month
        let category_expense = {};      //store category wise expense
        let totalBudget = 0;            //Total Budget
        let category_budget = {};       //store category wise budget
        let extraExpence = 0;           // extra expense
        let extraExpence_category = {}; //Category wise extra expense

       
        for (let index = 0; index < category.length; index++) {
            category_expense[`${category[index].name}`] = 0;
            totalBudget += category[index].budget;
            extraExpence_category[`${category[index].name}`] = 0;
            //Calculating category wise budget
            if (category_budget[`${category[index].name}`]) {
                category_budget[`${category[index].name}`] += category[index].budget;
            } else {
                category_budget[`${category[index].name}`] = category[index].budget;
            }
        }

        //Calculation of expense
        for (let index = 0; index < monthlyData.length; index++) {
            totalExpense += monthlyData[index].amount;
            category_expense[`${monthlyData[index].name}`] += monthlyData[index].amount;
        }

        

        res.json(  category_expense );
        
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});


router.get('/monthly-data/:month', fetchuser, async (req, res) => {
    try {
    const month = parseInt(req.params.month);
    const monthlyData = await Expense.find({user: req.user.id ,month});
    const category = await Category.find({ user: req.user.id });

        let totalExpense = 0;           //total expense month
        let category_expense = {};      //store category wise expense
        let totalBudget = 0;            //Total Budget
        let category_budget = {};       //store category wise budget
        let extraExpence = 0;           // extra expense
        let extraExpence_category = {}; //Category wise extra expense

       
        for (let index = 0; index < category.length; index++) {
            category_expense[`${category[index].name}`] = 0;
            totalBudget += category[index].budget;
            extraExpence_category[`${category[index].name}`] = 0;
            //Calculating category wise budget
            if (category_budget[`${category[index].name}`]) {
                category_budget[`${category[index].name}`] += category[index].budget;
            } else {
                category_budget[`${category[index].name}`] = category[index].budget;
            }
        }

        //Calculation of expense
        for (let index = 0; index < monthlyData.length; index++) {
            totalExpense += monthlyData[index].amount;
            category_expense[`${monthlyData[index].name}`] += monthlyData[index].amount;
        }

        //Total extra expence
        if (totalExpense > totalBudget) {
            extraExpence = totalExpense - totalBudget;
        }

        //Calculation of category wise extra expense 
        for (let key in category_budget) {
            if (category_budget[key] < category_expense[key]) {
                extraExpence_category[key] = category_expense[key] - category_budget[key];
            }
        }

        res.json( category_expense );
        
    }
catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
}
  });
    router.get('/get-expense/:name/:start_date/:end_date', fetchuser ,async (req, res) => {
    try {
      const name = req.params.name;
      const start_date = new Date(req.params.start_date);
      const end_date = new Date(req.params.end_date);
  
      const expenses = await Expense.find({
        user: req.user.id,
        name: name,
        date: { $gte: start_date, $lte: end_date }
      });
  
      res.json(expenses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.get('/categorymonthexpense/:name/:month', fetchuser ,async (req, res) => {
    try {
      const name = req.params.name;
      const month = parseInt(req.params.month);
  
      const expenses = await Expense.find({
        user: req.user.id,
        name: name,
        month: month,
      });
  
      res.json(expenses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  router.get('/categorytotalexpense/:name', fetchuser ,async (req, res) => {
    try {
      const name = req.params.name;
  
      const expenses = await Expense.find({
        user: req.user.id,
        name: name,
      });
  
      res.json(expenses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.get('/TotalAllExpenses', fetchuser ,async (req, res) => {
    try {
      const expenses = await Expense.find({
        user: req.user.id,
      });
  
      res.json(expenses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.get('/monthallexpense/:month', fetchuser ,async (req, res) => {
    try {
      const month = parseInt(req.params.month);
  
      const expenses = await Expense.find({
        user: req.user.id,
        month: month,
      });
  
      res.json(expenses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  router.get('/getallexpense/:start_date/:end_date', fetchuser ,async (req, res) => {
    try {
      
      const start_date = new Date(req.params.start_date);
      const end_date = new Date(req.params.end_date);
  
      const expenses = await Expense.find({
        user: req.user.id,
        date: { $gte: start_date, $lte: end_date }
      });
  
      res.json(expenses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

 
module.exports = router;