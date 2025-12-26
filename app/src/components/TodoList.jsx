export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((t) => (
        <li key={t.id}>
          {t.title} • {t.status} • {t.priority}
        </li>
      ))}
    </ul>
  );
}
