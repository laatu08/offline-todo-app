import { useEffect, useState } from "react";
import { getTodosPaginated } from "../db/todoRepo";

const PAGE_SIZE = 5;

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [status, setStatus] = useState("all");

  // UI-driven pagination state
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [hasMore, setHasMore] = useState(true);

  // 🔑 Derived UI state (NO manual toggling)
  const isExpanded = pageSize > PAGE_SIZE;

  // Single authoritative loader
  async function load() {
    const { results, nextKey } = await getTodosPaginated({
      categoryId,
      status,
      pageSize
    });

    setTodos(results);
    setHasMore(!!nextKey);
  }

  // Collapse to first page
  function loadFirstPage() {
    setPageSize(PAGE_SIZE);
  }

  // Expand list
  function loadMore() {
    if (!hasMore) return;
    setPageSize((prev) => prev + PAGE_SIZE);
  }

  // Reload current size (used after toggle)
  function reloadCurrent() {
    load();
  }

  // Re-run whenever filters OR pageSize change
  useEffect(() => {
    load();
  }, [categoryId, status, pageSize]);

  return {
    todos,
    hasMore,
    isExpanded,

    loadMore,
    loadFirstPage,
    reloadCurrent,

    setCategoryId,
    setStatus,
    categoryId,
    status
  };
}
