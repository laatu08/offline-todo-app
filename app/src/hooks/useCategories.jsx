import { useEffect, useState } from "react";
import { getAllCategories } from "../db/categoryRepo";


export function useCategories(){
    const [categories, setCategories]=useState([]);

    async function loadCategories() {
        const data=await getAllCategories();
        setCategories(data);
    }

    useEffect(()=>{
        loadCategories();
    },[]);

    return {categories, reload: loadCategories};
}