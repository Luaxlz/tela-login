import Link from "next/link"
import Button from "../components/Button"
import Input from "../components/Input"
import LoginCard from "../components/LoginCard"
import { useState } from "react"
import { setCookie } from "cookies-next"
import { useRouter } from "next/router"

export default function LoginPage() {
    const [formData, setFormData] = useState ({
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
            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                body: JSON.stringify(formData)
            })

            const json = await response.json()
            if (response.status !== 200) throw new Error(json)

            setCookie('authorization', json)
            router.push('/')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className={`
        bg-gradient-to-b from-black via-gray-900 to-gray-800 w-screen h-screen
            flex justify-center items-center

        `}>
            <LoginCard tittle='Entre em sua conta' >
                <form onSubmit={handleForm} className=" flex flex-col gap-3 w-auto mt-4">
                    <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={(e) => {handleFormEdit(e, 'email')}} />
                    <Input type="password" placeholder="Sua senha" required value={formData.password} onChange={(e) => {handleFormEdit(e, 'password')}} />
                    <Button>Entrar</Button>
                    {error && <p className="text-red-500 font-bold">{error}</p>}
                    <div className="flex justify-around">
                        <Link href="/register">Ainda não possui conta?</Link>
                        <Link href="/loginSelection">Fazer login de outra forma?</Link>
                    </div>
                </form>
            </LoginCard>
        </div>
    )
}