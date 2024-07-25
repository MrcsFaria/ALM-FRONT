import React from 'react';
import { FaixaSuperior } from '../../../src/components/TopBar/TopBar';
import { MenuSuperior } from '../../../src/components/TelaPrincipal/tela';
import { Faixa } from '../../../src/components/Bar/Bar';
import FrameProd from '../../../src/components/GridProd/GridProd';
import { Product as ProductType } from '../../components/ProductsView/ProductsView';
import { FaixaSuperiorProducts } from '../../components/BarProducts/bp';
import { CartProvider, useCart } from '../../components/CartContext/CartContext';

// Definir o tipo ProductWithQuantity
type ProductWithQuantity = ProductType & { quantidade: number };

const Product: React.FC = () => {
  return (
    <CartProvider>
      <ProductContent />
    </CartProvider>
  );
};

const ProductContent: React.FC = () => {
  const { cartItems, addToCart } = useCart();

  return (
    <div>
      <FaixaSuperiorProducts cartItems={cartItems} />
      <MenuSuperior />
      <Faixa />
      <FrameProd addToCart={addToCart} />
      {/* Outros componentes */}
    </div>
  );
};

export default Product;
