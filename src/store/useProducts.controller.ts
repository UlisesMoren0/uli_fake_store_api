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
            const data = await getProducts(get().offset);
            if (data) {
                const productsMap = get().productsMap;
                for (const product of data) {
                    productsMap.set(product.id, product);
                }
                const productsArray = Array.from(productsMap.values());
                set({ products: productsArray, loading: false, offset: (get().offset ?? 0) + 10, productsMap });
            } else {
                set({ error: "No se pudieron cargar los productos.", loading: false });
            }
        } catch (err) {
            set({ error: err instanceof Error ? err.message : "Error desconocido", loading: false });
        }
    }
}));

