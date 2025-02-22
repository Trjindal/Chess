import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager();

wss.on('connection', function connection(ws) {
    console.log("connecting ");
    gameManager.addUser(ws)
    ws.on("disconnect",() => gameManager.removeUser(ws))
    ws.on("error", error => console.log(error))
});

wss.on("listening",()=>{console.log("listening on port 8080 abcd")})