import { addTodo } from "../db/todoRepo";
import { nanoid } from "nanoid";

export default function TodoForm({ onAdd, categories }) {
  const submit = async (e) => {
    e.preventDefault();
    const f = e.target;

    const todo = {
      id: nanoid(),
      title: f.title.value,
      categoryId: f.category.value,
      priority: f.priority.value,
      status: "pending",
      createdAt: Date.now()
    };

    await addTodo(todo);
    onAdd();
    f.reset();
  };

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-[1fr_160px_120px_80px] gap-3 mb-6"
    >
      <input
        name="title"
        placeholder="What needs to be done?"
        className="border rounded-md px-3 py-2"
        required
      />

      <select
        name="category"
        className="border rounded-md px-3 py-2"
        required
      >
        <option value="">Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        name="priority"
        className="border rounded-md px-3 py-2"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button className="bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Add
      </button>
    </form>
  );
}

