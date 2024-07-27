import { useEffect, useState } from "react";
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";

export const INIT_GAME="init_game";
export const MOVE="move";
export const NOT_YOUR_MOVE="this is not your turn";
export const GAME_OVER="game over";

export const  Game = ()=>{

    const socket = useSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] =useState(chess.board());
    
    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage = (event) => {
            const message = event.data;
            if(message === INIT_GAME){
                // setChess(new Chess());
                setBoard(chess.board);
                console.log("GAME INITIATED");
                return;
            }
            if(message === MOVE){
                const move = message.payload;
                chess.move(move);
                setBoard(chess.board());
                console.log("Move");
                return ;
            }
            if(message === GAME_OVER){
                console.log("game over");
                return;
            }
        }
    },[socket])

    if(!socket) return <div>Connecting ...</div>

    return (
       <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 flex justify-center w-full">
                        <ChessBoard board={board}/>
                    </div>
                    <div className="col-span-2 bg-green-200 w-full">
                        <Button onClick={()=>{
                                socket.send(JSON.stringify({
                                type: INIT_GAME
                                }))
                            }}>
                            Play online
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
