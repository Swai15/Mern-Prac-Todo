const express = require("express");
const router = express.Router();

const { getAllTasks, createTask, deleteAll, deleteTodo, changeCompleted } = require("../controllers/todo");

router.route("/todos").get(getAllTasks);
router.route("/todo/create").post(createTask);
router.route("/todos/delete-all").delete(deleteAll);
router.route("/todo/delete/:id").delete(deleteTodo);
router.route("/todo/editComplete/:id").put(changeCompleted);

module.exports = router;
