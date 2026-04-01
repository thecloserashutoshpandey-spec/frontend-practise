import TodoItem from "./TodoItem";

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
};

export default TodoList;