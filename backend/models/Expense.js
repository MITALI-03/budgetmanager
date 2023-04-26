const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});
module.exports = mongoose.model('expenses', ExpenseSchema);