import React from 'react'
import AxiosInstace from "../../AxiosInstance/call_api";
import { useState } from 'react';
const Login = () => {

    const [username, setUsername] = useState("kadour");
    const [password, setPassword] = useState("zaza");

    const handleLogin = async () => {
        try {
            const response = await AxiosInstace.post("customers/token/", {username, password});
            const {access, refresh} = response.data;
            
            if (access && refresh) {
                localStorage.setItem("access_token", access);
                localStorage.setItem("refresh_token", refresh);
                AxiosInstace.defaults.headers["Authorization"] = `Bearer ${access}`;
                console.log("user logged in")         
            }
        } catch (error) {
            console.log("Error logging in user:", error);
        }
    }

  return (
    <div>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login