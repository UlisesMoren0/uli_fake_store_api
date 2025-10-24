import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useCategories } from "@/store/useCategories.controller";
import { useCategoryContext } from "@/context/CategoryContext";
import { useProducts } from "@/store/useProducts.controller";
import { useEffect, useMemo } from "react";

export function NavigationMenuCategory() {
    const { categoriesMap, getCategories } = useCategories();
    const { products } = useProducts();
    const { selectedCategory, setSelectedCategory } = useCategoryContext();

    // 🎯 Obtener categorías únicas de los productos reales
    const availableCategories = useMemo(() => {
        if (products.length === 0) return [];
        
        const uniqueCategories = [...new Set(products.map(p => p.category.id))];
        return uniqueCategories.map(id => {
            const product = products.find(p => p.category.id === id);
            return {
                id,
                name: product?.category.name || `Categoría ${id}`,
                productCount: products.filter(p => p.category.id === id).length
            };
        });
    }, [products]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategory(categoryId.toString());
    };

    const handleShowAll = () => {
        setSelectedCategory('all');
    };

    const getCategoryDisplayName = (categoryId: string) => {
        const id = Number.parseInt(categoryId);
        return categoriesMap.get(id) || `Categoría ${categoryId}`;
    };

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <div className="titleNavText">Bape Store</div>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Categorías
                        {selectedCategory && selectedCategory !== 'all' && (
                            <span className="current-category-badge">
                                {getCategoryDisplayName(selectedCategory)}
                            </span>
                        )}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <div className="menu-content-container">
                            {/*  Mostrar estados de loading/error */}
                            {availableCategories.length === 0 && (
                                <div className="loading-container">Cargando categorías...</div>
                            )}

                            {availableCategories.length > 0 && (
                                <div className="categories-grid">
                                    {availableCategories.map((category) => (
                                        <NavigationMenuLink
                                            key={category.id}
                                            onClick={() => handleCategorySelect(category.id)}
                                            className="category-item"
                                        >
                                            <span className="category-icon">BAPE</span>
                                            <div className="category-content">
                                                <h4>{category.name}</h4>
                                                <p>ID: {category.id} ({category.productCount} productos)</p>
                                            </div>
                                        </NavigationMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <button
                        onClick={handleShowAll}
                        className={`all-products-button ${selectedCategory === 'all' || !selectedCategory ? 'active' : ''}`}
                    >
                        Ver Todos
                    </button>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
}