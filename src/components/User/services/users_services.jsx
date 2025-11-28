import AxiosInstace from "../../../AxiosInstance/call_api";

export const LoginUser = async (credentials) => {
    try{
        const response = await AxiosInstace.post("users/login/", credentials);
        return response.data;
    }catch(error){
        console.error("Error logging in user:", error);
        throw error;
    }
}