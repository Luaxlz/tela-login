import LoginCard from "../components/LoginCard"
import Button from "../components/Button"
import Input from "../components/Input"
import Link from "next/link"
import { useState } from "react";
import { auth } from "../lib/firebase";
import Router from "next/router";

export default function SignUp() { //Iniciando função em modo padrão para registro no site
    const [email, setEmail] = useState(''); // abrindo o useState para o email, a função setEmail será responsável por modificar a variável email. Lembrar sempre se iniciar o state com uma string vazia.
    const [password, setPassword] = useState(''); //Mesma coisa do Email, porém para a senha.
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const user = auth.currentUser;

    const handleEmailChange = (event) => { //Função para lidar com a mudança da variável email via input.
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => { //Mesma que a anterior porém para a senha.
        setPassword(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    }

    const handleSignUp = async (event) => { //Função que fará de fato a criação do usuário quando o form for preenchido e submetido.
        event.preventDefault(); //Importante não esquecer de impedir que o botão/formulário faça algo fora do desejável.

        try {
            await auth.createUserWithEmailAndPassword(email, password); //função assincrona para conectar ao banco com email e senha a serem persistidos no novo usuário.
            console.log('Usuário cadastrado com sucesso!'); //Confirmação de cadastro. no futuro transformar isso aqui em algo que o usuário possa verificar.
            const user = auth.currentUser;
            await user.updateProfile({
                displayName: name,
                gender: gender,
              })
                .then(() => {
                  // Ação a ser executada após a atualização do perfil
                  Router.push('/login'); //Redireciona o usuário após a criação do cadastro.
                })
        } catch (error) {
            console.log('Erro ao cadastrar usuário:', error.message);
        };
    };


    return (
        <div className={`
            bg-gradient-to-b from-black via-gray-900 to-gray-800 w-screen h-screen
            flex justify-center items-center
        `}>
            <LoginCard tittle="Crie sua conta">
            <form onSubmit={handleSignUp} className=" flex flex-col gap-2 mt-4">
                    <Input type="text" placeholder="Seu nome" value={name} onChange={handleNameChange} />
                    <select className={`border-0 rounded-lg outline-none bg-gray-200 p-2`} 
                        value={gender} onChange={handleGenderChange}>
                        <option value="" disabled>
                            Selecione seu gênero
                        </option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <Input type="email" placeholder="Seu e-mail" value={email} onChange={handleEmailChange} />
                    <Input type="password" placeholder="Sua senha" value={password} onChange={handlePasswordChange} />
                    <Button type='submit'>Cadastrar</Button>
                    <Link href="/login">Já possui uma conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}