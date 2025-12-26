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