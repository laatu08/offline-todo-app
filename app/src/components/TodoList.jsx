import TodoItem from "./TodoItem";

export default function TodoList({ todos, onChange }) {
  return (
    <ul>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onChange={onChange} />
      ))}
    </ul>
  );
}
