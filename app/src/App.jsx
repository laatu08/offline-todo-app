import { useTodos } from "./hooks/useTodos";
import { useCategories } from "./hooks/useCategories";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import CategoryList from "./components/CategoryList";
import Filters from "./components/Filters";

import { useEffect, useState } from "react";
import { getAllCategories, deleteCategoryDB } from "./db/categoryRepo";
import AddCategoryForm from "./components/AddCategoryForm";
import { addCategory } from "./db/categoryRepo";

export default function App() {
  const todoState = useTodos();
const { categories, reload: reloadCategories } = useCategories();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function ensureDefaultCategory() {
    const categories = await getAllCategories();
    const exists = categories.some((c) => c.name === "Uncategorized");

    if (!exists) {
      await addCategory({
        id: "uncategorized",
        name: "Uncategorized",
        color: "gray",
      });
    }
  }

  useEffect(() => {
    ensureDefaultCategory();
  }, []);

  async function handleDeleteCategory(id) {
  if (!confirm("Delete this category? Todos will be moved to Uncategorized.")) {
    return;
  }

  await deleteCategoryDB(id);
  await reloadCategories();
  todoState.refresh();
}

  return (
    <div className="h-full bg-gray-100 flex overflow-hidden">
      {/* Sidebar (drawer on mobile) */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r
          transform transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        <div className="px-5 py-6">
          <h2 className="text-xl font-bold mb-6">Offline Todo</h2>

          <CategoryList
            categories={categories}
            active={todoState.categoryId}
            onSelect={(id) => {
              todoState.setCategoryId(id);
              setSidebarOpen(false); // close drawer on mobile
            }}
              onDelete={handleDeleteCategory}
          />
          <AddCategoryForm onAdded={reloadCategories} />

        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 p-4 md:p-6 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-xl"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <h1 className="text-xl md:text-2xl font-semibold">My Tasks</h1>
          </div>

          <Filters status={todoState.status} onChange={todoState.setStatus} />
        </header>

        {/* Fixed TodoForm */}
        <div className="mb-3 shrink-0">
          <TodoForm onAdd={todoState.refresh} categories={categories} />
        </div>

        {/* Scrollable TodoList ONLY */}
        <div className="flex-1 overflow-y-auto pr-1">
          <TodoList
            todos={todoState.todos}
            hasMore={todoState.hasMore}
            isExpanded={todoState.isExpanded}
            onLoadMore={todoState.loadMore}
            onShowLess={todoState.loadFirstPage}
            onToggle={todoState.toggleTodoOptimistic}
            onDelete={todoState.deleteTodoOptimistic}
          />
        </div>
      </main>
    </div>
  );
}
