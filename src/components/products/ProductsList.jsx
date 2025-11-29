import React, { useEffect, useState } from "react";
import {
  getProductsList,
  SemanticSearchProducts,
} from "./services/products_services";

const ProductsList = () => {
  
  const [products, setProducts] = useState([]);
  const [semanticsearch, setSementicSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
 
  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    const display_all_products = async () => {
      try {
        const data = await getProductsList();
        setProducts(data);
      } catch (error) {
        console.log("error in loading products", error);
      } finally {
        setLoading(false);
      }
    };
    display_all_products();
  }, []);

const handleSementicSearch = async () => {
  try {
    const response = await SemanticSearchProducts(searchQuery);

    // If your backend returns { results: [...] }
    setSementicSearch(response.results);  

    setIsSearching(true);
  } catch (error) {
    console.log("Semantic search error:", error);
  }
};
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="search">
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSementicSearch}>Search</button>
      </div>
      {!isSearching ? (
        products?.map((product) => (
          <div key={product.id}>
            <h3>{product.product_name}</h3>
            <img src={BASE_URL + product.image} alt="" width={100} />
            <p>{product.description}</p>
            <small>{product.price} DT</small>
          </div>
        ))
      ) : (
        semanticsearch?.map((item) => (
          <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))
      )}

    </div>
  );
};

export default ProductsList;
