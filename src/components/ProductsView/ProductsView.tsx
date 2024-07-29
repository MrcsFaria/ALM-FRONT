import React, { useEffect, useState } from 'react';
import { BsFillBagFill } from "react-icons/bs";
import axios from 'axios';
import "./Product.css";
import { Link, useLocation } from 'react-router-dom';

export type Product = {
  id: number;
  nome: string;
  preco: number;
  marca: string;
  imagem: string;
  tamanhos: string;
  categoryId: number;
};

type ProductViewProps = {
  priceFilter: string;
  brandFilter: string;
  categoryFilter: number | null;
  addToCart: (product: Product) => void; // Função para adicionar ao carrinho com parâmetro de produto
};

const ProductView: React.FC<ProductViewProps> = ({ priceFilter, brandFilter, categoryFilter, addToCart }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Armazena todos os produtos
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Armazena os produtos filtrados
  const [cartItems, setCartItems] = useState<Product[]>([]); // Estado para armazenar os itens no carrinho
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  const location = useLocation(); // Obtém a localização da URL

  useEffect(() => {
    fetchProducts();
  }, [location.search]); // Dependência adicionada para atualizar quando a query da URL mudar

  useEffect(() => {
    applyFilters();
  }, [priceFilter, brandFilter, categoryFilter, allProducts, searchTerm]); // Include allProducts in dependencies to reapply filters when allProducts change

  // Função para buscar todos os produtos
  const fetchProducts = () => {
    const queryParams = new URLSearchParams(location.search);
    const marca = queryParams.get('marca') || '';
    const categoryId = queryParams.get('categoryId') || '';

    let url = 'https://alm-api-zeta.vercel.app/products';

    // Adiciona filtros na URL
    if (marca || categoryId) {
      url += `?${marca ? `marca=${marca}` : ''}${categoryId ? `${marca ? '&' : ''}categoryId=${categoryId}` : ''}`;
    }

    axios
      .get<Product[]>(url)
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  // Função para aplicar os filtros aos produtos
  const applyFilters = () => {
    const filtered = allProducts.filter((product) => {
      const priceMatches = (() => {
        switch (priceFilter) {
          case '0-250':
            return product.preco >= 0 && product.preco <= 250;
          case '250-600':
            return product.preco > 250 && product.preco <= 600;
          case '600-1000':
            return product.preco > 600 && product.preco <= 1000;
          case '1000+':
            return product.preco > 1000;
          default:
            return true;
        }
      })();

      const brandMatches = brandFilter ? product.marca === brandFilter : true;

      const categoryMatches = categoryFilter !== null ? product.categoryId === categoryFilter : true;

      const searchMatches = product.nome.toLowerCase().includes(searchTerm.toLowerCase());


      return priceMatches && brandMatches && categoryMatches  && searchMatches;
    });

    setFilteredProducts(filtered);
  };

  // Função para limpar filtros e mostrar todos os produtos
  const clearFilters = () => {
    axios
      .get<Product[]>('https://alm-api-zeta.vercel.app/products')
      .then((response) => {
        setAllProducts(response.data);
        setFilteredProducts(allProducts); // Set both allProducts and filteredProducts to show all products
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  };

  // Função para adicionar produto ao carrinho
  const handleAddToCart = (product: Product) => {
    addToCart(product); // Chama a função recebida por props para adicionar ao carrinho
    setCartItems([...cartItems, product]); // Adiciona o produto ao estado de carrinho
  };

  const getImageUrl = (imagePath: string): string => {
    // Retorna o caminho da imagem ajustado
    return `/img/tenis/${imagePath.trim()}`;
  };

  return (
    <div className="card-containerr">
      <div>
        <input
          type="text"
          placeholder="Pesquisar tênis"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='input-pesquisa'
        />
        <button onClick={clearFilters} className='botao-limpar'>
          Limpar Filtros
        </button>
      </div>
      <section className="div-prod">
        {filteredProducts.map((product) => (
          <section key={product.id} className="cardd">
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={getImageUrl(product.imagem.split(',')[0])} alt={product.nome} className="cardd-img" />
              <div className="cardd-details">
                <h3 className="cardd-title">{product.nome}</h3>
                <section className="cardd-price">
                  <div className="price">R$ {product.preco}</div>
                </section>
              </div>
            </Link>
          </section>
        ))}
      </section>
    </div>

  );
};

export default ProductView;
