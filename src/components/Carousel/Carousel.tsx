import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagem1 from '../../img/1.png';
import imagem2 from '../../img/2.png';
import imagem3 from '../../img/3.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MeuCarousel: React.FC = () => {
  const navigate = useNavigate();

  const handleCarouselItemClick1 = () => {
    navigate('/products?marca=Nike');
  };

  const handleCarouselItemClick2 = () => {
    navigate('/products?marca=Adidas');
  };

  const handleCarouselItemClick3 = () => {
    navigate('/products?marca=Puma');
  };


  return (
    <Carousel>
      <Carousel.Item onClick={handleCarouselItemClick1}>
        <img
          className="d-block w-100"
          src={imagem1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Nike</h3>
          <p>Confira os produtos da Nike</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={handleCarouselItemClick2}>
        <img
          className="d-block w-100"
          src={imagem2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Adidas</h3>
          <p>Confira os produtos da Adidas</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item onClick={handleCarouselItemClick3}>
        <img
          className="d-block w-100"
          src={imagem3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Puma</h3>
          <p>
          Confira os produtos da Puma
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MeuCarousel;
