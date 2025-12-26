import { useEffect, useState } from "react";
import { getAllTodos } from "../db/todoRepo";

export function useTodos(){
    const [todos,setTodos]=useState([]);

    async function loadTodos() {
        const data=await getAllTodos();
        setTodos(data);
    }

    useEffect(()=>{
        loadTodos();
    },[]);

    return {todos, reload: loadTodos};
}