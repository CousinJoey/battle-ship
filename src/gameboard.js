
const gameboardFactory = (array) => {

    return { 
        array
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


export { x, gameboardStorage };