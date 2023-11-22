const Todo = require("../models/Todo");

const getAllTasks = async (req, res) => {
  try {
    const result = await Todo.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const createTask = (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });
    todo.save();
    res.json(todo);
  } catch (error) {
    console.log("Failed");
  }
};

const deleteAll = async (req, res) => {
  try {
    await Todo.deleteMany();
    res.send("All todos deleted");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const result = await Todo.findOneAndDelete({ _id: req.params.id });

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const changeCompleted = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteAll,
  deleteTodo,
  changeCompleted,
};
