

export default function Button({ children, ...props }) {
    return (
        <button className={`
            border-0 rounded-lg bg-[blueviolet]
            p-1 text-lg font-bold text-white
        `} {...props}>
            {children}
        </button>
    )
}