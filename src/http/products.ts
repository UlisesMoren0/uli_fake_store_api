const getProducts = async (offset: number = 0) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=50`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
};

const getProductByCategory = async (categoryId: number) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return null;
    }
};

export { getProducts, getProductByCategory };