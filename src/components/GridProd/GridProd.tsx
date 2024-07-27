import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../GridProd/gridprod.css'; // Importe o arquivo CSS para estilização

import { Product } from '../../components/ProductsView/ProductsView'; // Importe Product do local correto

type FrameProps = {
  addToCart: (product: Product) => void; // Recebe a função para adicionar ao carrinho
};

type ProductWithQuantity = Product & { quantidade: number };

const FrameProd: React.FC<FrameProps> = ({ addToCart }) => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Product>(`https://alm-api-zeta.vercel.app/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes do produto:', error);
      });
  }, [productId]);

  const imagensProduto = product?.imagem.split(',').map(image => `/img/tenis/${image.trim()}`) || [];
  const tamanhosProduto = product?.tamanhos.split(',') || [];

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize && product) {
      const productWithSize: ProductWithQuantity = {  
        ...product,
        id: Date.now(),
        tamanhos: selectedSize,
        quantidade: 1 // Adiciona o produto com quantidade inicial 1
      };

      // Chama a função para adicionar ao carrinho
      addToCart(productWithSize);

      // Atualiza o carrinho no localStorage
      let products: ProductWithQuantity[] = [];

      const storedProducts = localStorage.getItem('Produtos');

      if (storedProducts) {
        products = JSON.parse(storedProducts);

        // Verifica se o produto com o mesmo ID e tamanho já existe
        const existingProductIndex = products.findIndex(
          (item) => item.nome === productWithSize.nome && item.tamanhos === productWithSize.tamanhos
        );

        if (existingProductIndex !== -1) {
          // Atualiza a quantidade do produto existente
          products[existingProductIndex].quantidade += 1;
        } else {
          // Adiciona o novo produto ao carrinho
          products.push(productWithSize);
        }
      } else {
        // Se não houver produtos no localStorage, adiciona o novo produto
        products.push(productWithSize);
      }

      // Armazena os produtos atualizados no localStorage
      localStorage.setItem('Produtos', JSON.stringify(products));
    }
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  console.log(imagensProduto[0])

  return (
    <div className="corpo-grid-prod">
      <div className="img-grid-prod">
        <div className="linha-superior-grid">
          <div className="linha-superior-grid-div-img-1">
            <img src={imagensProduto[0]} alt="Imagem 1" />
          </div>
          <div className="linha-superior-grid-div-img-2">
            <img src={imagensProduto[1]} alt="Imagem 2" />
          </div>
        </div>
        <div className="linha-inferior-grid">
          <div className="linha-inferior-grid-div-img-1">
            <img src={imagensProduto[2]} alt="Imagem 3" />
          </div>
          <div className="linha-inferior-grid-div-img-2">
            <img src={imagensProduto[3]} alt="Imagem 4" />
          </div>
        </div>
      </div>
      <div className="info-grid-prod">
        <div className='quadrado-info-prod'>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '34px' }}>{product.nome}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>{product.marca}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '28px', paddingTop: '30px' }}>R$ {product.preco}</p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '22px', paddingTop: '30px' }}>Tamanhos</p>
          <ul className="tamanhos list-unstyled d-flex justify-content-center">
            {tamanhosProduto.map((tamanho, index) => (
              <li
                key={index}
                className={`quadradinho ${selectedSize === tamanho ? 'selecionado' : ''}`}
                onClick={() => handleSizeSelect(tamanho)}
              >
                {tamanho}
              </li>
            ))}
          </ul>
          <button
            className={`btn btn-dark ${selectedSize ? 'botao-selecionado' : ''}`}
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameProd;
