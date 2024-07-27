import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../FrameCode/frameCode.css';
import { useNavigate } from 'react-router-dom';


const FrameCode: React.FC = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Recupera o e-mail do localStorage
    const email = localStorage.getItem('resetEmail');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            setError('E-mail não encontrado.');
            return;
        }
        try {
            // Verifica o código inserido pelo usuário
            const response = await axios.get(`https://alm-api-zeta.vercel.app/code/${email}`);
            const storedCode = response.data?.code;

            if (storedCode === code) {
                navigate('/NewPass');
            } else {
                setError('Código inválido.');
            }
        } catch (err) {
            setError('Erro ao verificar o código.');
        }
    };

    return (
        <div className='div-code'>
            <div className="componente">
                <p className="titulo">Recuperação</p>
                <form className="formulario-code" onSubmit={handleSubmit}>
                    <div className="campos-code">
                        <label htmlFor="code">
                            Insira o código que você recebeu por e-mail
                        </label>
                        <input
                            type="text"
                            id="code"
                            placeholder="Código"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='botao-form-code'>
                        Verificar Código
                    </button>
                </form>
                {error && <p className="text-danger">{error}</p>}
                {message && <p className="message">{message}</p>}
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
