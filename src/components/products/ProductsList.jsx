import React, { useEffect, useState } from "react";
import {
    AISearch,
    getProductsList,
    SemanticSearchProducts,
} from "./services/products_services";

import ProductCard from "./ProductCard";
import AISearchBar from "../HeroSection/AISearchBar";
import ProductsGrid from "./ProductGrid";
import FeaturesSection from "../Features/FeatureSections";
import Loader from "../Loader/Loader";

const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [semanticsearch, setSementicSearch] = useState([]);
    const [aiResults, setAiResults] = useState([]); // <-- FIXED
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [searchMode, setSearchMode] = useState(""); // "ai" or "semantic"
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const display_all_products = async () => {
            try {
                const data = await getProductsList();
                setProducts(data);
            } catch (error) {
                console.log("error loading products", error);
            } finally {
                setLoading(false);
            }
        };
        display_all_products();
    }, []);

    // ---------------------------
    // SEMANTIC SEARCH
    // ---------------------------
    const handleSementicSearch = async () => {
        try {
            const response = await SemanticSearchProducts(searchQuery);
            setSementicSearch(response.results);
            setIsSearching(true);
            setSearchMode("semantic");
        } catch (error) {
            console.log("Semantic search error:", error);
        }
    };

    // ---------------------------
    // AI SEARCH
    // ---------------------------
    const handleAISearch = async () => {
        try {
            const response = await AISearch(searchQuery);
            setAiResults(response.results);    // <-- FIXED
            setIsSearching(true);
            setSearchMode("ai");
            console.log(response);
        } catch (error) {
            console.log("AI search error:", error);
        }
    };

    if (loading) return <Loader />;

    return (
        <>
            <div>
                <AISearchBar
                    handleAISearch={handleAISearch}
                    handleSementicSearch={handleSementicSearch}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <br /><br />

                {/* ---------- DEFAULT PRODUCTS ---------- */}
                {!isSearching && <ProductsGrid products={products} />}

                {/* ---------- SEMANTIC SEARCH RESULTS ---------- */}
                {isSearching && searchMode === "semantic" && (
                    <ProductsGrid products={semanticsearch} />
                )}

                {/* ---------- AI SEARCH RESULTS ---------- */}
                {isSearching && searchMode === "ai" && (
                    <ProductsGrid products={aiResults} />
                )}
            </div>

            <FeaturesSection />
        </>
    );
};

export default ProductsList;
