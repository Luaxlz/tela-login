export default function LoginCard({ tittle, children }) {
    return (
        <div className={`
            bg-white w-[600px] h-auto p-5 rounded-[10px]
            flex flex-col justify-around
        `}>
            <h1 className='text-center text-2xl p-0 m-0 font-bold text-[#03045e]'>
                {tittle}
            </h1>
            {children}
        </div>
    )
}