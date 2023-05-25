export default function Button({ children, ...props }) {
    return (
        <button className={`
            border-0 rounded-lg bg-[#146C94]
            p-2 text-lg text-white
        `} {...props}>
            {children}
        </button>
    )
}