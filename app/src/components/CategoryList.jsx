export default function CategoryList({ categories, active, onSelect }) {
  return (
    <aside className="w-48 bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Categories</h3>

      <ul className="space-y-1">
        <li
          onClick={() => onSelect(null)}
          className={`cursor-pointer px-2 py-1 rounded ${
            active === null
              ? "bg-blue-100 text-blue-700 font-medium"
              : "hover:bg-gray-100"
          }`}
        >
          All
        </li>

        {categories.map((c) => (
          <li
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`cursor-pointer px-2 py-1 rounded ${
              active === c.id
                ? "bg-blue-100 text-blue-700 font-medium"
                : "hover:bg-gray-100"
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
