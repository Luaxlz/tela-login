import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import LoginCard from "../components/LoginCard";
import { useState } from "react";
import { auth } from "../lib/firebase";
import Router from "next/router";
import style from '../styles/basicPage.module.css'
import Label from "../components/Label";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    function getErrorMessage(errorCode) {
        switch (errorCode) {
          case 'auth/invalid-email':
            return 'Email inválido. Por favor, verifique o email informado.';
          case 'auth/user-not-found':
            return 'Usuário não encontrado.';
          case 'auth/wrong-password':
            return 'Senha incorreta.';
          // Adicionar outros códigos de erro e suas respectivas mensagens em português aqui
          default:
            return 'Ocorreu um erro durante a autenticação.';
        }
      }

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log('Usuário logado com sucesso!');
            const isAuthenticated = true;
            document.cookie = `isAuthenticated=${isAuthenticated}`;
            Router.push('/');
        } catch (error) {
            setError(getErrorMessage(error.code))
            console.log('Houve um erro ao entrar:', error.message);
        };
    };

    return (
        <div className={`${style.basicPage}`}>
            <LoginCard tittle='Por favor digite suas informações de login' >
                <form onSubmit={handleLogin} className=" flex flex-col w-auto mt-4">
                    <Label htmlFor="email">E-mail</Label>
                    <Input type="email" id="email" placeholder="Seu e-mail" value={email} onChange={handleEmailChange} />
                    <Label htmlFor="password">Senha</Label>
                    <Input type="password" id="password" placeholder="Sua senha" value={password} onChange={handlePasswordChange} />
                    {error && <p className="text-red-600 font-medium mb-0 p-0">{error}</p>}
                    <Link className="self-center mt-1 mb-4 text-[#19A7CE]" href="#">Esqueceu sua senha?</Link>
                    <Button type='submit' >Entrar →</Button>
                    <Link className="self-center mt-4 text-[1rem] font-medium" href="/register">Ainda não possui conta?</Link>
                    <Link className="self-center mt-4 text-[1rem] font-medium" href="/loginType">Quero fazer login de outra forma</Link>
                </form>
            </LoginCard>
        </div>
    )
}