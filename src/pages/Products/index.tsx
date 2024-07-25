import React from 'react';
import { FaixaSuperiorProducts } from '../../../src/components/BarProducts/bp';
import BrandFilters from '../../../src/components/BrandFilters/bf';
import Sidebar from '../../../src/components/SidebarFilters/Sidebar';
import ProductView, { Product as ProductType } from '../../components/ProductsView/ProductsView';
import { CartProvider, useCart, ProductWithQuantity } from '../../components/CartContext/CartContext';

const ProductsPageContent: React.FC = () => {
  const [priceFilter, setPriceFilter] = React.useState<string>('');
  const [brandFilter, setBrandFilter] = React.useState<string>('');
  const [categoryFilter, setCategoryFilter] = React.useState<number | null>(null);
  const { cartItems, addToCart } = useCart();

  const handlePriceFilterChange = (filter: string) => {
    setPriceFilter(filter);
  };

  const handleBrandFilterChange = (brand: string) => {
    setBrandFilter(brand);
  };

  const handleCategoryFilterChange = (categoryId: number | null) => {
    setCategoryFilter(categoryId);
  };

  const clearFilters = () => {
    setBrandFilter(''); // Limpa o filtro de marca
    setPriceFilter(''); // Limpa o filtro de preço
    setCategoryFilter(null); // Limpa o filtro de categoria
  };

  return (
    <div>
      <FaixaSuperiorProducts cartItems={cartItems} />
      <BrandFilters onBrandFilterChange={handleBrandFilterChange}/>
      <Sidebar onPriceFilterChange={handlePriceFilterChange} onCategoryFilterChange={handleCategoryFilterChange} />
      <ProductView priceFilter={priceFilter} brandFilter={brandFilter} categoryFilter={categoryFilter} addToCart={addToCart} />
      {/* Outros componentes */}
    </div>
  );
};

export default ProductsPageContent;
