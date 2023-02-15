
import { shipStorage } from "./ship";
import { createBoard } from "./DOM";

const gameboardFactory = (array) => {

    const createGameBoard = () => {
        let gameBoard = new Array(10);
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = new Array(10);
        }
        // createBoard(gameBoard);
        return gameBoard;
    };

    let state = {
        gameBoard: createGameBoard(),
        numberOfShips: [],
        numberOfSinks: 0,
        shotsHit: [],
    }

    const isLocationValid = (ship, y,x) => {
        if (ship.isHorizontal === true) {
            if ((x > 9 || x < 0 || x + ship.length > 9 || y > 9 || y < 0)) {
                return false;
            };
        } else if (ship.isHorizontal == false) {
            if ((x > 9 || x < 0 || y > 9 || y < 0 || y + ship.length > 9)) {
                return false;
            }
        } else {
            return true;
        }
    };

    const placeShip = (ship, y, x) => {
        if (isLocationValid(ship, y, x) === true && ship.isHorizontal === true) {
            for (let i = 0; i < ship.length; i++) {
                state.gameBoard[y][x + i] = ship
            }
        } else if (isLocationValid(ship, y, x) === true && ship.isHorizontal === false) {
            for (let i = 0; i < ship.length; i++) {
                state.gameBoard[y + i][x] = ship
            } 
        }
    };

    const receiveAttack = (ship, y, x) => {

        if (board[y][x] === "m") {
            return;
        } else if (typeof board[y][x] === 'object') {
            for (const z in state.shotsHit){
                if(`${state.shotsHit[z]}` === `${[y,x]}`){
                    return;
                }
            }
            state.shotsHit.push(([y, x]));
            ship.hit();
            checkIfSunk(ship)
            checkIfAllSunk();
            return;
        } else {
            board[y][x] = "m";
            return;
        }
    
    };

    const checkIfSunk = (ship) => {
        if (ship.isSunk === true) {
            state.numberOfSinks += 1;
        };
    };

    const checkIfAllSunk = () => {
        if (state.numberOfSinks === state.numberOfShips.length) {
            return true;
        } else {
            return false;
        }
    };

    return { 
        array,
        placeShip,
        receiveAttack,
        checkIfAllSunk,
        state
    }

}

class GameboardStorage {
    constructor() {
        this.gameboardArray = [];
    };

    addBoard(gameboard) {
        this.gameboardArray.push(gameboard);
    };

    getGameBoards() {
        return this.gameboardArray;
    };

}




export { GameboardStorage, gameboardFactory };