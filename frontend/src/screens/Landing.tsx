import { useNavigate } from "react-router-dom"

function Landing(){
    const navigate = useNavigate();
    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-row">
                <div className="basis-1/2 bg-yellow-100 flex justify-center">
                    <img src={"/chessboard3.png"} className="max-w-96"/>
                </div>
                <div className="basis-1/2 bg-yellow-800">
                    <div className=" px-4 py-8">
                        <h1 className="text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Play Chess Online on the #1 Site!</h1>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full" onClick={()=>navigate("/game")}>
                            Play Online
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        
}

export default Landing