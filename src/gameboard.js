
const gameboardFactory = () => {

    const createGameBoard = () => {
        let gameBoard = new Array(10);
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = new Array(10);
        }
        return gameBoard;
    };

    let state = {
        gameBoard: createGameBoard(),
        numberOfShips: [],
        numberOfSinks: 0,
        shotsHit: [],
    }

    const isLocationValid = (ship, y, x) => {
        if (ship.isHorizontal === true) {
          if (x > 10 || x < 0 || y > 10 || y < 0 || x + ship.length > 10) {
            return false;
          }
          for (let i = x; i < x + ship.length; i++) {
            if (state.gameBoard[y][i] && state.gameBoard[y][i] !== ship) {
              return false;
            }
          }
          return true;
        } else {
          if (x > 10 || x < 0 || y > 10 || y < 0 || y + ship.length > 10) {
            return false;
          }
          for (let i = y; i < y + ship.length; i++) {
            if (state.gameBoard[i][x] && state.gameBoard[i][x] !== ship) {
              return false;
            }
          }
          return true;
        }
    };
      

    const placeShip = (ship, y, x) => {
        if (isLocationValid(ship, y, x) === true && ship.isHorizontal === true) {
            for (let i = 0; i < ship.length; i++) {
                state.gameBoard[y][x + i] = ship;
            }
        } else if (isLocationValid(ship, y, x) === true && ship.isHorizontal === false) {
            for (let i = 0; i < ship.length; i++) {
                state.gameBoard[y + i][x] = ship;
            } 
        }
        return isLocationValid(ship, y, x);
    };

    const receiveAttack = (y, x) => {

        if (state.gameBoard[y][x] === "m") {
            return;
        } else if (typeof state.gameBoard[y][x] === 'object') {
            for (const z in state.shotsHit){
                if(`${state.shotsHit[z]}` === `${[y,x]}`){
                    return;
                }
            }
            let ship = state.gameBoard[y][x];
            state.shotsHit.push(([y, x]));
            ship.hit();
            checkIfSunk(ship);
            return "hit";
        } else {
            state.gameBoard[y][x] = "m";
            return "miss";
        }
    
    };

    const checkIfSunk = (ship) => {
        if (ship.isSunk === true) {
            state.numberOfSinks += 1;
            checkIfAllSunk();
        };
    };

    const checkIfAllSunk = () => {
        if (state.numberOfSinks === 5) {
            return true;
        } else {
            return false;
        }
    };

    return {
        placeShip,
        receiveAttack,
        checkIfAllSunk,
        isLocationValid,
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