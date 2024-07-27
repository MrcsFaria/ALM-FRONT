import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../FrameRecover/frameRecover.css';

const FrameRecover: React.FC = () => {

    return (
        <div className='div-recover'>
            <div className="componente">
                <p className="titulo">Recuperação</p>
                <form className="formulario">
                    <div className="campos">
                        <label htmlFor="email">
                            Insira seu e-mail 
                        </label>
                        <input type="email" id="email"/>
                    </div>
                    <button type="submit" className='botao-form'>
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




export default FrameRecover;