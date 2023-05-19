import LoginCard from "../components/LoginCard"
import Button from "../components/Button"
import Input from "../components/Input"
import Link from "next/link"
import { useState } from "react"
import { setCookie } from "cookies-next"
import { useRouter } from "next/router"

export default function RegisterPage() {
    const [formData, setFormData] = useState ({
        name: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const router = useRouter()

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`/api/user/cadastro`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const json = await response.json()
            if (response.status !== 201) throw new Error(json)

            setCookie('authorization', json)
            router.push('/login')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className={`
            bg-black h-screen
            flex justify-center items-center
        `}>
            <LoginCard tittle="Crie sua conta">
            <form onSubmit={handleForm} className=" flex flex-col gap-2 mt-4">
                    <Input type="text" placeholder="Seu nome" required value={formData.name} onChange={(e) => {handleFormEdit(e, 'name')}} />
                    <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={(e) => {handleFormEdit(e, 'email')}} />
                    <Input type="password" placeholder="Sua senha" required value={formData.password} onChange={(e) => {handleFormEdit(e, 'password')}} />
                    <Button>Cadastrar</Button>
                    {error && <p className="text-red-500 font-bold">{error}</p>}
                    <Link href="/login">Já possui uma conta?</Link>
                </form>
            </LoginCard>
        </div>
    )
}