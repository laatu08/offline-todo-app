export default function CategoryList({ categories, active, onSelect }) {
  return (
    <nav className="space-y-1">
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

      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`w-full text-left px-3 py-2 rounded-md text-sm
            ${active === c.id
              ? "bg-indigo-50 text-indigo-600 font-medium"
              : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          {c.name}
        </button>
      ))}
    </nav>
  );
}
