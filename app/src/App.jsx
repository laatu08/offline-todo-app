import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const { todos, reload } = useTodos();

  return (
    <>
      <h1>Offline Todo</h1>
      <TodoForm onAdd={reload} />
      <TodoList todos={todos} />
    </>
  );
}
