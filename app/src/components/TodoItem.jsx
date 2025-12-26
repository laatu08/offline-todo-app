import { toggleTodoStatus } from "../db/todoRepo";

export default function TodoItem({ todo, onToggle }) {
  return (
    <li
      onClick={() => onToggle(todo.id)}
      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 cursor-pointer
        ${todo.status === "completed"
          ? "border-gray-300 opacity-60 line-through"
          : "border-indigo-500"
        }`}
    >
      <p className="font-medium">{todo.title}</p>
      <p className="text-xs text-gray-500">
        {todo.priority} priority
      </p>
    </li>
  );
}

