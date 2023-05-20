import Button from "../components/Button";
import { useRouter } from "next/router"

export default function LoginSelectionPage() {
    const router = useRouter()
    return (
        <div className={`
        bg-gradient-to-b from-black via-gray-900 to-gray-800 w-screen h-screen
            flex flex-col gap-1 justify-center items-center
        `}>
            <Button className={`bg-white w-[300px] p-3 m-2 rounded-md  font-bold border-0`} onClick={() => router.push('/login')}>
                Email / CNPJ
            </Button>
            <Button disabled={true} className={`bg-gray-500 w-[300px] p-3 m-2 rounded-md  font-bold`}>
                Facebook
            </Button>
            <Button disabled={true} className={`bg-gray-500 w-[300px] p-3 m-2 rounded-md  font-bold border-0`}>
                Google
            </Button>
            <Button disabled={true} className={`bg-gray-500 w-[300px] p-3 m-2 rounded-md  font-bold border-0 `}>
                Gov.br
            </Button>
        </div>
    )
}