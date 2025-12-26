const DB_NAME="offline_todo_db";
const DB_VERSION=1;

export function openDB(){
    return new Promise((resolve, reject)=>{
        const request=indexedDB.open(DB_NAME,DB_VERSION);

        request.onupgradeneeded=(e)=>{
            const db=e.target.result;

            if(!db.objectStoreNames.contains("categories")){
                db.createObjectStore("categories",{keyPath:"id"});
            }

            if(!db.objectStoreNames.contains("todos")){
                const store=db.createObjectStore("todos",{keyPath:"id"});

                store.createIndex("by_status","status");
                store.createIndex("by_category","categoryId");
                store.createIndex("by_priority","priority");
                store.createIndex("by_category_status",["categoryId","status"]);
            }
        }

        request.onsuccess=()=>resolve(request.result);
        request.onerror=()=>reject(request.error)
    })
}