import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE, SUGGEST } from "../screens/Game";


export const ChessBoard =({ chess,board, socket, setBoard, suggestion ,setSuggestion }: { 
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
    suggestion: Square[]|null;
    setSuggestion: React.Dispatch<React.SetStateAction<Square[] | null>>
})=>{

    const [from,setFrom] = useState<Square|null>(null);
    const [isSelected,setIsSelected] = useState<Square|null>(null);
    

    return (
        <div>
            {board.map((row,i)=>{
                return <div key = {i} className="flex">
                    {row.map((col,j)=>{
                        const cell = String.fromCharCode(97 + (j))+(8-(i)) as Square;
                        const highlighted = isSelected === cell && col?.type;
                        const suggested = suggestion?.includes(cell);
                        return <div key = {j} 
                        className={`w-16 h-16 ${(i+j)%2==0?'bg-yellow-600' : 'bg-yellow-100'} 
                        text-black flex h-100 justify-center items-center 
                        ${highlighted ?"shadow-md shadow-inner ring ring-gray-300 ring-inset ":""}
                        `}
                        onClick={()=>{
                            setIsSelected(cell);
                            if(!from || chess.turn()===col?.color){
                                console.log(cell);
                                socket.send(JSON.stringify({
                                    type:SUGGEST,
                                    square: cell
                                }))
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
                                setSuggestion(null);
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
                             {col ? <img className="w-15 h-15" src={`/${col?.color === "b" ? col?.type : `${col?.type?.toUpperCase()} copy`}.png`} /> : null}
                             {suggested ? <div className="rounded-3xl h-4 w-1/4 highlight"></div>:""}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
    
}