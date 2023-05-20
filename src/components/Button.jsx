

export default function Button({ children, disabled, ...props }) {
    return (
        <button disabled={disabled} className={`
            border-0 rounded-lg bg-[blueviolet]
            p-1 text-lg font-bold text-white
        `} {...props}>
            {children}
        </button>
    )
}