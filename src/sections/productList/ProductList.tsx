import { useEffect } from "react";
import type { Product } from "../../interface/product";
import { useProducts } from "../../store/useProducts.controller";
import ProductCard from "../productCard/productCard";


export function ProductList() {
    const { products, error, loading, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="product-list-container">
            {/* 🔄 Estados de carga y error */}
            {loading && (
                <div className="loading-container">
                    <p className="loading-text">Cargando productos...</p>
                </div>
            )}
            
            {error && (
                <div className="error-container">
                    <p className="error-text">Error: {error}</p>
                </div>
            )}

            {/* 🎨 Grid de productos usando ProductCard */}
            {!loading && !error && products.length > 0 && (
                <div className="product-grid">
                    {products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* 📦 Mensaje cuando no hay productos */}
            {!loading && !error && products.length === 0 && (
                <div className="empty-container">
                    <p className="empty-text">No hay productos disponibles</p>
                </div>
            )}

            {/* 🔄 Botón cargar más */}
            {!loading && products.length > 0 && (
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