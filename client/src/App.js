import { useState, useEffect } from "react";
const API_BASE = "http://localhost:5001";

function App() {
  const [todos, setTodos] = useState([]);

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

  return (
    <div className="App">
      <div className="tasks-container">
        <div className="heading">Todo List</div>
        <div className="tasks-body">
          {todos.map((todo) => {
            return (
              <div className="todo">
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
                <div className="delete-todo">x</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
