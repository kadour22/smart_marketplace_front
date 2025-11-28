import React,{use, useEffect,useState} from 'react'
import { getProductsList } from './services/products_services'

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    // console.log(localStorage.getItem("access_token"))
    useEffect(()=>{
        const fetchProducts = async () => {
            try{
                const response = await getProductsList();
                
                setProducts(response);
            }catch(error){
                console.error("Error in fetching products inside component:", error);
            }
        }
        fetchProducts();
    },[])
    return (
    <div>
        <h2>Products List</h2>
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.product_name} - ${product.price}</li>
            ))}
        </ul>
    </div>
  )
}

export default ProductsList