import { useState } from "react";
import { nanoid } from "nanoid";
import { addCategory } from "../db/categoryRepo";


export default function AddCategoryForm({ onAdded }) {
  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addCategory({
      id: nanoid(),
      name: name.trim(),
    });

    setName("");
    onAdded();
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category"
        className="w-full border rounded-md px-3 py-2"
      />

      <button className="w-full bg-indigo-600 text-white rounded-md py-2">
        Add Category
      </button>
    </form>
  );
}
