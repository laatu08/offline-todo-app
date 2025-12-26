import { useEffect, useState } from "react";
import {
  getAllTodos,
  getTodosByCategory,
  getTodosByCategoryAndStatus,
  getTodosByStatus,
} from "../db/todoRepo";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [status, setStatus] = useState("all");

  async function loadTodos() {
    let data;

    if (categoryId && status !== "all") {
      data = await getTodosByCategoryAndStatus(categoryId, status);
    } else if (categoryId) {
      data = await getTodosByCategory(categoryId);
    } else if (status !== "all") {
      data = await getTodosByStatus(status);
    } else {
      data = await getAllTodos();
    }

    setTodos(data);
  }

  useEffect(() => {
    loadTodos();
  }, [categoryId, status]);

  return {
    todos,
    setCategoryId,
    setStatus,
    reload: loadTodos,
    categoryId,
    status,
  };
}
