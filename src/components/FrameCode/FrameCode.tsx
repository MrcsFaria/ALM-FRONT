import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../FrameCode/frameCode.css';

const FrameCode: React.FC = () => {
    return (
        <div className='div-code'>
            <div className="componente">
                <p className="titulo">Recuperação</p>
                <form className="formulario-code">
                    <div className="campos-code">
                        <label htmlFor="email">
                            Enviamos um código de recuperação para o e-mail informado<br />Insira o código abaixo
                        </label>
                        <input type="email" id="email" />
                    </div>
                    <button type="submit" className='botao-form-code'>
                        Recuperar Senha
                    </button>
                </form>
            </div>
            <div className="copyright">
                <p>
                    Copyright © 2000 - 2024 www.ALM.com.br, TODOS OS DIREITOS RESERVADOS.
                </p>
            </div>
        </div>
    );
};




export default FrameCode;