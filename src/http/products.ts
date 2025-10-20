const getProducts = async (offset: number = 0) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
}

export { getProducts };