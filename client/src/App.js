import { useState, useEffect } from "react";
const API_BASE = "http://localhost:5001";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [createActive, setCreateActive] = useState(false);

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

  const completeTodo = (id) => {
    fetch(API_BASE + "/todo/editComplete/" + id, { method: "PUT" })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        setTodos((todos) => {
          return todos.map((todo) => {
            if (todo._id === id) {
              todo.complete = data.complete;
              console.log("Working");
            }
            return todo;
          });
        });
      });
  };

  const deleteTodo = (id) => {
    fetch(API_BASE + "/todo/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .then(setTodos((todos) => todos.filter((todo) => todo._id !== id)))
      .catch((error) => console.log("Error: " + error.message));
  };

  const handleChange = (e) => {
    console.log("Value: ", e.target.value);
    setNewTodo(e.target.value);
  };

  const addTodo = async () => {
    try {
      const response = await fetch(API_BASE + "/todo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
        }),
      });

      const data = await response.json();
      setTodos([...todos, data]);
      setCreateActive(false);
      setNewTodo(" ");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  //Separation

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
                <div className="checkbox" onClick={() => completeTodo(todo._id)}>
                  0
                </div>
                <div className={"todo-text " + (todo.complete ? "completed" : "")}>{todo.text}</div>
                <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                  x
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="open-popup" onClick={() => setCreateActive(true)}>
        <p>+</p>
      </div>

      {createActive ? (
        <div className="modal-popup">
          <div className="create-task">
            <div className="popup-header">
              <div className="close-popup" onClick={() => setCreateActive(false)}>
                x
              </div>
              <h3>Add Task</h3>
            </div>
            <div className="popup-body">
              <input type="text" className="add-todo" onChange={handleChange} value={newTodo} />
              {newTodo}
              <div className="button" onClick={addTodo}>
                Create
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
