import Input from "../components/Input";
import Label from "../components/Label";
import Image from "next/image";
import profilePic from '../../public/images/profile-placeholder.png'

export default function userPage( props ) {
    return (
        <div className={`
            flex justify-center items-center h-screen w-screen
        `}>
            <div className="bg-cyan-100 flex gap-12 p-8 rounded-lg">
                <div className=" w-[200px] h-[250px]">
                    <Image
                        className=" rounded-lg shadow-lg shadow-gray-300"
                        src={profilePic}
                        width={200}
                        height={250}
                        alt="Profile Pic"
                    />
                </div>
                <form className="flex flex-col w-[25rem]">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" />
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" />
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" />
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" />
                </form>
            </div>
        </div>
    )
}