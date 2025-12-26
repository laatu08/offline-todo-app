import { openDB } from ".";

export async function addCategory(category) {
    const db=await openDB();
    const tx=db.transaction("categories","readwrite");
    tx.objectStore("categories").add(category);
}

export async function getAllCategories() {
    const db=await openDB();
    const tx=db.transaction("categories","readonly");
    const store=tx.objectStore("categories");

    return new Promise((resolve)=>{
        const req=store.getAll();
        req.onsuccess=()=>resolve(req.result);
    })
}


export async function deleteCategoryDB(categoryId) {
  const db = await openDB();

  const tx = db.transaction(["categories", "todos"], "readwrite");
  const categoryStore = tx.objectStore("categories");
  const todoStore = tx.objectStore("todos");

  // 1️⃣ Delete category
  categoryStore.delete(categoryId);

  // 2️⃣ Reassign todos
  const index = todoStore.index("by_category");
  const req = index.openCursor(IDBKeyRange.only(categoryId));

  req.onsuccess = (e) => {
    const cursor = e.target.result;
    if (!cursor) return;

    const todo = cursor.value;
    todo.categoryId = "uncategorized";
    cursor.update(todo);
    cursor.continue();
  };

  return tx.complete;
}