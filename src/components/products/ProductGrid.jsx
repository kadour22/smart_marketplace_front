import ProductCard from './ProductCard'

const ProductsGrid = ({ products }) => {
    const BASE_URL = "http://127.0.0.1:8000"
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} image={BASE_URL+product.image} />
      ))}
    </div>
  );
};

export default ProductsGrid