import { addTodo } from "../db/todoRepo";
import { nanoid } from "nanoid";

export default function TodoForm({ onAdd, categories }) {
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
    <form
      onSubmit={submit}
      className="bg-white p-4 rounded-lg shadow-sm border flex flex-col gap-3"
    >
      <input
        name="title"
        placeholder="What needs to be done?"
        required
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3">
        <select
          name="priority"
          className="flex-1 border rounded-md px-2 py-2"
        >
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>

        <select
  name="category"
  className="flex-1 border rounded-md px-2 py-2"
  required
>
  <option value="">Select category</option>
  {categories.map((c) => (
    <option key={c.id} value={c.id}>
      {c.name}
    </option>
  ))}
</select>

      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
      >
        Add Todo
      </button>
    </form>
  );
}
