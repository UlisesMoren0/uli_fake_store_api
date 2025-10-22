const getProductByCategory = async (name: string) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return null;
    }
};

export { getProductByCategory };