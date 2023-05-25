import LoginCard from "../components/LoginCard"
import Button from "../components/Button"
import Input from "../components/Input"
import Link from "next/link"
import { useState } from "react";
import { auth } from "../lib/firebase";
import Router from "next/router";
import style from '../styles/basicPage.module.css'
import Label from "../components/Label";

export default function SignUp() { //Iniciando função em modo padrão para registro no site
    const [email, setEmail] = useState(''); // abrindo o useState para o email, a função setEmail será responsável por modificar a variável email. Lembrar sempre se iniciar o state com uma string vazia.
    const [password, setPassword] = useState(''); //Mesma coisa do Email, porém para a senha.
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [error, setError] = useState('');
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

    const handleCpfChange = (event) => {
        let value = event.target.value;
        
        // Remove qualquer caractere não numérico
        value = value.replace(/\D/g, '');
    
        // Formata o CPF
        if (value.length <= 11) {
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
    
        setCpf(value);
      };

      function getErrorMessage(errorCode) {
        switch (errorCode) {
          case 'auth/email-already-in-use':
            return 'O email informado já está sendo usado por outra conta.';
          case 'auth/invalid-email':
            return 'Email inválido. Por favor, verifique o email informado.';
          case 'auth/weak-password':
            return 'A senha deve ter no mínimo 6 caracteres.';
          // Adicione outros códigos de erro e suas respectivas mensagens em português aqui
          default:
            return 'Ocorreu um erro durante a criação do usuário.';
        }
      }

    const handleSignUp = async (event) => { //Função que fará de fato a criação do usuário quando o form for preenchido e submetido.
        event.preventDefault(); //Importante não esquecer de impedir que o botão/formulário faça algo fora do desejável.

        try {
            await auth.createUserWithEmailAndPassword(email, password); //função assincrona para conectar ao banco com email e senha a serem persistidos no novo usuário.
            console.log('Usuário cadastrado com sucesso!'); //Confirmação de cadastro. no futuro transformar isso aqui em algo que o usuário possa verificar.
            const user = auth.currentUser;
            await user.updateProfile({
                displayName: name,
              })
                .then(() => {
                  // Ação a ser executada após a atualização do perfil
                  Router.push('/login'); //Redireciona o usuário após a criação do cadastro.
                })
        } catch (error) {
            console.log('Erro ao cadastrar usuário:', error.message);
            setError(getErrorMessage(error.code))
        };
    };


    return (
        <div className={`${style.basicPage}`}>
            <LoginCard tittle="Por favor informe os dados de cadastro">
                <form onSubmit={handleSignUp} className=" flex flex-col mt-4">
                    <Label htmlFor="name">Nome</Label>
                    <Input type="text" id="name" placeholder="Seu nome" value={name} onChange={handleNameChange} />
                    <Label htmlFor="cpf">CPF</Label>
                    <Input type="text" id="cpf" value={cpf} onChange={handleCpfChange} placeholder="000.000.000-00" maxLength="14" />
                    <Label htmlFor="email">E-mail</Label>
                    <Input type="email" id="email" placeholder="Seu e-mail" value={email} onChange={handleEmailChange} />
                    <Label htmlFor="password">Senha</Label>
                    <Input type="password" id="password" placeholder="Sua senha" value={password} onChange={handlePasswordChange} />
                    {error && <p className="text-red-600 font-medium mt-0 mb-3 p-0">{error}</p>}
                    <Button type='submit'>Cadastrar</Button>
                    <Link className="self-center mt-4 text-[1rem] font-medium" href="/login">Já possui uma conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}