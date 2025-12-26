export default function CategoryList({
  categories,
  active,
  onSelect,
  onDelete
}) {
  return (
    <nav className="space-y-1">
      {/* All Tasks */}
      <button
        onClick={() => onSelect(null)}
        className={`w-full text-left px-3 py-2 rounded-md text-sm
          ${active === null
            ? "bg-indigo-50 text-indigo-600 font-medium"
            : "hover:bg-gray-100 text-gray-700"
          }`}
      >
        All Tasks
      </button>

      {/* Categories */}
      {categories.map((c) => (
        <div
          key={c.id}
          className={`flex items-center justify-between rounded-md
            ${active === c.id ? "bg-indigo-50" : "hover:bg-gray-100"}
          `}
        >
          {/* Select category */}
          <button
            onClick={() => onSelect(c.id)}
            className={`flex-1 text-left px-3 py-2 text-sm rounded-md
              ${active === c.id
                ? "text-indigo-600 font-medium"
                : "text-gray-700"
              }`}
          >
            {c.name}
          </button>

          {/* Delete category (except default) */}
          {c.id !== "uncategorized" && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // 🔑 prevent select
                onDelete(c.id);
              }}
              className="
                mr-2 text-gray-400 hover:text-red-500
                p-1 rounded
                focus:outline-none
              "
              title="Delete category"
            >
              🗑️
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}
