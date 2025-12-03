import React, { useEffect, useState } from "react";
import {
    AISearch,
    getProductsList,
    SemanticSearchProducts,
} from "./services/products_services";
import AISearchBar from "../HeroSection/AISearchBar";
import ProductsGrid from "./ProductGrid";
import FeaturesSection from "../Features/FeatureSections";
import Loader from "../Loader/Loader";
import AISearchLoader from "../Loader/Loader";

const ProductsList = () => {

    const [products, setProducts] = useState([]);
    const [semanticsearch, setSementicSearch] = useState([]);
    const [aiResults, setAiResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchMode, setSearchMode] = useState(""); 
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

    const handleSementicSearch = async () => {
        setSearchLoading(true); // Start loading
        setIsSearching(false); // Hide previous results
        try {
            const response = await SemanticSearchProducts(searchQuery);
            setSementicSearch(response.results);
            setIsSearching(true);
            setSearchMode("semantic");
        } catch (error) {
            console.log("Semantic search error:", error);
        } finally {
            setSearchLoading(false); // Stop loading
        }
    };

    const handleAISearch = async () => {
        setSearchLoading(true); // Start loading
        setIsSearching(false); // Hide previous results
        try {
            const response = await AISearch(searchQuery);
            setAiResults(response.results);
            setIsSearching(true);
            setSearchMode("ai");
            console.log(response);
        } catch (error) {
            console.log("AI search error:", error);
        } finally {
            setSearchLoading(false); // Stop loading
        }
    };

    if (loading) return <AISearchLoader />;

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

                {/* ---------- SEARCH LOADING ---------- */}
                {searchLoading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader />
                        <p className="mt-4 text-slate-600 text-lg">
                            {searchMode === "ai" ? "AI is analyzing your request..." : "Searching products..."}
                        </p>
                    </div>
                )}

                {/* ---------- DEFAULT PRODUCTS ---------- */}
                {!isSearching && !searchLoading && <ProductsGrid products={products} />}

                {/* ---------- SEMANTIC SEARCH RESULTS ---------- */}
                {isSearching && searchMode === "semantic" && !searchLoading && (
                    <ProductsGrid products={semanticsearch} />
                )}

                {isSearching && searchMode === "ai" && !searchLoading && (
                    <ProductsGrid products={aiResults} />
                )}
            </div>

            <FeaturesSection />
        </>
    );
};

export default ProductsList;