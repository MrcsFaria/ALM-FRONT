import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../FrameSign/SignIn.css';

type FrameProps = {
  children?: React.ReactNode;
};


function FrameSg({ children }: FrameProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginFailure = (response: any) => {
    if (response.error === 'idpiframe_initialization_failed') {
      setErrorMessage('');
    } else {
      setErrorMessage('Credenciais inválidas. Verifique seu email e senha.');
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const log = await axios.post('https://alm-api-zeta.vercel.app/signin', {
        email,
        password,
      });
      console.log(email)
      const response = await axios.get(`https://alm-api-zeta.vercel.app/users/${email}`);
      const userName = response.data.nome; // Extrair o nome do usuário da resposta
      console.log(userName)
      localStorage.setItem('userName', userName); // Salvar o nome do usuário
      navigate('/');
    } catch (error) {
      setErrorMessage('Credenciais inválidas. Verifique seu email e senha.');
    }
  };

  return (
    <div className="corpo-signin">
      <div className="componente">
        <p className="titulo">Login</p>
        <form onSubmit={handleLogin} className="formulario">
          <div className="campos">
            <label htmlFor="email">
              E-Mail
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="campos">
            <label htmlFor="password">
              Senha
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" onClick={handleLogin} className='botao-form'>
            Entrar
          </button>
        </form>
        <div className='opcoes'>
        <p>Esqueceu a senha?</p>
        <p>Ou</p>
        <p>Não tem uma conta? <Link to={`/SignUp`}>Cadastre-se</Link></p>
        </div>
      </div>
      <div className="copyright">
      <p>
        Copyright © 2000 - 2024 www.ALM.com.br, TODOS OS DIREITOS RESERVADOS.
      </p>
      </div>

    </div>
  );
}

function FrameSign() {
  return <FrameSg />;
}

export default FrameSign;
