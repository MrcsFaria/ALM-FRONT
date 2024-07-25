import React, { useEffect, useState } from 'react';
import '../../css/menu.css'; // Importe o arquivo CSS para estilização
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { Link } from 'react-router-dom';
import imagem1 from '../../img/logo.png';
import imagem2 from '../../img/tenis/adc1.png';
import { Product } from '../ProductsView/ProductsView';
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useAuth } from '../../components/hook/useAuth'; // Importe o hook de autenticação

type ProductWithQuantity = Product & { quantidade: number };

type FaixaSuperiorProductsProps = {
  cartItems: ProductWithQuantity[];
};

const FaixaSuperiorProducts: React.FC<FaixaSuperiorProductsProps> = ({ cartItems }) => {
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [cartItemss, setCartItems] = useState<ProductWithQuantity[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const { isAuthenticated, requireAuth, redirectIfAuthenticated } = useAuth(); // Utilize o hook de autenticação


  const toggleCartDetails = () => {
    setShowCartDetails(!showCartDetails);
  };

  useEffect(() => {
    const storedProducts = localStorage.getItem("Produtos");
    if (storedProducts) {
      try {
        const productArray: ProductWithQuantity[] = JSON.parse(storedProducts);
        setCartItems(productArray);
      } catch (error) {
        console.error('Erro ao processar os produtos do localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    const storedProducts = localStorage.getItem("Produtos");
    if (storedProducts) {
      try {
        const productArray: ProductWithQuantity[] = JSON.parse(storedProducts);
        setCartItems(productArray);
      } catch (error) {
        console.error('Erro ao processar os produtos do localStorage:', error);
      }
    }
  }, [cartItems]);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setUserName(storedUserName);
  }, []);

  const handleIncreaseQuantity = (productId: number, productSize: string) => {
    const updatedItems = cartItemss.map(item => {
      if (item.id === productId && item.tamanhos === productSize) {
        return { ...item, quantidade: item.quantidade + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    localStorage.setItem('Produtos', JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (productId: number, productSize: string) => {
    const updatedItems = cartItemss.reduce((result, item) => {
      if (item.id === productId && item.tamanhos === productSize) {
        if (item.quantidade > 1) {
          result.push({ ...item, quantidade: item.quantidade - 1 });
        }
      } else {
        result.push(item);
      }
      return result;
    }, [] as ProductWithQuantity[]);
    setCartItems(updatedItems);
    localStorage.setItem('Produtos', JSON.stringify(updatedItems));
  };

  const handleLogout = () => {
    // Remove userName do localStorage
    localStorage.removeItem('userName');
    // Atualiza o estado para refletir a mudança
    setUserName(null);
  };

  const handleCheckoutClick = () => {
    // Verifica se o usuário está autenticado e redireciona para o checkout se necessário
    if (isAuthenticated) {
      redirectIfAuthenticated('/Checkout');
    } else {
      requireAuth('/SignIn'); // Redireciona para o login se não estiver autenticado
    }
  };

  const getImageUrl = (imagePath: string): string => {
    // Retorna o caminho da imagem ajustado
    return `/img/tenis/${imagePath.trim()}`;
  };

  return (
    <div className="faixa-superior">
      <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={imagem1}
          alt="Logo"
          className="img-fluid mx-3"
          style={{ height: '60px' }}
        />
      </Link>
      <nav>
        <a onClick={toggleCartDetails}>
          <div className="cart-icon-container relative">
            <AiOutlineShoppingCart className="nav-icons" style={{ color: 'white', cursor:'pointer' }} />
            {cartItemss.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full flex justify-center items-center w-5 h-5" style={{ cursor:'pointer'}}>
                {cartItemss.length}
              </span>
            )}
          </div>
        </a>
        {userName ? (
          <div className='user-div'>
            <FaRegUser style={{ color: 'white' }} />
            <span className="usuario" style={{ color: 'white' }}>
              {userName}
            </span>
            <div>
              <CiLogout style={{ color: 'white', height: '25px', width: '25px', cursor:'pointer'}} onClick={handleLogout} />
            </div>
          </div>
        ) : (
          <Link to={`/SignUp`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <AiOutlineUserAdd className="nav-icons" style={{ color: 'white', cursor:'pointer'}} />
          </Link>
        )}
      </nav>

      {showCartDetails && (
        <div className={`fixed top-0 right-0 z-50 bg-black shadow-2xl w-90 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-500`}>
          <h2 className='p-5 text-white text-2xl'>Carrinho</h2>
          <div className='p-5 text-white'>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {cartItemss.map((item, index) => (
                <li key={`${item.id}-${item.tamanhos}`} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                  {item.imagem && (
                    <img src={getImageUrl(item.imagem.split(',')[0])} alt={item.nome} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  )}
                  <span style={{ marginRight: '10px' }}>{item.nome}</span> - Tamanho: {item.tamanhos} - R$ {(item.preco * item.quantidade).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div className='grid grid-cols-2'>
            <button className='bg-secondary text-white' onClick={toggleCartDetails}>Fechar</button>
            <button className='bg-amber-600 text-white' onClick={handleCheckoutClick}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { FaixaSuperiorProducts };
