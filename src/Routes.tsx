import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Menu";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Pagamento from "./pages/Pagamento";
import { CartProvider } from '../src/components/CartContext/CartContext'; // Importe o provedor do contexto

const AppRoutes: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:productId" element={<Product />} />
        <Route path="/Pagamento" element={<Pagamento />} />
      </Routes>
    </CartProvider>
  );
};

export default AppRoutes;
