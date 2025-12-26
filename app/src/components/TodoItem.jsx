import { toggleTodoStatus } from "../db/todoRepo";

export default function TodoItem({ todo, onChange }) {
  const handleToggle = async () => {
    await toggleTodoStatus(todo.id);
    onChange();
  };

  return (
    <li
      onClick={handleToggle}
      style={{
        cursor: "pointer",
        textDecoration:
          todo.status === "completed" ? "line-through" : "none"
      }}
    >
      {todo.title} • {todo.priority}
    </li>
  );
}
