import { getCategories } from "@/http/categories";
import type { Category } from "@/interface/category";
import { create } from "zustand";

interface CategoriesStore {
    categories: Category[];
    categoriesMap: Map<number, string>;
    getCategories: () => Promise<void>;
}

const useCategories = create<CategoriesStore>((set, get) => ({
    categories: [],
    categoriesMap: new Map<number, string>(),
    getCategories: async () => {
        try {
            const res = await getCategories();
            if (res) {
                set({ categories: res, categoriesMap: new Map(res.map((cat: Category) => [cat.id, cat.name])) });
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
}));

export { useCategories };