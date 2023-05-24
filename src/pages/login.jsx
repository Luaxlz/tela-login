import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import LoginCard from "../components/LoginCard";
import { useState } from "react";
import { auth } from "../lib/firebase";
import Router from "next/router";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log('Usuário logado com sucesso!');
            const isAuthenticated = true;
            document.cookie = `isAuthenticated=${isAuthenticated}`;
            Router.push('/');
        } catch (error) {
            console.log('Houve um erro ao entrar:', error.message);
        };
    };

    return (
        <div className={`
        bg-gradient-to-b from-black via-gray-900 to-gray-800 w-screen h-screen
            flex justify-center items-center

        `}>
            <LoginCard tittle='Entre em sua conta' >
                <form onSubmit={handleLogin} className=" flex flex-col gap-3 w-auto mt-4">
                    <Input type="email" placeholder="Seu e-mail" value={email} onChange={handleEmailChange} />
                    <Input type="password" placeholder="Sua senha" value={password} onChange={handlePasswordChange} />
                    <Button type='submit' >Entrar</Button>
                    <div className="flex justify-around">
                        <Link href="/register">Ainda não possui conta?</Link>
                        <Link href="/loginSelection">Fazer login de outra forma?</Link>
                    </div>
                </form>
            </LoginCard>
        </div>
    )
}