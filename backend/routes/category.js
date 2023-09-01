const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const Expense = require('../models/Expense');
const fetchuser=require ('../middleware/fetchuser')

router.post('/addCategory', fetchuser, [
    body('budget').isNumeric({ min: 100 })     //Using express-validator
], async (req, res) => {

    // Validating input
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    //Destructure variables
    const { name, budget } = req.body;

    try {
        //Check if category exist or not
        const exist = await Category.findOne({ name: name, user: req.user.id });
        if (exist) {
            return res.status(400).json({ error: 'Category already exist' });
        }

        //Create new Category object
        const createCategory = await Category.create({
            name,
            budget,
            user: req.user.id
        });

        //Save to DB
        const success = await createCategory.save();
        if (success) {
            return res.status(200).json({ success });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Category Exist');
    }
});


router.post('/addExpense', fetchuser,[
    body('amount').isNumeric({ min: 1 }),
    body('info').isLength({ min: 1 }),       //Validate Expense
    //body('week').isNumeric({min:1,max:4})
], async (req, res) => {
    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { amount, info, name, week, date } = req.body;
    try {
        //new expense
        const dates = new Date(date);
        console.log(dates);
        const month = dates.getMonth()+1;
        let adjustedDate = dates.getDate()+dates.getDay();
        let prefixes = ['0', '1', '2', '3', '4', '5'];
        let week= parseInt(prefixes[0 | adjustedDate / 7])+1;
        console.log(week);
        const newExpense = await Expense.create({
            amount,
            info,
            name,
            user: req.user.id,
            month,
            week,
            date,
        });

        //database
        const success = await newExpense.save();
        if (success) {
            return res.status(200).json({ success, newExpense });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error occured');
    }
});

router.get('/updatebudget/:name/:budget', fetchuser, async (req, res) => {
    
    try {
        const name = req.params.name;
        const budget = parseInt(req.params.budget);
        
        const newCategory = {};
        if (name) { newCategory.name = name };
        if (budget) { newCategory.budget = budget };
    
        
        const category = await Category.findOneAndUpdate({ name: name },{ $set: newCategory }, { new: true });

        
        res.json({category});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;