import { GameboardStorage, gameboardFactory } from "./gameboard";
import { createBoard } from "./DOM";

let gameBoard = gameboardFactory();

console.log(gameBoard);
console.log(gameBoard.state.gameBoard)

createBoard();