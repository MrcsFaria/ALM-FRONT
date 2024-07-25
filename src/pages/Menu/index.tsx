import React from 'react';
import { MenuSuperior } from '../../../src/components/TelaPrincipal/tela';
import MeuCarousel from '../../../src/components/Carousel/Carousel';
import FaixaMarcas from '../../../src/components/Brands/brand';
import FrameTrending from '../../../src/components/Trending/Trending';
import { Faixa } from '../../../src/components/Bar/Bar';
import { Footer } from '../../../src/components/Footer/Footer';
import { FaixaSuperiorProducts } from '../../components/BarProducts/bp';
import { CartProvider, useCart } from '../../components/CartContext/CartContext';

const Menu: React.FC = () => {
  return (
    <CartProvider>
      <MenuContent />
    </CartProvider>
  );
};

const MenuContent: React.FC = () => {
  const { cartItems, addToCart } = useCart();

  return (
    <div>
      <FaixaSuperiorProducts cartItems={cartItems} />
      <MenuSuperior />
      <Faixa />
      <MeuCarousel />
      <FaixaMarcas />
      <FrameTrending />
      <Footer />
    </div>
  );
};

export default Menu;
