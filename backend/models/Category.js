const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
        
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    budget:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    }
});

CategorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
      this.name = this.name.toUpperCase();
    }
    next();
  });
const Category = mongoose.model('Category',CategorySchema);
module.exports = Category;