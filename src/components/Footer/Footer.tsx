import React from 'react';
import '../../css/menu.css'; // Importe o arquivo CSS para estilização

import imagem1 from '../../img/logo.png';

function Footer() {
    return (
        <div className="foot d-flex flex-column align-items-center justify-content-center text-center">
            <img
                src={imagem1}
                alt="Logo"
                className="img-fluid mb-2" // mb-2 para adicionar margem inferior
                style={{ height: '60px' }} // Altura da imagem
            />
            <p className="mb-0 text-white">Copyright © 2000 - 2024 www.ALM.com.br, TODOS OS DIREITOS RESERVADOS.</p>
        </div>
    );
}

export { Footer };