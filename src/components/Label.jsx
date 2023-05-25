export default function Label({children, ...props}) {
    return (
        <label className={`font-medium mb-1 pb-0`}
            {...props}>
                {children}
        </label>
    )
}