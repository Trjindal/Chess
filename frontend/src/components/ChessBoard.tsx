import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";


export const ChessBoard =({ chess,board, socket, setBoard  }: { 
    chess: Chess;
    setBoard: React.Dispatch<React.SetStateAction<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
})=>{

    const [from,setFrom] = useState<Square|null>(null);

    return (
        <div>
            {board.map((row,i)=>{
                return <div key = {i} className="flex">
                    {row.map((col,j)=>{
                        return <div key = {j} 
                        className={`w-16 h-16 ${(i+j)%2==0?'bg-yellow-600' : 'bg-yellow-100'} text-black flex h-100 justify-center items-center`}
                        onClick={()=>{
                            const cell = String.fromCharCode(97 + (j))+(8-(i)) as Square;
                            if(!from){
                                console.log(from);
                                setFrom(cell);
                            }else{
                                console.log("here"+ from+" "+cell);
                               socket.send(JSON.stringify({
                                type:MOVE,
                                move: {
                                    from,
                                    to: cell
                                }
                               }))
                                // console.log(to);
                                setFrom(null);
                                chess.move({
                                    from,
                                    to: cell
                                });
                                setBoard(chess.board());
                                console.log({
                                    from,
                                    to: cell
                                });
                            }
                            }}>
                             {col ? <img className="w-8 h-8" src={`/${col?.color === "b" ? col?.type : `${col?.type?.toUpperCase()} copy`}.png`} /> : null}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
    
}