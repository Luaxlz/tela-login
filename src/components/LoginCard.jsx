import styles from './LoginCard.module.css'

export default function LoginCard({ tittle, children }) {
    return (
        <div className={`
            bg-white w-[400px] p-5 rounded-[10px]
        `}>
            <h1 className='text-center text-xl'>
                {tittle}
            </h1>
            {children}
        </div>
    )
}