export const Button = ({onClick,children}:{onClick: () => void, children:React.ReactNode}) => {
    return <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full" 
    onClick={onClick}>
        {children}
    </button>
}