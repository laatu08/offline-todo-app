import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onLoadMore,
  onShowLess,
  hasMore,
  isExpanded,
  onToggle,
  onDelete
}) {
  return (
    <div className="flex flex-col gap-3">
      
      {/* Todo items */}
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}

      {/* Pagination controls */}
      {(hasMore || isExpanded) && (
        <div
          className="
            flex flex-col gap-2
            sm:flex-row sm:justify-center sm:gap-4
            mt-2
          "
        >
          {hasMore && (
            <button
              onClick={onLoadMore}
              className="
                text-sm text-indigo-600 hover:underline
                py-2 px-3
                rounded-md
                hover:bg-indigo-50
                transition
              "
            >
              Load more
            </button>
          )}

          {isExpanded && (
            <button
              onClick={onShowLess}
              className="
                text-sm text-gray-600 hover:underline
                py-2 px-3
                rounded-md
                hover:bg-gray-100
                transition
              "
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
