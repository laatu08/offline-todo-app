import { useTodos } from "./hooks/useTodos";
import { useCategories } from "./hooks/useCategories";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import CategoryList from "./components/CategoryList";
import Filters from "./components/Filters";

import { addCategory } from "./db/categoryRepo";
import { nanoid } from "nanoid";
import { useEffect } from "react";

async function seedCategories() {
  await addCategory({ id: nanoid(), name: "Study" });
  await addCategory({ id: nanoid(), name: "Work" });
  await addCategory({ id: nanoid(), name: "Life" });
}

export default function App() {
  const todoState = useTodos();
  const { categories } = useCategories();

  return (
<div className="h-full grid grid-cols-[260px_1fr] bg-gray-100">
      
      {/* Sidebar */}
      <aside className="bg-white border-r px-5 py-6">
        <h2 className="text-xl font-semibold mb-6">Offline Todo</h2>

        <CategoryList
          categories={categories}
          active={todoState.categoryId}
          onSelect={todoState.setCategoryId}
        />
      </aside>

      {/* Main */}
<main className="p-6 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">My Tasks</h1>

          <Filters
            status={todoState.status}
            onChange={todoState.setStatus}
          />
        </header>

         <div className="mb-4">
    <TodoForm
      onAdd={todoState.loadFirstPage}
      categories={categories}
    />
  </div>

        {/* 🔑 Scrollable list only */}
  <div className="flex-1 overflow-y-auto pr-2">
    <TodoList
      todos={todoState.todos}
      onLoadMore={todoState.loadMore}
      onShowLess={todoState.loadFirstPage}
      hasMore={todoState.hasMore}
      isExpanded={todoState.isExpanded}
      reloadCurrent={todoState.reloadCurrent}
      onToggle={todoState.toggleTodoOptimistic}
    />
  </div>

      </main>
    </div>
  );
}

