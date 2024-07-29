import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Menu";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Pagamento from "./pages/Pagamento";
import Mail from "./pages/ForgotPassword/ReceiveMail"
import Code from "./pages/ForgotPassword/InsertCode"
import Pass from "./pages/NewPass/NewPass"
import { CartProvider } from '../src/components/CartContext/CartContext'; // Importe o provedor do contexto
import ProtectedRoutes from './utils/ProtectedRoutes';

const AppRoutes: React.FC = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:productId" element={<Product />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Pagamento" element={<Pagamento />} />
        </Route>
        <Route path="/Recover" element={<Mail />} />
        <Route path="/Confirm" element={<Code />} />
        <Route path="/NewPass" element={<Pass />} />
      </Routes>
    </CartProvider>
  );
};

export default AppRoutes;
