import React, { ReactNode, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Trending/trend.css';

type Product = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
};

type FrameProps = {
  children: ReactNode;
};

function Frame({ children }: FrameProps) {
  return (
    <div className="comp-alta">
      {children}
    </div>
  );
}

function Alta() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('https://alm-api-zeta.vercel.app/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar os produtos!", error);
      });
  }, []);

  const getImagesArray = (imageString: string): string[] => {
    return imageString.split(',').map(image => `/img/tenis/${image.trim()}`);
  };


  return (
    <div className="trending-corpo">
      <div className='grid-trend'>
        <Row className="row-cols-1 row-cols-md-6 g-10">
          {products.map((product, index) => (
            <Col key={product.id} className="mb-4">
              <Card className="image-frame-card text-left">
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="image-frame">
                    <img
                      src={getImagesArray(product.imagem)[0]} // Mostra apenas a primeira imagem
                      alt={`Imagem ${index + 1}`}
                      className="img-fluid"
                    />
                  </div>
                  <Card.Body>
                    <Card.Text style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{product.nome}</Card.Text>
                    <Card.Text style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>R$ {product.preco}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

function FrameTrending() {
  return (
    <Frame>
      <Alta />
    </Frame>
  );
}

export default FrameTrending;
