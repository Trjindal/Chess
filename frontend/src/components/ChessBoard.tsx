import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";


export const ChessBoard =({ board }: { 
    board : ({
            square: Square;
            type: PieceSymbol;
            color: Color;
        } | null)[][]
})=>{

    const [from,setFrom] = useState<Square|null>(null);
    const [to,setTo] = useState<Square|null>(null); 

    return (
        <div>
            {board.map((row,i)=>{
                return <div key = {i} className="flex">
                    {row.map((col,j)=>{
                        return <div key = {j} 
                        className={`w-16 h-16 ${(i+j)%2==0?'bg-yellow-600' : 'bg-yellow-100'} text-black flex h-100 justify-center items-center`}
                        onClick={()=>{
                            const cell = String.fromCharCode(97 + (j))+(8-(i));
                            if(!from){
                                setFrom(col?.square ?? null);
                            }else{
                                setTo(col?.square??null);
                                // console.log(to);
                            }
                            }}>
                            {col?col.type:""}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
    
}