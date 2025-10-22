import { useProductsByCategory } from "@/store/useProductsByCategory.controller";
import { useEffect } from "react";
import type { Product } from "../../interface/product";
import { useProducts } from "../../store/useProducts.controller";
import ProductCard from "../productCard/productCard";
import { getCategoryDisplayName } from '../../store/categoryMapper'


export function ProductList() {
    const {
        categories: categoryProducts,
        currentCategory,
        loading: categoryLoading,
        error: categoryError,
        showingAllProducts,
        allCategoryProducts,
        showAllProducts
    } = useProductsByCategory();

    const {
        products: allProducts,
        loading: productsLoading,
        error: productsError,
        fetchProducts
    } = useProducts();

    useEffect(() => {
        if (!currentCategory) {
            // Si no hay categoría actual, cargar todos los productos
            fetchProducts();
        }
    }, [currentCategory, fetchProducts]);

    //Determino que productos mostrar
    const productsToShow = currentCategory ? categoryProducts : allProducts;
    const isLoading = currentCategory ? categoryLoading : productsLoading;
    const error = currentCategory ? categoryError : productsError;



    return (
        <div className="product-list-container">
            {/* Ahora muestra la categoria actual */}
            {currentCategory && (
                <div className="category-info">
                    <h3>
                        {currentCategory === "all" ? "Todos los Productos" : `Categoría: ${getCategoryDisplayName(currentCategory)}`}
                    </h3>
                    <p className="category-count">
                        Mostrando {categoryProducts.length} de {categoryProducts.length} productos
                    </p>
                    {!showingAllProducts && allCategoryProducts.length > 10 && (
                        <button onClick={showAllProducts} className="show-all-button">
                            Mostrar todos los productos
                        </button>
                    )}
                </div>
            )}

            {/*  estados de loading/error */}
            {isLoading && (
                <div className="loading-container">
                    <div className="loading-spinner">
                        {/*INSERTAR SPINNER PENDEJO*/}
                        <div className="loading-text">
                            {currentCategory ? "Cargando productos de la categoría..." : "Cargando productos..."}
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-container">
                    <p className="error-text">Error: {error}</p>
                </div>
            )}

            {/* 🎨 Grid de productos usando ProductCard */}
            {!isLoading && !error && productsToShow.length > 0 && (
                <div className="product-grid">
                    {productsToShow.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* 📦 Mensaje cuando no hay productos */}
            {!isLoading && !error && productsToShow.length === 0 && (
                <div className="empty-container">
                    <p className="empty-text">No hay productos disponibles</p>
                </div>
            )}

            {/* 🔄 Botón cargar más */}
            {!isLoading && productsToShow.length > 0 && (
                <div className="load-more-container">
                    <button
                        onClick={fetchProducts}
                        className="load-more-button"
                    >
                        Cargar más productos
                    </button>
                </div>
            )}
        </div>
    );
}