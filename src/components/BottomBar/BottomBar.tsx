import React from 'react';
import '../../css/menu.css'; // Importe o arquivo CSS para estilização

import imagem1 from '../../img/logo.png';
import { Link } from 'react-router-dom';

function FaixaSuperiorCadLog() {
  return (
    <div className="faixa-superior d-flex align-items-center justify-content-between">
      <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <img
        src={imagem1} // Substitua pelo caminho da sua imagem
        alt="Logo"
        className="img-fluid mx-3" // mx-3 para adicionar margem horizontal
        style={{ height: '60px' }} // Altura da imagem
      /> 
      </Link>
    </div>
  );
}

export { FaixaSuperiorCadLog };