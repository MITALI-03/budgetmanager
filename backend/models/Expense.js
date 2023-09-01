const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    name:{
        type: String,
        ref:'Category',
        require: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    info:{
        type: String,
        require: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    week:{
        type:Number,
        required: true,
    },
    month:{
        type:Number,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }
});

ExpenseSchema.pre('save', function(next) {
    if (this.isModified('name')) {
      this.name = this.name.toUpperCase();
    }
    next();
  });
  

const Expense = mongoose.model('Expense',ExpenseSchema);
module.exports = Expense;