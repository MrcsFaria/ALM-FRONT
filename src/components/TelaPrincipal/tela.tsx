import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/menu.css'; // Importe o arquivo CSS para estilização


function MenuSuperior() {

  return (
    <div className="comp-menu-superior d-flex align-items-center justify-content-between bg-light p-3">
      <div className="text-center flex-grow-1"> {/* flex-grow-1 para ocupar o espaço restante */}
        <Link to={'/products?categoryId=1'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>  Novidades </span>
        </Link>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>  | </span>
        <Link to={'/products?categoryId=2'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>  Masculino </span>
        </Link>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>  | </span>
        <Link to={'/products?categoryId=3'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>  Feminino  </span>
        </Link>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>  | </span>
        <Link to={'/products?categoryId=4'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>  Infantil  </span>
        </Link>      
      </div>
    </div>
  );
}

export { MenuSuperior };
