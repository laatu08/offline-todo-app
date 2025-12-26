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

  // useEffect(()=>{
  //   seedCategories();
  // },[])

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <CategoryList
        categories={categories}
        active={todoState.categoryId}
        onSelect={todoState.setCategoryId}
      />

      <main>
        <h1>Offline Todo</h1>
        <Filters
          status={todoState.status}
          onChange={todoState.setStatus}
        />
<TodoForm
  onAdd={todoState.reload}
  categories={categories}
/>
<TodoList todos={todoState.todos} onChange={todoState.reload} />
      </main>
    </div>
  );
}
