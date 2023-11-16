const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Todo = require("./models/Todo");

app.use(express());
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
  console.log("Connected to DB");
  app.listen(5001, () => console.log("Listening on port 5001"));
});

app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/todo/create", (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });
    todo.save();
    res.json(todo);
  } catch (error) {
    console.log("Failed");
  }
});

app.delete("/todos/delete-all", async (req, res) => {
  try {
    await Todo.deleteMany();
    res.send("All todos deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const result = await Todo.findOneAndDelete({ _id: req.params.id });

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});
