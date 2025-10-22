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
                    <div className="font-bold">Bape Store</div>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-4 w-[400px] md:w-[500px] lg:w-[600px]">
                            {/* 🐛 Mostrar estados de loading/error */}
                            {loadingCategories && (
                                <div className="text-center py-4">Cargando categorías...</div>
                            )}
                            
                            {error && (
                                <div className="text-red-500 text-center py-4">
                                    Error: {error}
                                </div>
                            )}
                            
                            {!loadingCategories && !error && availableCategories.length === 0 && (
                                <div className="text-center py-4">No hay categorías disponibles</div>
                            )}
                            
                            {!loadingCategories && !error && availableCategories.length > 0 && (
                                <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                                    {availableCategories.map((category) => (
                                        <li key={category.id}>
                                            <NavigationMenuLink
                                                onClick={() => handleCategorySelect(category.id)}
                                                className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 cursor-pointer"
                                            >
                                                {category.image ? (
                                                    <img 
                                                        src={category.image} 
                                                        alt={category.displayName}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-2xl">{category.icon}</span>
                                                )}
                                                
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">
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