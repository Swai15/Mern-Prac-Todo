import { useState, useEffect } from "react";
const API_BASE = "http://localhost:5001";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        console.log("Data fetched", data);
      })
      .catch((error) => console.error("Error: " + error.message));
  };

  const deleteTodo = (id) => {
    fetch(API_BASE + "/todo/delete/" + id, { method: "delete" })
      .then((res) => res.json())
      .then(setTodos((todos) => todos.filter((todo) => todo._id != id)))
      .catch((error) => console.log("Error: " + error.message));
  };

  return (
    <div className="App">
      <div className="tasks-container">
        <div className="heading">
          <h2>Todo List</h2>
        </div>
        <div className="tasks-body">
          {todos.map((todo) => {
            return (
              <div className="todo" key={todo._id}>
                <div className="checkbox">0</div>
                <div className="todo-text">{todo.text}</div>
                <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                  x
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
