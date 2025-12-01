import React, { useEffect, useState } from "react";
import {
  getProductsList,
  SemanticSearchProducts,
} from "./services/products_services";
import ProductCard from "./ProductCard";
import AISearchBar from "../HeroSection/AISearchBar";
import ProductSearchCard from "./ProductSearchCard";
import ProductsGrid from "./ProductGrid";

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
            setSementicSearch(response.results);  
            setIsSearching(true);

        } catch (error) {
            console.log("Semantic search error:", error);
        }
    };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
        <AISearchBar handleSementicSearch={handleSementicSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <br /><br />
      {!isSearching ? (
          <ProductsGrid products={products}/>
      ) : (
        semanticsearch?.map((item) => (
          <ProductSearchCard item={item} image={BASE_URL+item.image}/>
        ))
      )}

    </div>
  );
};

export default ProductsList;
