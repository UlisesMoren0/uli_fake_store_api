import { useEffect } from "react";
import type { Product } from "../../interface/product";
import { useProducts } from "../../store/useProducts.controller";


export function ProductList() {
    const { products, error, loading, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, []);

    const ProductRow = ({product}: {product: Product}) => {

        return (
            <li key={product.id}>
                <p>{product.title}</p>
                {/* <img src={product.images[0]} alt={product.title} /> */}
            </li>
        );
    }

    return (
        <div>
            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <ul>
                {products.map((product: Product) => (
                    <ProductRow key={product.id} product={product} />
                ))}
            </ul>
                <button onClick={fetchProducts}>Cargar mas...</button>
        </div>
    );
}