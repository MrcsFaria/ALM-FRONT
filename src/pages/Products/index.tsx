import React, { useEffect, useState } from 'react';
import { FaixaSuperiorProducts } from '../../../src/components/BarProducts/bp';
import BrandFilters from '../../../src/components/BrandFilters/bf';
import Sidebar from '../../../src/components/SidebarFilters/Sidebar';
import ProductView from '../../components/ProductsView/ProductsView';
import { useCart } from '../../components/CartContext/CartContext';
import './ProductsPageContent.css'; // Arquivo CSS para os estilos

const ProductsPageContent: React.FC = () => {
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [brandFilter, setBrandFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false); // Estado para controlar a visibilidade do overlay
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 825); // Estado para controlar o tamanho da tela
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

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible); // Alterna a visibilidade do overlay
  };

  const clearFilters = () => {
    setBrandFilter('');
    setPriceFilter('');
    setCategoryFilter(null);
  };

  // Hook para monitorar mudanças no tamanho da janela
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 826);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <FaixaSuperiorProducts cartItems={cartItems} />

      <div id='bd-div'>
        <BrandFilters onBrandFilterChange={handleBrandFilterChange} />
        {/* Renderiza o botão de mostrar/esconder filtros apenas em modo mobile */}
        {isMobileView ? (
          <button onClick={toggleOverlay}>
            {isOverlayVisible ? 'Esconder Filtros' : 'Mostrar Filtros'}
          </button>
        ) : (
          // Renderiza o sidebar diretamente se não for mobile
          <Sidebar
            onPriceFilterChange={handlePriceFilterChange}
            onCategoryFilterChange={handleCategoryFilterChange}
          />
        )}
      </div>

      {/* Overlay que mostra o Sidebar no mobile */}
      {isMobileView && isOverlayVisible && (
        <div className="sidebar-overlay">
          <div className="sidebar-container">
            <Sidebar
              onPriceFilterChange={handlePriceFilterChange}
              onCategoryFilterChange={handleCategoryFilterChange}
            />
            <button className="close-overlay" onClick={toggleOverlay}>
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Componente ProductView */}
      <ProductView
        priceFilter={priceFilter}
        brandFilter={brandFilter}
        categoryFilter={categoryFilter}
        addToCart={addToCart}
      />

      {/* Outros componentes */}
    </div>
  );
};

export default ProductsPageContent;
