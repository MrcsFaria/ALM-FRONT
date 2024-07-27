import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../FrameNewPass/frameNewPass.css';

const FrameNewPass: React.FC = () => {

    return (
        <div className='div-new-pass'>
            <div className="componente">
                <p className="titulo">Recuperação</p>
                <form className="formulario">
                    <div className="campos">
                        <label htmlFor="senha">Nova Senha</label>
                        <input
                            type="senha"
                            id="senha"
                        />
                        <label htmlFor="senha">Repita a Senha</label>
                        <input
                            type="senha"
                            id="senha"
                        />
                    </div>
                    <button type="submit" className='botao-form'>
                        Recuperar Senha
                    </button>
                </form>
            </div>
            <div className="copyright">
                <p>Copyright © 2000 - 2024 www.ALM.com.br, TODOS OS DIREITOS RESERVADOS.</p>
            </div>
        </div>
    );
};

export default FrameNewPass;
