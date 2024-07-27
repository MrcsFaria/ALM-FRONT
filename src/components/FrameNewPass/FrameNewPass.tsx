import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../FrameNewPass/frameNewPass.css';

const FrameNewPass: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            // Recupera o e-mail do localStorage
            const email = localStorage.getItem('resetEmail');
            if (!email) {
                setError('E-mail não encontrado.');
                return;
            }

            // Envia a solicitação para redefinir a senha
            const response = await axios.post('https://alm-api-zeta.vercel.app/reset-password', {
                email,
                password: newPassword
            });

            if (response.status === 200) {
                localStorage.removeItem('resetEmail');
                navigate('/SignIn'); // Navega para a página de login ou qualquer outra página desejada
            } else {
                setError('Erro ao redefinir a senha.');
            }
        } catch (err) {
            setError('Erro ao redefinir a senha.');
        }
    };

    return (
        <div className='div-new-pass'>
            <div className="componente">
                <p className="titulo">Redefinir Senha</p>
                <form className="formulario" onSubmit={handleSubmit}>
                    <div className="campos">
                        <label htmlFor="newPassword">Nova Senha</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="confirmPassword">Repita a Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='botao-form'>
                        Redefinir Senha
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

export default FrameNewPass;
