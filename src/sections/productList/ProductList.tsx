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
        <div className="space-y-6">
            {/* 🔄 Estados de carga y error */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <p className="text-lg">Cargando productos...</p>
                </div>
            )}
            
            {error && (
                <div className="flex justify-center items-center py-8">
                    <p className="text-red-500 text-lg">Error: {error}</p>
                </div>
            )}

            {/* 🎨 Grid de productos usando ProductCard */}
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* 📦 Mensaje cuando no hay productos */}
            {!loading && !error && products.length === 0 && (
                <div className="flex justify-center items-center py-8">
                    <p className="text-gray-500 text-lg">No hay productos disponibles</p>
                </div>
            )}

            {/* 🔄 Botón cargar más */}
            {!loading && products.length > 0 && (
                <div className="flex justify-center pt-6">
                    <button 
                        onClick={fetchProducts}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Cargar más productos
                    </button>
                </div>
            )}
        </div>
    );
}