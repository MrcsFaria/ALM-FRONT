import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../ProductsView/ProductsView';

export interface ProductWithQuantity extends Product {
  quantidade: number;
}

type CartContextType = {
  cartItems: ProductWithQuantity[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductWithQuantity[]>(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('Produtos') || '[]') as ProductWithQuantity[];
    return storedCartItems;
  });

  useEffect(() => {
    localStorage.setItem('Produtos', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantidade += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantidade: 1 }]);
    }
  };

  const increaseQuantity = (productId: number) => {
    setCartItems(cartItems.map(item => item.id === productId ? { ...item, quantidade: item.quantidade + 1 } : item));
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems(cartItems
      .map(item => item.id === productId ? { ...item, quantidade: item.quantidade > 1 ? item.quantidade - 1 : 1 } : item)
      .filter(item => item.quantidade > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
