import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../FrameRecover/frameRecover.css';

const FrameRecover: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://alm-api-zeta.vercel.app/users/${email}`);
            if (response.data) {
                const sendEmailResponse = await axios.post('https://alm-api-zeta.vercel.app/send', { email });
                if (sendEmailResponse.status === 200) {
                    setMessage('E-mail de recuperação enviado com sucesso!');
                } else {
                    setError('Erro ao enviar o e-mail de recuperação.');
                }
            } else {
                setError('E-mail não encontrado no banco de dados.');
            }
        } catch (err) {
            setError('Erro ao verificar o e-mail.');
        }
    };

    return (
        <div className='div-recover'>
            <div className="componente">
                <p className="titulo">Recuperação</p>
                <form className="formulario" onSubmit={handleSubmit}>
                    <div className="campos">
                        <label htmlFor="email">Insira seu e-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className='botao-form'>
                        Recuperar Senha
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
            </div>
            <div className="copyright">
                <p>Copyright © 2000 - 2024 www.ALM.com.br, TODOS OS DIREITOS RESERVADOS.</p>
            </div>
        </div>
    );
};

export default FrameRecover;
