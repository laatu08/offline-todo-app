import { addTodo } from "../db/todoRepo";
import { nanoid } from "nanoid";

export default function TodoForm({ onAdd }) {
  const submit = async (e) => {
    e.preventDefault();

    const todo = {
      id: nanoid(),
      title: e.target.title.value,
      status: "pending",
      priority: e.target.priority.value,
      categoryId: e.target.category.value,
      createdAt: Date.now()
    };

    await addTodo(todo);
    onAdd();
    e.target.reset();
  };

  return (
    <form onSubmit={submit}>
      <input name="title" placeholder="Todo..." required />
      <select name="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select name="category">
        <option value="low">study</option>
        <option value="medium">work</option>
        <option value="high">life</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
