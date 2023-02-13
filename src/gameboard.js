
import { shipStorage } from "./ship";



const gameboardFactory = (array) => {

    let state = {
        shotsHit: [],
        allSunk: false
    }

    const placeShip = (y, x) => {

        let ship = shipStorage.getShips()[0];
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
                    console.log(`${state.shotsHit[z]}`);
                    console.log(`${[y,x]}`);
                    return "Already hit"
                }
            }
            state.shotsHit.push(([y, x]));
            ship.hit();
            return "Hit";
        } else {
            board[y][x] = "m";
            return "Missed";
        }
    
    };

// ship {numberofHits, length, isSunk}

    return { 
        array,
        placeShip,
        receiveAttack,
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