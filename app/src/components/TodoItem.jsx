import { toggleTodoStatus } from "../db/todoRepo";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 flex justify-between items-center
        ${todo.status === "completed"
          ? "border-gray-300 opacity-60 line-through"
          : "border-indigo-500"
        }`}
    >
      <div
        className="flex-1 cursor-pointer"
        onClick={() => onToggle(todo.id)}
      >
        <p className="font-medium">{todo.title}</p>
        <div className="flex">
        <p className="text-xs text-gray-500">
          {todo.priority} priority
        </p>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
        className="ml-3 text-gray-400 hover:text-red-500 cursor-pointer"
        title="Delete"
      >
        🗑️
      </button>
    </li>
  );
}


