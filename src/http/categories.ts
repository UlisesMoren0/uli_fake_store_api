const getProductByCategory = async (name: string) => {
    try {
        let url: string;

        if (name === "all") {
            url = `https://api.escuelajs.co/api/v1/products`;
        } else {
            url = `https://api.escuelajs.co/api/v1/products?categoryId=${name}`;
        }
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
};




export { getProductByCategory };