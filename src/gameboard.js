
import { shipStorage } from "./ship";



const gameboardFactory = (array) => {

    let state = {
        numberOfShips: [],
        numberOfSinks: 0,
        shotsHit: [],
    }

    const placeShip = (y, x) => {

        let ship = shipStorage.getShips()[0];
        state.numberOfShips.push(ship);
        let board = gameboardStorage.getGameBoards()[0].array;

        if (ship.isHorizontal === true) {
            for (let i = 0; i < ship.length; i++) {
                board[y][x + i] = ship
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                board[y + i][x] = ship
            } 
        }
    };

    const receiveAttack = (y,x) => {

        let board = gameboardStorage.getGameBoards()[0].array;
        let ship = shipStorage.getShips()[0];

        if (board[y][x] === "m") {
            return "Already shot";
        } else if (board[y][x] === ship) {
            for (const z in state.shotsHit){
                if(`${state.shotsHit[z]}` === `${[y,x]}`){
                    return "Already hit"
                }
            }
            state.shotsHit.push(([y, x]));
            ship.hit();
            checkIfSunk(ship)
            checkIfAllSunk();
            return "Hit";
        } else {
            board[y][x] = "m";
            return "Missed";
        }
    
    };

    const checkIfSunk = (ship) => {
        if (ship.isSunk === true) {
            state.numberOfSinks += 1;
        };
    };

    const checkIfAllSunk = () => {
        if (state.numberOfSinks === state.numberOfShips.length) {
            return "game has ended";
        } else {
            return "game continues"
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

let x = new Array(7);

for (let i = 0; i < x.length; i++) {
    x[i] = new Array(7);
}

let playerBoard = gameboardFactory(x);
const gameboardStorage = new GameboardStorage();
gameboardStorage.addBoard(playerBoard);

let testBoard = gameboardFactory(x);
gameboardStorage.addBoard(testBoard);

let testBoardTwo = gameboardFactory(x);
gameboardStorage.addBoard(testBoardTwo);






// splice(0, 1, "x");


// class ShipStorage {
//     constructor() {
//         this.shipArray = [];
//     };

//     addShip(ship) {
//         this.shipArray.push(ship);
//     };

//     getShips() {
//         return this.shipArray;
//     };

// };

// const shipStorage = new ShipStorage();

// let ship5 = shipFactory(5);

// shipStorage.addShip(ship5);

// let foo = shipStorage.getShips();
// foo[0].hit();


export { x, gameboardStorage, gameboardFactory };