import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetails } from './services/products_services'
const ProductDetail = () => {
    const BASE_URL = "http://127.0.0.1:8000"
    const { id } = useParams();
    console.log(id)
    const [product, setProduct] = useState(null);
    console.log(product)
    useEffect(() => {
  const fetchData = async () => {
    const data = await getProductDetails(id); // wait for API response
    setProduct(data.result);                         // set actual product object
  };

  fetchData();
}, [id]);

  return (
    <div>
        <img src={product ? BASE_URL + product.image : ""} alt={product ? product.product_name : "Loading..."} />
        <p className="text-slate-600">Name : {product ? product.product_name : "Loading..."}</p>
    </div>
  )
}

export default ProductDetail    