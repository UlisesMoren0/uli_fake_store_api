import { getProductByCategory } from "@/http/categories";
import type { Category } from "@/interface/category";
import type { Product } from "@/interface/product";
import { create } from "zustand";

interface CategoryDisplay {
    id: string;
    name: string;
    displayName: string;
    icon: string;
    image: string;
    slug: string;
}

interface ProductsByCategoryStore {
    categories: Product[];                    // Productos de la categoria actual
    availableCategories: CategoryDisplay[];   // Lista de categorias para UI
    currentCategory: string | null;
    loading: boolean;
    loadingCategories: boolean;
    error: string | null;
    
    fetchAvailableCategories: () => Promise<void>;
    fetchProductsByCategory: (name: string) => Promise<void>;
    setCurrentCategory: (name: string) => void;
}

const useProductsByCategory = create<ProductsByCategoryStore>((set) => ({
    categories: [],
    availableCategories: [],
    currentCategory: null,
    loading: false,
    loadingCategories: false,
    error: null,

    // 🚀 Obtener categorías extrayendo de productos
    fetchAvailableCategories: async () => {
        set({ loadingCategories: true, error: null });
        try {
            // 🆕 Obtener todos los productos para extraer categorías únicas
            const allProducts: Product[] = await getProductByCategory("all");
            
            // 🎯 Extraer categorías únicas de los productos
            const uniqueCategories = new Map<string, Category>();
            
            for (const product of allProducts) {
                if (product.category && !uniqueCategories.has(product.category.id.toString())) {
                    uniqueCategories.set(product.category.id.toString(), product.category);
                }
            }
            
            const apiCategories: Category[] = Array.from(uniqueCategories.values());
            
            // Mapear a formato de UI
            const categoryIcons: { [key: string]: string } = {
                "electronics": "🔌",
                "jewelery": "💎",
                "men's clothing": "👔",
                "women's clothing": "👗",
                "shoes": "👟",
                "furniture": "🪑",
                "clothes": "👕",
                "miscellaneous": "📦"
            };

            const formattedCategories: CategoryDisplay[] = [
                // Categoría "Todos" al inicio
                {
                    id: "all",
                    name: "all",
                    displayName: "Todos los Productos",
                    icon: "🛍️",
                    image: "",
                    slug: "all"
                },
                // Categorías extraídas de productos
                ...apiCategories.map((category: Category) => ({
                    id: category.id.toString(),
                    name: category.name,
                    displayName: category.name.charAt(0).toUpperCase() + category.name.slice(1),
                    icon: categoryIcons[category.name.toLowerCase()] || "📦",
                    image: category.image,
                    slug: category.slug
                }))
            ];

            console.log('🎯 Categorías extraídas:', formattedCategories);

            set({ 
                availableCategories: formattedCategories,
                loadingCategories: false 
            });

        } catch (error) {
            console.error('❌ Error al cargar categorías:', error);
            set({ 
                error: error instanceof Error ? error.message : 'Error al cargar categorías',
                loadingCategories: false 
            });
        }
    },

    // 🎯 Obtener productos usando tu HTTP
    fetchProductsByCategory: async (categoryNameOrId: string) => {
        set({ loading: true, error: null });
        try {
            // 📡 Usar tu función HTTP directamente
            const products: Product[] = await getProductByCategory(categoryNameOrId);
            
            set({ 
                categories: products,
                currentCategory: categoryNameOrId,
                loading: false 
            });

        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Error al cargar productos',
                loading: false 
            });
        }
    },

    setCurrentCategory: (name: string) => {
        set({ currentCategory: name });
    }
}));

export { useProductsByCategory };