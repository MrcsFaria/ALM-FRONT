import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../FrameSign/SignUp.css';

const FrameSignUp: React.FC = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://alm-api-zeta.vercel.app/signup', {
        nome: `${nome} ${sobrenome}`,
        email,
        password,
        cpf,
      });

      navigate('/SignIn');
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
    }
  };

  return (
    <div className="corpo-signup">
      <div className="componente-signup">
        <div className="titulo-signup">
        <p>Cadastro</p>
        <label>Já possui conta?<Link to={`/SignIn`}> Login </Link></label>
        </div>
        <form onSubmit={handleSignUp} className='formulario-signup'>
          <div className='nome-sobrenome'>
            <div className='campos-signup'>
              <label htmlFor="firstName">
                Nome
              </label>
              <input
                type="text"
                id="firstname-signup"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className='campos-signup'>
              <label htmlFor="lastName">
                Sobrenome
              </label>
              <input
                type="text"
                id="lastName"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />
            </div>
          </div>
          <div className='campos-signup'>
            <label htmlFor="cpf">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className='campos-signup'>
            <label htmlFor="email">
              E-Mail
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='campos-signup'>
            <label htmlFor="password">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <button type="submit" className='botao-form-signup'>
              Cadastrar
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




export default FrameSignUp;