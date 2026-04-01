import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { initialTodos } from "./Data";
import "./App.css";
function App() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>Todo App</h1>

        <AddTodo addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;