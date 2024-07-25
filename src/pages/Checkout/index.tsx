import React, { useState } from 'react';
import { FaixaSuperiorCadLog } from '../../components/BottomBar/BottomBar';
import FrameCheckout from '../../components/FrameCheckout/FrameCheckout';
import { Product as ProductType } from '../../components/ProductsView/ProductsView';



// Definir o tipo ProductWithQuantity
type ProductWithQuantity = ProductType & { quantidade: number };


const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<ProductWithQuantity[]>([]);

  const addToCart = (product: ProductType) => {
    // Verificar se o produto já está no carrinho
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      // Se o produto já existe, incrementar a quantidade
      const updatedCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // Se o produto não existe, adicionar ao carrinho com quantidade inicial 1
      const newProduct: ProductWithQuantity = { ...product, quantidade: 1 };
      setCartItems([...cartItems, newProduct]);
    }
  };

  return (
    <div>
      <FaixaSuperiorCadLog />
      <FrameCheckout cartItems={cartItems}/>
      {/* Outros componentes */}
    </div>
  );
}

export default Checkout;