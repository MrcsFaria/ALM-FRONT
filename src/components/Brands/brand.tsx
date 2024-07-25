import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importe as imagens
import marca1 from '../../img/nb.png';
import marca2 from '../../img/puma.png';
import marca3 from '../../img/nike.png';
import marca4 from '../../img/adidas.png';
import marca5 from '../../img/jrd.png';

function FaixaMarcas() {
  return (
    <div className="faixa-marcas">
      <Link to="/products?marca=New Balance">
        <img src={marca1} alt="New Balance" className="img-fluid" />
      </Link>
      <Link to="/products?marca=Puma">
        <img src={marca2} alt="Puma" className="img-fluid" />
      </Link>
      <Link to="/products?marca=Nike">
        <img src={marca3} alt="Nike" className="img-fluid" />
      </Link>
      <Link to="/products?marca=Adidas">
        <img src={marca4} alt="Adidas" className="img-fluid" />
      </Link>
      <Link to="/products?marca=Jordan">
        <img src={marca5} alt="Jordan" className="img-fluid" />
      </Link>
    </div>
  );
}

export default FaixaMarcas;
