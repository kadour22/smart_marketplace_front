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

