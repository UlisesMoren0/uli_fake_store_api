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

export function NavigationMenuCategory() {
    const { 
        availableCategories,
        loadingCategories,
        error,
        fetchAvailableCategories,
        fetchProductsByCategory,
        setCurrentCategory,
    } = useProductsByCategory();

    // 🚀 Cargar categorías al inicio
    useEffect(() => {
        fetchAvailableCategories();
    }, [fetchAvailableCategories]);

    // 🐛 Debug logs
    console.log('Debug NavigationMenu:', {
        availableCategories,
        loadingCategories,
        error,
        categoriesLength: availableCategories?.length
    });

    // 🎯 Manejar selección simple
    const handleCategorySelect = async (categoryId: string) => {
        try {
            await fetchProductsByCategory(categoryId);
            setCurrentCategory(categoryId);
        } catch (error) {
            console.error('Error al seleccionar categoría:', error);
        }
    };

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <div className="titleNavText">Bape Store</div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="menu-content-container">
                            {/* 🐛 Mostrar estados de loading/error */}
                            {loadingCategories && (
                                <div className="loading-container">Cargando categorías...</div>
                            )}
                            
                            {error && (
                                <div className="error-container">
                                    <span className="error-text">Error: {error}</span>
                                </div>
                            )}
                            
                            {!loadingCategories && !error && availableCategories.length === 0 && (
                                <div className="empty-container">No hay categorías disponibles</div>
                            )}
                            
                            {!loadingCategories && !error && availableCategories.length > 0 && (
                                <ul className="categories-grid">
                                    {availableCategories.map((category) => (
                                        <li key={category.id}>
                                            <NavigationMenuLink
                                                onClick={() => handleCategorySelect(category.id)}
                                                className="category-item"
                                            >
                                                {category.image ? (
                                                    <img 
                                                        src={category.image} 
                                                        alt={category.displayName}
                                                        className="category-image"
                                                    />
                                                ) : (
                                                    <span className="category-icon">{category.icon}</span>
                                                )}
                                                
                                                <div className="category-text-container">
                                                    <span className="category-name">
                                                        {category.displayName}
                                                    </span>
                                                </div>
                                            </NavigationMenuLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}