const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  console.log("Connected to DB");
  app.listen(3001, () => console.log("Listening on port 3001"));
});
