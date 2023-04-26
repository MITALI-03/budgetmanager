const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Expense = require('../models/Expense');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallexpense', fetchuser, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });
        res.json(expenses)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addexpense', fetchuser, [
    body('date', 'Enter a valid date'),
    body('Category', 'select a valid category'),
    body('amount','Enter number value only').isNumeric().withMessage('Only Decimals allowed')
], async (req, res) => {
        try {
            const { date, Category, amount } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            let expense1 = await Expense.findById(req.params.id );

            
            const expense = new Expense({
                date, Category, amount, user: req.user.id
            })
            const savedExpense = await expense.save()

            res.json(savedExpense)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    
    })
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updateamount', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (date) { newNote.date = date };
        if (Category) { newNote.Category = Category };
        if (amount) { newNote.amount = amount };

        // Find the note to be updated and update it
        let expense = await Expense.findById(req.params.id );
        if (!expense) { return res.status(404).send("Not Found") }

        if (expense.user.toString() !== req.user.id || expense.Category.toString()!==req.expense.Category) {
            return res.status(401).send("Not Allowed");
        }
        expense = await Expense.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ expense });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

    
module.exports = router;