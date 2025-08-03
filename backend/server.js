require("dotenv").config();
const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require('./config/db');
db();

const authRoute = require('./routes/authRoutes');
const transactionRoutes = require("./routes/transactionRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const incomeRoutes = require("./routes/incomeRoutes")

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // allow cookies / auth headers to be sent
};

app.use(cors(corsOptions));

app.use(bodyParse.json());
app.use(cookieParser());


app.use('/auth', authRoute);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRouter);
app.use("/budget", budgetRoutes);
app.use("/income", incomeRoutes);

app.get("/", (req, res) => {
  res.send("Api is running");
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error while conencting with server", err);
  }
  console.log("Server is running on port", process.env.PORT);
});
