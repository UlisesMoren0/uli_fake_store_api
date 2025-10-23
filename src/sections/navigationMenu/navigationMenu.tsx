import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useProductsByCategory } from "../../store/useProductsByCategory.controller";
import { useEffect } from "react";
import { useCategories } from "@/store/useCategories.controller";

export function NavigationMenuCategory() {
    const { categories, categoriesMap, getCategories } = useCategories();

    const {
        currentCategory,
        fetchProductsByCategory,
        setCurrentCategory,
        clearCategoryFilter,
    } = useProductsByCategory();

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleCategorySelect = async (categoryId: number) => {
        try {
            const categoryName = categoriesMap.get(categoryId);
            if (categoryName) {
                await fetchProductsByCategory(categoryName);
                setCurrentCategory(categoryId.toString());
            }
        } catch (error) {
            console.error('Error al seleccionar categoría:', error);
        }
    };

    const getCategoryDisplayName = (categoryId: string) => {
        const id = parseInt(categoryId);
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
                        {currentCategory && currentCategory !== 'all' && (
                            <span className="current-category-badge">
                                {getCategoryDisplayName(currentCategory)}
                            </span>
                        )}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                        <div className="menu-content-container">
                            {/*  Mostrar estados de loading/error */}
                            {categories.length === 0 && (
                                <div className="loading-container">Cargando categorías...</div>
                            )}

                            {categories.length > 0 && (
                                <div className="categories-grid">
                                    {categories.map((category) => (
                                        <NavigationMenuLink
                                            key={category.id}
                                            onClick={() => handleCategorySelect(category.id)}
                                            className="category-item"
                                        >
                                            {category.image ? (
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="category-image"
                                                />
                                            ) : (
                                                <span className="category-icon">BAPE</span>
                                            )}
                                            <div className="category-content">
                                                <h4>{category.name}</h4>
                                                <p>ID : {category.id}</p>
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
                        onClick={clearCategoryFilter}
                        className={`all-products-button ${!currentCategory ? 'active' : ''}`}
                    >
                        Ver Todos
                    </button>
                </NavigationMenuItem>

            </NavigationMenuList>
        </NavigationMenu>
    );
}