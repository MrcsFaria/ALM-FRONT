import { useState } from "react";
import Button from "../Button/Button";


export default function Eventos() {

    //chamamos de hooks
    const [name, setName] = useState('');
    const [senha, setSenha] = useState('');

    function handleClick(event: React.FormEvent<HTMLFormElement>) {
        //nao recarregar a página
        event.preventDefault();
        console.log(`Nome: ${name}`);
        console.log(`Senha: ${senha}`);
    }

    function eventProps(){
        console.log('Evento sendo passado por props...');
    }

    function eventProps2(){
        console.log('Outro evento sendo passado por props...');
    }

    return (
        <div>
            <h1>Cadastro de Usuários</h1>
            <form onSubmit={handleClick}>
                <div>
                    <label htmlFor="name">Digite o seu nome: </label>
                    <input type="text" name="name" id="name" 
                        placeholder="Digite seu nome"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Digite a sua senha: </label>
                    <input type="password" name="password" id="password" 
                        placeholder="Digite sua senha"
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
            <hr />
            <br /><br/>

            <Button text="Teste com propriedades" event={eventProps}/>
            <br />
            <Button text="Teste 2" event={eventProps2}/>

        </div>
    );
}