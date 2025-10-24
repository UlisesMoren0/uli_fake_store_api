import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../interface/product";
import { useProducts } from "../../store/useProducts.controller";
import ProductCard from "../productCard/productCard";
import { useCategories } from "@/store/useCategories.controller";
import { useCategoryContext } from "@/context/CategoryContext";

export function ProductList() {
    const { products, loading, error, fetchProducts } = useProducts();
    const { categoriesMap, getCategories } = useCategories();
    const { selectedCategory } = useCategoryContext();
    
    const [displayLimit, setDisplayLimit] = useState(10);
    const ITEMS_PER_PAGE = 10;

    const filteredProducts = useMemo(() => {
        if (!selectedCategory || selectedCategory === 'all') {
            return products;
        }
        
        return products.filter(product => 
            product.category.id.toString() === selectedCategory
        );
    }, [products, selectedCategory]);

    const productsToDisplay = useMemo(() => {
        return filteredProducts.slice(0, displayLimit);
    }, [filteredProducts, displayLimit]);

    const showMoreProducts = () => {
        setDisplayLimit(prev => prev + ITEMS_PER_PAGE);
    };

    const resetPagination = () => {
        setDisplayLimit(ITEMS_PER_PAGE);
    };

    useEffect(() => {
        resetPagination();
    }, [selectedCategory]);

    const getCategoryDisplayName = (categoryId: string) => {
        const id = Number.parseInt(categoryId);
        return categoriesMap.get(id) || `Categoría ${categoryId}`;
    };

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
        if (categoriesMap.size === 0) {
            getCategories();
        }
    }, [fetchProducts, getCategories, products.length, categoriesMap.size]);

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

    return (
        <div className="product-list-container">
            {selectedCategory && selectedCategory !== 'all' && (
                <div className="category-info">
                    <h3>
                        Categoría: {getCategoryDisplayName(selectedCategory)}
                    </h3>
                    <p className="category-count">
                        Mostrando {productsToDisplay.length} de {filteredProducts.length} productos
                    </p>
                </div>
            )}

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner">
                        <div className="loading-text">
                            Cargando productos...
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-container">
                    <p className="error-text">Error: {error}</p>
                </div>
            )}

            {!loading && !error && productsToDisplay.length > 0 && (
                <div className="product-grid">
                    {productsToDisplay.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {!loading && !error && filteredProducts.length > displayLimit && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <button
                        onClick={showMoreProducts}
                        className="px-6 py-3 bg-blue-500 text-white border-none rounded-md text-base cursor-pointer shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:bg-blue-700"
                    >
                        Mostrar más productos ({filteredProducts.length - displayLimit} restantes)
                    </button>
                </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
                <div className="empty-container">
                    <p className="empty-text">No hay productos disponibles</p>
                </div>
            )}
        </div>
    );
}