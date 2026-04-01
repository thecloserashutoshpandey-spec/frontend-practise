const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <li className="todo-item">
      {todo.text}
      <button onClick={() => deleteTodo(todo.id)}>❌</button>
    </li>
  );
};

export default TodoItem;