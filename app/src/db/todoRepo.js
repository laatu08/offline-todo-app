import { openDB } from ".";

export async function addTodo(todo) {
    const db=await openDB();
    const tx=db.transaction("todos","readwrite");
    tx.objectStore("todos").add(todo);
}


export async function getTodosByCategoryAndStatus(categoryId, status) {
    const db=await openDB();
    const tx=db.transaction("todos","readonly");
    const index=tx.objectStore("todos").index("by_category_status");

    return new Promise((resolve)=>{
        const req=index.getAll([categoryId,status]);
        req.onsuccess=()=>resolve(req.result);
    })
}


export async function getAllTodos() {
    const db=await openDB();
    const tx=db.transaction("todos","readonly");
    const store=tx.objectStore("todos");

    return new Promise((resolve)=>{
        const req=store.getAll();
        req.onsuccess=()=>resolve(req.result);
    })
}

export async function getTodosByStatus(status) {
    const db=await openDB();
    const tx=db.transaction("todos","readonly");
    const index=tx.objectStore("todos").index("by_status");

    return new Promise((resolve)=>{
        const req=index.getAll(status);
        req.onsuccess=()=>resolve(req.result);
    })
}

export async function getTodosByCategory(categoryId) {
  const db = await openDB();
  const tx = db.transaction("todos", "readonly");
  const index = tx.objectStore("todos").index("by_category");

  return new Promise((resolve) => {
    const req = index.getAll(categoryId);
    req.onsuccess = () => resolve(req.result);
  });
}

export async function toggleTodoStatus(id) {
    const db=await openDB();
    const tx=db.transaction("todos","readwrite");
    const store=tx.objectStore("todos");

    return new Promise((resolve)=>{
        const req=store.get(id);

        req.onsuccess=()=>{
            const todo=req.result;

            if(!todo){
                return;
            }

            todo.status=todo.status==="pending"?"completed":"pending";
            store.put(todo);


            resolve(todo);
        }
    })
}