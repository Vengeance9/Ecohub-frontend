"use server"
import { createCategory, getCategories } from "@/services/category.services";

export const getCategoriesAction = async () => {
    const result = await getCategories();
    return result;
};

export const createCategoryAction = async(name:string)=>{
    const result = await createCategory(name)
    return result;
}