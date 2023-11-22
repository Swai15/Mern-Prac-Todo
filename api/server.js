const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const todoRoutes = require("./routes/todo");

app.use(express());
app.use(cors());
app.use(express.json());

app.use("/", todoRoutes);

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  console.log("Connected to DB");
  app.listen(5001, () => console.log("Listening on port 5001"));
});
