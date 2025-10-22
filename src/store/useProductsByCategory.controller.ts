import { getProductByCategory } from "@/http/categories";
import type { Category } from "@/interface/category";
import { create } from "zustand";

interface ProductsByCategoryStore {
    categories: Category[];
    loading?: boolean;
    fetchProductsByCategory: (name: string) => Promise<void>;
}

const useProductsByCategory = create<ProductsByCategoryStore>((set) => ({
    categories: [],
    loading: false,
    fetchProductsByCategory: async (name: string) => {
        set({ loading: true });
        const products = await getProductByCategory(name);
        set({ categories: products });
    },
}));

export { useProductsByCategory };