import LoginCard from "../components/LoginCard"
import Button from "../components/Button"
import Input from "../components/Input"
import Link from "next/link"

export default function RegisterPage() {
    return (
        <div className={`
            bg-black h-screen
            flex justify-center items-center
        `}>
            <LoginCard tittle="Crie sua conta">
            <form action="" className=" flex flex-col gap-2 mt-4">
                    <Input type="nome" placeholder="Seu nome" />
                    <Input type="email" placeholder="Seu e-mail" />
                    <Input type="senha" placeholder="Sua senha" />
                    <Button>Cadastrar</Button>
                    <Link href="/login">Já possui uma conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}