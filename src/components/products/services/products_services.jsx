import AxiosInstace from "../../../AxiosInstance/call_api";

export const getProductsList = async () => {
    try{
        const response = await AxiosInstace.get("products/products-list/");
        return response.data;
    }catch(error){
        console.error("Error fetching products list:", error);
        throw error;
    }
}

export const getProductDetails = async (productId) => {
    try{
        const response = await AxiosInstace.get(`products/product/${productId}/`);
        return response.data;
    }catch(error){
        console.error("Error fetching product details:", error);
        throw error;
    }
}

export const createProduct = async (productData) => {
    try{
        const response = await AxiosInstace.post("products/products-list/", productData);
        return response.data;
    }catch(error){
        console.error("Error creating product:", error);
        throw error;
    }
}

export const SemanticSearchProducts = async (query) => {
    try{
        const response = await AxiosInstace.get(`products/search/?q=${query}`);
        return response.data;
    }catch(error){
        console.error("Error performing semantic search:", error);
        throw error;
    }
}