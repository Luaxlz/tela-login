export default function LoginCard({ tittle, children }) {
    return (
        <div className={`
            bg-white w-[500px] h-auto p-5 rounded-[10px]
            flex flex-col justify-around
        `}>
            <div className={` flex justify-center items-center self-center w-[250px] h-[70px] bg-red-600 text-center font-bold m-6`}>LOGO</div>
            <h1 className='text-center text-lg mb-3 font-medium'>
                {tittle}
            </h1>
            {children}
        </div>
    )
}