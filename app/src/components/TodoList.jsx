import { toggleTodoStatus } from "../db/todoRepo";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  onLoadMore,
  onShowLess,
  hasMore,
  isExpanded,
  reloadCurrent
}) {
  return (
    <div className="space-y-3">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={async (id) => {
            await toggleTodoStatus(id);
            reloadCurrent(); // IMPORTANT
          }}
        />
      ))}

      {hasMore && (
        <button
          onClick={onLoadMore}
          className="text-sm text-indigo-600 hover:underline"
        >
          Load more
        </button>
      )}

      {isExpanded && (
        <button
          onClick={onShowLess}
          className="text-sm text-gray-500 hover:underline"
        >
          Show less
        </button>
      )}
    </div>
  );
}
