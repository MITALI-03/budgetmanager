
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/category',require('./routes/category'))
app.use('/api/transactions',require('./routes/transactions'))

app.listen(port, () => {
  console.log(`budgettrack backend listening at http://localhost:${port}`);
});