import { useState,useEffect } from "react"
import React from 'react'
import { useParams } from "react-router-dom";
import { DeleteProduct } from "./services/products_services";

const ProductDelete = () => {
    const {id} = useParams();
  return (
    <div>ProductDelete</div>
  )
}

export default ProductDelete