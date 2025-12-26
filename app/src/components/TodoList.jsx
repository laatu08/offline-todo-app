export default function TodoList({ todos }) {
  if (!todos.length) {
    return (
      <p className="text-gray-500 text-sm mt-4">
        No todos found.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {todos.map((t) => (
        <li
          key={t.id}
          className="flex justify-between items-center bg-white border rounded-md px-4 py-3 shadow-sm"
        >
          <div>
            <p className="font-medium">{t.title}</p>
            <p className="text-xs text-gray-500">
              {t.status} • {t.priority}
            </p>
          </div>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              t.priority === "high"
                ? "bg-red-100 text-red-700"
                : t.priority === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {t.priority}
          </span>
        </li>
      ))}
    </ul>
  );
}
