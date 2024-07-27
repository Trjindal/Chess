import { Chess } from 'chess.js'
import { WebSocket } from 'ws';
import { GAME_OVER, INIT_GAME, MOVE, NOT_YOUR_MOVE } from './messages';
export class Game{
    public player1:WebSocket
    public player2:WebSocket
    private board: Chess

    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2;
        this.board= new Chess();
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:'white'
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:'black'
            }
        }))
    }

    public makeMove(socket: WebSocket, move:{to:string,from:string}){
        console.log(this.board.turn()+" "+move);
        if(this.board.turn() === 'w' && this.player1!==socket){
            this.player2.send(JSON.stringify({
                type:NOT_YOUR_MOVE
            }))
            return;
        }
        if(this.board.turn() === 'b' && this.player2!==socket){
            this.player1.send(JSON.stringify({
                type:NOT_YOUR_MOVE
            }))
            return;
        }

        try{
            this.board.move(move)
        }catch(error){
            socket.send(JSON.stringify((error as Error).message));
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner: this.board.turn() === 'w' ? 'black':'white'
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner: this.board.turn() === 'w' ? 'black':'white'
                }
            }))
            return;
        }
    // since the previous move is done now the existing user should know what was done
        if(this.board.turn() === 'b' ){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        

        
    }
}