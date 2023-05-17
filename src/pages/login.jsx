import Link from "next/link"
import Button from "../components/Button"
import Input from "../components/Input"
import LoginCard from "../components/LoginCard"

export default function LoginPage() {
    return (
        <div className={`
            bg-black h-screen
            flex justify-center items-center

        `}>
            <LoginCard tittle='Entre em sua conta' >
                <form action="" className=" flex flex-col gap-2 w-auto mt-4">
                    <Input type="email" placeholder="Seu e-mail" />
                    <Input type="senha" placeholder="Sua senha" />
                    <Button>Criar</Button>
                </form>
                <Link href="/register">Ainda não possui conta?</Link>
            </LoginCard>
        </div>
    )
}