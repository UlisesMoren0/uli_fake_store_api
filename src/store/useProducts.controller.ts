import { getProducts } from "@/http/products";
import type { Product } from "@/interface/product";
import { create } from "zustand";

interface ProductStore {
    products: Product[];
    productsMap: Map<number, Product>;
    loading: boolean;
    error: string | null;
    offset?: number;
    fetchProducts: () => Promise<void>;
    parseProductsByCategory: () => void;
    productsByCategoryMap?: Map<number, Product[]>;
}

export const useProducts = create<ProductStore>((set, get) => ({
    products: [],
    loading: false,
    error: null,
    offset: 0,
    productsMap: new Map<number, Product>(),
    fetchProducts: async () => {
        set({ loading: true });
        try {
            const promises = [
                getProducts(0),
                getProducts(20),
                getProducts(40),
            ];
            
            const results = await Promise.all(promises);
            const allProducts = results.flat().filter(Boolean);
            
            if (allProducts.length > 0) {
                const productsMap = new Map<number, Product>();
                for (const product of allProducts) {
                    productsMap.set(product.id, product);
                }
                const productsArray = Array.from(productsMap.values());
                
                set({ products: productsArray, loading: false, productsMap });
            } else {
                set({ error: "No se pudieron cargar los productos.", loading: false });
            }
        } catch (err) {
            set({ error: err instanceof Error ? err.message : "Error desconocido", loading: false });
        }
    },
    parseProductsByCategory: () => {
        const { products, loading } = get();
        if (loading) return;

        const categorizedProducts = new Map<number, Product[]>();
        for (const p of products) {
            const categoryId = p.category.id;
            if (!categorizedProducts.has(categoryId)) {
                categorizedProducts.set(categoryId, []);
            }
            categorizedProducts.get(categoryId)?.push(p);
        }
        set({ productsByCategoryMap: categorizedProducts });
    }
}));