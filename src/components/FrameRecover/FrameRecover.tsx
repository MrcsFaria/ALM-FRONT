import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../FrameRecover/frameRecover.css';

const FrameRecover: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://alm-api-zeta.vercel.app/users/${email}`);
            if (response.data) {
                const sendEmailResponse = await axios.post('https://alm-api-zeta.vercel.app/send', { email });
                if (sendEmailResponse.status === 200) {
                    // Armazena o e-mail no localStorage
                    localStorage.setItem('resetEmail', email);
                    navigate('/Confirm'); // Navega para a página de confirmação
                } else {
                    setError('E-mail não encontrado no banco de dados.');
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
                {error && <p className="text-danger">{error}</p>}
                {message && <p className="message">{message}</p>}
            </div>
            <div className="copyright">
                <p>Copyright © 2000 - 2024 www.ALM.com.br, TODOS OS DIREITOS RESERVADOS.</p>
            </div>
        </div>
    );
};

export default FrameRecover;
