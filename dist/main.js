/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AI.js":
/*!*******************!*\
  !*** ./src/AI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AI": () => (/* binding */ AI)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");


class AI extends _player__WEBPACK_IMPORTED_MODULE_0__.Player{
    constructor(name, opponent, opponentBoard) {
        super(name, opponentBoard);
        this.name = name;
        this.opponent = opponent;
        this.opponentBoard = opponentBoard;
        this.shotsArray = [];
        this.turn = false;
    }


    randomAttack() {
        if (this.whoseTurn() === true) {
            let coords = {y:undefined, x:undefined};
                while (this.whoseTurn() === true) {
                coords.y = Math.floor(Math.random() * 10);
                coords.x = Math.floor(Math.random() * 10);
                if (!(this.shotsArray.some(number => number.y == coords.y && number.x == coords.x))) {
                    this.shotsArray.push(coords);
                    return {
                        result: this.sendAttack(coords.y, coords.x, this.opponent, this.opponentBoard),
                        y: coords.y,
                        x: coords.x
                    };
                }
            }
        }
    }

}

/***/ }),

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBoard": () => (/* binding */ createBoard)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");







function createBoard(name) {

    let isVertical = true;
    let counter = 5;
    let ignoreDecrement = false;
    const arrayOfShips = ___WEBPACK_IMPORTED_MODULE_0__.array;

    if (name === "player") {
        let rotate = document.querySelector("#rotate")

        rotate.addEventListener("click", () => {
        let arrayOfShips = ___WEBPACK_IMPORTED_MODULE_0__.array;
            for (let i = 0; i < (arrayOfShips.length); i++) {
                if (arrayOfShips.length < 1) return;
                arrayOfShips[i].rotate();
            }
        isVertical = !isVertical
        });
    }

    let board = document.querySelector(`.${name}-board-container`);

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let cell = document.createElement("div");
            if (name === "computer") cell.classList.add("bot-cell");
            if (name === "player") cell.classList.add("cell");
            cell.setAttribute("y", x);
            cell.setAttribute("x", y);
            if (name === "computer") {
                cell.addEventListener("click", (e) => {
                    if (arrayOfShips.length || ___WEBPACK_IMPORTED_MODULE_0__.computerGameboard.checkIfAllSunk() || ___WEBPACK_IMPORTED_MODULE_0__.playerGameboard.checkIfAllSunk() || ["red", "white"].includes(cell.style.background)) {
                            return;
                        }
                    processAttack(e.target);
                });
            } else if (name == "player") {
                let isPerm = false;
                cell.addEventListener("mouseenter", (e) => {
                    if (counter <= 1) return;
                    addHighlight(cell, isVertical, counter, isPerm);
                });
                cell.addEventListener("mouseout", (e) => {
                    if (counter <= 1) return;
                    removeHighlight(cell, isVertical, counter);
                })
                cell.addEventListener("click", (e) => {
                    let testItem = arrayOfShips[0];
                    if (counter <= 1) return;
                    if (processShipPlacement(testItem, cell) === false) {
                        return
                    } else {
        
                        if (cell.classList.contains("ship-color")) return;
    
                        let newShipCells = getNewShipCells(cell, isVertical, counter);
                        if (newShipCells.some(element => element.classList.contains("ship-color"))) return;
    
                        let isPerm = true;
                        addHighlight(cell, isVertical, counter, isPerm);
                        if (counter === 3 && !ignoreDecrement) {
                            ignoreDecrement = true;
                            arrayOfShips.shift();
                        } else {
                            counter--;
                            ignoreDecrement = false;
                            arrayOfShips.shift();
                        }
                    }
                });
            }
            board.appendChild(cell);
        }
    }

};

function getNewShipCells(cell, isVertical, length) {
    let y = parseInt(cell.getAttribute("y"));
    let x = parseInt(cell.getAttribute("x"));
    let cells = [cell];
    if (isVertical) {
        for (let i = 1; i < length; i++) {
            let nextCell = document.querySelector(`[y="${y+i}"][x="${x}"]`);
            if (nextCell) cells.push(nextCell);
        }
    } else {
        for (let i = 1; i < length; i++) {
            let nextCell = document.querySelector(`[y="${y}"][x="${x+i}"]`);
            if (nextCell) cells.push(nextCell);
        }
    }
    return cells;
};

function processShipPlacement(testItem, cell) {
    let y = parseInt(cell.getAttribute("y"))
    let x = parseInt(cell.getAttribute("x"))
    return ___WEBPACK_IMPORTED_MODULE_0__.playerGameboard.placeShip(testItem, y, x);
};

function addHighlight(cell, isVertical, counter, isPerm) {
    if (isVertical === true) {
        if (isPerm === true) cell.classList.add("ship-color");
        cell.classList.add("color");
        let x = cell.getAttribute("x");
        let y = parseInt(cell.getAttribute("y"));
        for (let i = 1; i < counter; i++) {
            const element = document.querySelector(`[y="${y+i}"][x="${x}"]`);
            if (element === null) {
                return
            } else if (isPerm === true) {
                element.classList.add("ship-color");
            } else {
                element.classList.add("color");
            }
        }
    } else {
        if (isPerm === true) cell.classList.add("ship-color");
        cell.classList.add("color");
        let x = parseInt(cell.getAttribute("x"));
        let y = cell.getAttribute("y");
        for (let i = 1; i < counter; i++) {
            const element = document.querySelector(`[y="${y}"][x="${x+i}"]`);
            if (element === null) {
                return
            } else if (isPerm === true) {
                element.classList.add("ship-color");
            } else {
                element.classList.add("color");
            }
        }
    }
};

function removeHighlight(cell, isVertical, counter) {
    if (isVertical === true) {
        cell.classList.remove("color");
        let x = cell.getAttribute("x");
        let y = parseInt(cell.getAttribute("y"));
        for (let i = 1; i < counter; i++) {
            const element = document.querySelector(`[y="${y+i}"][x="${x}"]`);
            if (element === null) {
                return
            } else {
                element.classList.remove("color");
            }
        }
    } else {
        cell.classList.remove("color");
        let x = parseInt(cell.getAttribute("x"));
        let y = cell.getAttribute("y");
        for (let i = 1; i < counter; i++) {
            const element = document.querySelector(`[y="${y}"][x="${x+i}"]`);
            if (element === null) {
                return
            } else {
                element.classList.remove("color");
            }
        }
    }
};

function processAttack(e) {
    let y = parseInt(e.getAttribute("y"));
    let x = parseInt(e.getAttribute("x"));
    updateComputerBoard(___WEBPACK_IMPORTED_MODULE_0__.player.sendAttack(y, x, ___WEBPACK_IMPORTED_MODULE_0__.computer, ___WEBPACK_IMPORTED_MODULE_0__.computerGameboard), y, x);
    if (___WEBPACK_IMPORTED_MODULE_0__.computerGameboard.checkIfAllSunk() === true) {
        endGame(___WEBPACK_IMPORTED_MODULE_0__.player.getPlayerName());
    }
    let computerAttack = ___WEBPACK_IMPORTED_MODULE_0__.computer.randomAttack();
    updatePlayerBoard(computerAttack.result, computerAttack.y, computerAttack.x);
    if (___WEBPACK_IMPORTED_MODULE_0__.playerGameboard.checkIfAllSunk() === true) {
        endGame(___WEBPACK_IMPORTED_MODULE_0__.computer.getPlayerName());
    }
};

function endGame(name) {
    console.log(name + " " + "Is the winner!");
};

function updatePlayerBoard(attackOutcome, y, x) {
    const target = document.querySelector(`[y="${y}"][x="${x}"]`)

    if (attackOutcome === "hit") {
        target.style.background = "red";
    } else if (attackOutcome === "miss") {
        target.style.background = "white";
    }
};

function updateComputerBoard(attackOutcome, y, x) {
    const target = document.querySelector(`[y="${y}"][x="${x}"].bot-cell`)

    if (attackOutcome === "hit") {
        target.style.background = "red";
    } else if (attackOutcome === "miss") {
        target.style.background = "white";
    }
}


// testPlayerGameBoard.placeShip(testItem, y, x)

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameboardStorage": () => (/* binding */ GameboardStorage),
/* harmony export */   "gameboardFactory": () => (/* binding */ gameboardFactory)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");




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






/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "array": () => (/* binding */ array),
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "computerGameboard": () => (/* binding */ computerGameboard),
/* harmony export */   "loggingGameboard": () => (/* binding */ loggingGameboard),
/* harmony export */   "player": () => (/* binding */ player),
/* harmony export */   "playerGameboard": () => (/* binding */ playerGameboard)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _AI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AI */ "./src/AI.js");







let playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();
let computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();

let gameboardClass = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.GameboardStorage();

gameboardClass.addBoard(playerGameboard);
gameboardClass.addBoard(computerGameboard);

let shipStorageClass = new _ship__WEBPACK_IMPORTED_MODULE_2__.ShipStorage();

let carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("carrier", 5);
let battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("battleship", 4);
let cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("cruiser", 3);
let submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("submarine", 3);
let destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("destroyer", 2);

shipStorageClass.addShip(carrier);
shipStorageClass.addShip(battleship);
shipStorageClass.addShip(cruiser);
shipStorageClass.addShip(submarine);
shipStorageClass.addShip(destroyer);

let botCarrier = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("botcarrier", 5);
let botBattleship = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("botbattleship", 4);
let botCruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("botcruiser", 3);
let botSubmarine = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("botsubmarine", 3);
let botDestroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_2__.shipFactory)("botdestroyer", 2);

placeComputerShips(botCarrier);
placeComputerShips(botBattleship);
placeComputerShips(botCruiser);
placeComputerShips(botSubmarine);
placeComputerShips(botDestroyer);

let player = new _player__WEBPACK_IMPORTED_MODULE_3__.Player('player');
let computer = new _AI__WEBPACK_IMPORTED_MODULE_4__.AI("AI", player, playerGameboard);

let array = shipStorageClass.getShips();

(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.createBoard)("player");
(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.createBoard)("computer")

let loggingGameboard = gameboardClass.getGameBoards()[0].state.gameBoard;

function placeComputerShips(ship) {
    while(true) {
        let y = Math.floor(Math.random() * 10);
        let x = Math.floor(Math.random() * 10);
        let rotateShip = Math.random() < 0.5;
        if (rotateShip) ship.rotate();
        if (computerGameboard.isLocationValid(ship, y, x)) {
            computerGameboard.placeShip(ship, y, x);
            break;
        }
    }
};




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });

class Player {
    constructor(name) {
        this.name = name;
        this.turn = true;
    };

    getPlayerName() {
        return this.name;
    };

    setPlayerName(name) {
        this.name = name;
    };

    endTurn(player) {
        if (this.turn === true) {
            this.turn = false;
            player.startTurn();
        }
    };

    startTurn() {
        if (this.turn === false) {
            this.turn = true;
        }
    };

    whoseTurn() {
        return this.turn;
    };

    sendAttack(y, x, player, boardRecipient) {
        if (this.whoseTurn()) {
            this.endTurn(player);
            return boardRecipient.receiveAttack(y, x);
        }
    }

}



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShipStorage": () => (/* binding */ ShipStorage),
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory)
/* harmony export */ });

const shipFactory = (name, length) => {

    let state = {
        timesHit: 0,
        isSunk: false,
        isHorizontal: false,
    }

    const hit = () => {
        state.timesHit += 1;
        if (state.timesHit === length) {
            sink();
        }
    };

    const sink = () => {
        state.isSunk = true;
    };

    const rotate = () => {
        state.isHorizontal = !state.isHorizontal;
    }

    return {
        length,
        name,
        get timesHit() {
            return state.timesHit;
        },
        get isSunk() {
            return state.isSunk;
        },
        get isHorizontal() {
            return state.isHorizontal;
        },
        hit,
        sink,
        rotate
    }
};


class ShipStorage {
    constructor() {
        this.shipArray = [];
    };

    addShip(ship) {
        this.shipArray.push(ship);
    };

    getShips() {
        return this.shipArray;
    };

};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvLi9zcmMvQUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZS1zaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZS1zaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZS1zaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGNsYXNzIEFJIGV4dGVuZHMgUGxheWVye1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG9wcG9uZW50LCBvcHBvbmVudEJvYXJkKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIG9wcG9uZW50Qm9hcmQpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm9wcG9uZW50ID0gb3Bwb25lbnQ7XG4gICAgICAgIHRoaXMub3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50Qm9hcmQ7XG4gICAgICAgIHRoaXMuc2hvdHNBcnJheSA9IFtdO1xuICAgICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHJhbmRvbUF0dGFjaygpIHtcbiAgICAgICAgaWYgKHRoaXMud2hvc2VUdXJuKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSB7eTp1bmRlZmluZWQsIHg6dW5kZWZpbmVkfTtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy53aG9zZVR1cm4oKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvb3Jkcy55ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGNvb3Jkcy54ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMuc2hvdHNBcnJheS5zb21lKG51bWJlciA9PiBudW1iZXIueSA9PSBjb29yZHMueSAmJiBudW1iZXIueCA9PSBjb29yZHMueCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdHNBcnJheS5wdXNoKGNvb3Jkcyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHRoaXMuc2VuZEF0dGFjayhjb29yZHMueSwgY29vcmRzLngsIHRoaXMub3Bwb25lbnQsIHRoaXMub3Bwb25lbnRCb2FyZCksXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBjb29yZHMueSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IGNvb3Jkcy54XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59IiwiXG5pbXBvcnQgeyBwbGF5ZXJHYW1lYm9hcmQsIGFycmF5LCBsb2dnaW5nR2FtZWJvYXJkLCBwbGF5ZXIsIGNvbXB1dGVyLCBjb21wdXRlckdhbWVib2FyZCB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBHYW1lYm9hcmRTdG9yYWdlIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBzaGlwRmFjdG9yeSwgU2hpcFN0b3JhZ2UgfSBmcm9tIFwiLi9zaGlwXCI7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmQobmFtZSkge1xuXG4gICAgbGV0IGlzVmVydGljYWwgPSB0cnVlO1xuICAgIGxldCBjb3VudGVyID0gNTtcbiAgICBsZXQgaWdub3JlRGVjcmVtZW50ID0gZmFsc2U7XG4gICAgY29uc3QgYXJyYXlPZlNoaXBzID0gYXJyYXk7XG5cbiAgICBpZiAobmFtZSA9PT0gXCJwbGF5ZXJcIikge1xuICAgICAgICBsZXQgcm90YXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyb3RhdGVcIilcblxuICAgICAgICByb3RhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbGV0IGFycmF5T2ZTaGlwcyA9IGFycmF5O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAoYXJyYXlPZlNoaXBzLmxlbmd0aCk7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhcnJheU9mU2hpcHMubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGFycmF5T2ZTaGlwc1tpXS5yb3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgaXNWZXJ0aWNhbCA9ICFpc1ZlcnRpY2FsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxldCBib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke25hbWV9LWJvYXJkLWNvbnRhaW5lcmApO1xuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiY29tcHV0ZXJcIikgY2VsbC5jbGFzc0xpc3QuYWRkKFwiYm90LWNlbGxcIik7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJwbGF5ZXJcIikgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwieVwiLCB4KTtcbiAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwieFwiLCB5KTtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBcImNvbXB1dGVyXCIpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlPZlNoaXBzLmxlbmd0aCB8fCBjb21wdXRlckdhbWVib2FyZC5jaGVja0lmQWxsU3VuaygpIHx8IHBsYXllckdhbWVib2FyZC5jaGVja0lmQWxsU3VuaygpIHx8IFtcInJlZFwiLCBcIndoaXRlXCJdLmluY2x1ZGVzKGNlbGwuc3R5bGUuYmFja2dyb3VuZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NBdHRhY2soZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lID09IFwicGxheWVyXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNQZXJtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8PSAxKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGFkZEhpZ2hsaWdodChjZWxsLCBpc1ZlcnRpY2FsLCBjb3VudGVyLCBpc1Blcm0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyIDw9IDEpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGlnaGxpZ2h0KGNlbGwsIGlzVmVydGljYWwsIGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RJdGVtID0gYXJyYXlPZlNoaXBzWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciA8PSAxKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzU2hpcFBsYWNlbWVudCh0ZXN0SXRlbSwgY2VsbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwLWNvbG9yXCIpKSByZXR1cm47XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2hpcENlbGxzID0gZ2V0TmV3U2hpcENlbGxzKGNlbGwsIGlzVmVydGljYWwsIGNvdW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1NoaXBDZWxscy5zb21lKGVsZW1lbnQgPT4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwLWNvbG9yXCIpKSkgcmV0dXJuO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzUGVybSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRIaWdobGlnaHQoY2VsbCwgaXNWZXJ0aWNhbCwgY291bnRlciwgaXNQZXJtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyID09PSAzICYmICFpZ25vcmVEZWNyZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmVEZWNyZW1lbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5T2ZTaGlwcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyLS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlRGVjcmVtZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlPZlNoaXBzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG59O1xuXG5mdW5jdGlvbiBnZXROZXdTaGlwQ2VsbHMoY2VsbCwgaXNWZXJ0aWNhbCwgbGVuZ3RoKSB7XG4gICAgbGV0IHkgPSBwYXJzZUludChjZWxsLmdldEF0dHJpYnV0ZShcInlcIikpO1xuICAgIGxldCB4ID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoXCJ4XCIpKTtcbiAgICBsZXQgY2VsbHMgPSBbY2VsbF07XG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5leHRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3k9XCIke3kraX1cIl1beD1cIiR7eH1cIl1gKTtcbiAgICAgICAgICAgIGlmIChuZXh0Q2VsbCkgY2VsbHMucHVzaChuZXh0Q2VsbCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbeT1cIiR7eX1cIl1beD1cIiR7eCtpfVwiXWApO1xuICAgICAgICAgICAgaWYgKG5leHRDZWxsKSBjZWxscy5wdXNoKG5leHRDZWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2VsbHM7XG59O1xuXG5mdW5jdGlvbiBwcm9jZXNzU2hpcFBsYWNlbWVudCh0ZXN0SXRlbSwgY2VsbCkge1xuICAgIGxldCB5ID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoXCJ5XCIpKVxuICAgIGxldCB4ID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoXCJ4XCIpKVxuICAgIHJldHVybiBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHRlc3RJdGVtLCB5LCB4KTtcbn07XG5cbmZ1bmN0aW9uIGFkZEhpZ2hsaWdodChjZWxsLCBpc1ZlcnRpY2FsLCBjb3VudGVyLCBpc1Blcm0pIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoaXNQZXJtID09PSB0cnVlKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWNvbG9yXCIpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjb2xvclwiKTtcbiAgICAgICAgbGV0IHggPSBjZWxsLmdldEF0dHJpYnV0ZShcInhcIik7XG4gICAgICAgIGxldCB5ID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoXCJ5XCIpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjb3VudGVyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbeT1cIiR7eStpfVwiXVt4PVwiJHt4fVwiXWApO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQZXJtID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcC1jb2xvclwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29sb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNQZXJtID09PSB0cnVlKSBjZWxsLmNsYXNzTGlzdC5hZGQoXCJzaGlwLWNvbG9yXCIpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjb2xvclwiKTtcbiAgICAgICAgbGV0IHggPSBwYXJzZUludChjZWxsLmdldEF0dHJpYnV0ZShcInhcIikpO1xuICAgICAgICBsZXQgeSA9IGNlbGwuZ2V0QXR0cmlidXRlKFwieVwiKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBjb3VudGVyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbeT1cIiR7eX1cIl1beD1cIiR7eCtpfVwiXWApO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQZXJtID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcC1jb2xvclwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY29sb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiByZW1vdmVIaWdobGlnaHQoY2VsbCwgaXNWZXJ0aWNhbCwgY291bnRlcikge1xuICAgIGlmIChpc1ZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yXCIpO1xuICAgICAgICBsZXQgeCA9IGNlbGwuZ2V0QXR0cmlidXRlKFwieFwiKTtcbiAgICAgICAgbGV0IHkgPSBwYXJzZUludChjZWxsLmdldEF0dHJpYnV0ZShcInlcIikpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNvdW50ZXI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt5PVwiJHt5K2l9XCJdW3g9XCIke3h9XCJdYCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yXCIpO1xuICAgICAgICBsZXQgeCA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKFwieFwiKSk7XG4gICAgICAgIGxldCB5ID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJ5XCIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNvdW50ZXI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt5PVwiJHt5fVwiXVt4PVwiJHt4K2l9XCJdYCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJjb2xvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHByb2Nlc3NBdHRhY2soZSkge1xuICAgIGxldCB5ID0gcGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJ5XCIpKTtcbiAgICBsZXQgeCA9IHBhcnNlSW50KGUuZ2V0QXR0cmlidXRlKFwieFwiKSk7XG4gICAgdXBkYXRlQ29tcHV0ZXJCb2FyZChwbGF5ZXIuc2VuZEF0dGFjayh5LCB4LCBjb21wdXRlciwgY29tcHV0ZXJHYW1lYm9hcmQpLCB5LCB4KTtcbiAgICBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuY2hlY2tJZkFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBlbmRHYW1lKHBsYXllci5nZXRQbGF5ZXJOYW1lKCkpO1xuICAgIH1cbiAgICBsZXQgY29tcHV0ZXJBdHRhY2sgPSBjb21wdXRlci5yYW5kb21BdHRhY2soKTtcbiAgICB1cGRhdGVQbGF5ZXJCb2FyZChjb21wdXRlckF0dGFjay5yZXN1bHQsIGNvbXB1dGVyQXR0YWNrLnksIGNvbXB1dGVyQXR0YWNrLngpO1xuICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQuY2hlY2tJZkFsbFN1bmsoKSA9PT0gdHJ1ZSkge1xuICAgICAgICBlbmRHYW1lKGNvbXB1dGVyLmdldFBsYXllck5hbWUoKSk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZW5kR2FtZShuYW1lKSB7XG4gICAgY29uc29sZS5sb2cobmFtZSArIFwiIFwiICsgXCJJcyB0aGUgd2lubmVyIVwiKTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKGF0dGFja091dGNvbWUsIHksIHgpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbeT1cIiR7eX1cIl1beD1cIiR7eH1cIl1gKVxuXG4gICAgaWYgKGF0dGFja091dGNvbWUgPT09IFwiaGl0XCIpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xuICAgIH0gZWxzZSBpZiAoYXR0YWNrT3V0Y29tZSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gdXBkYXRlQ29tcHV0ZXJCb2FyZChhdHRhY2tPdXRjb21lLCB5LCB4KSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3k9XCIke3l9XCJdW3g9XCIke3h9XCJdLmJvdC1jZWxsYClcblxuICAgIGlmIChhdHRhY2tPdXRjb21lID09PSBcImhpdFwiKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZWRcIjtcbiAgICB9IGVsc2UgaWYgKGF0dGFja091dGNvbWUgPT09IFwibWlzc1wiKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJ3aGl0ZVwiO1xuICAgIH1cbn1cblxuXG4vLyB0ZXN0UGxheWVyR2FtZUJvYXJkLnBsYWNlU2hpcCh0ZXN0SXRlbSwgeSwgeCkiLCJcbmltcG9ydCB7IHNoaXBTdG9yYWdlIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgY3JlYXRlQm9hcmQgfSBmcm9tIFwiLi9ET01cIjtcblxuY29uc3QgZ2FtZWJvYXJkRmFjdG9yeSA9ICgpID0+IHtcblxuICAgIGNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGdhbWVCb2FyZCA9IG5ldyBBcnJheSgxMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBnYW1lQm9hcmRbaV0gPSBuZXcgQXJyYXkoMTApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnYW1lQm9hcmQ7XG4gICAgfTtcblxuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgZ2FtZUJvYXJkOiBjcmVhdGVHYW1lQm9hcmQoKSxcbiAgICAgICAgbnVtYmVyT2ZTaGlwczogW10sXG4gICAgICAgIG51bWJlck9mU2lua3M6IDAsXG4gICAgICAgIHNob3RzSGl0OiBbXSxcbiAgICB9XG5cbiAgICBjb25zdCBpc0xvY2F0aW9uVmFsaWQgPSAoc2hpcCwgeSwgeCkgPT4ge1xuICAgICAgICBpZiAoc2hpcC5pc0hvcml6b250YWwgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAoeCA+IDEwIHx8IHggPCAwIHx8IHkgPiAxMCB8fCB5IDwgMCB8fCB4ICsgc2hpcC5sZW5ndGggPiAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZ2FtZUJvYXJkW3ldW2ldICYmIHN0YXRlLmdhbWVCb2FyZFt5XVtpXSAhPT0gc2hpcCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh4ID4gMTAgfHwgeCA8IDAgfHwgeSA+IDEwIHx8IHkgPCAwIHx8IHkgKyBzaGlwLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDwgeSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5nYW1lQm9hcmRbaV1beF0gJiYgc3RhdGUuZ2FtZUJvYXJkW2ldW3hdICE9PSBzaGlwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgICAgXG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeSwgeCkgPT4ge1xuICAgICAgICBpZiAoaXNMb2NhdGlvblZhbGlkKHNoaXAsIHksIHgpID09PSB0cnVlICYmIHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5nYW1lQm9hcmRbeV1beCArIGldID0gc2hpcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0xvY2F0aW9uVmFsaWQoc2hpcCwgeSwgeCkgPT09IHRydWUgJiYgc2hpcC5pc0hvcml6b250YWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5nYW1lQm9hcmRbeSArIGldW3hdID0gc2hpcDtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzTG9jYXRpb25WYWxpZChzaGlwLCB5LCB4KTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9ICh5LCB4KSA9PiB7XG5cbiAgICAgICAgaWYgKHN0YXRlLmdhbWVCb2FyZFt5XVt4XSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RhdGUuZ2FtZUJvYXJkW3ldW3hdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB6IGluIHN0YXRlLnNob3RzSGl0KXtcbiAgICAgICAgICAgICAgICBpZihgJHtzdGF0ZS5zaG90c0hpdFt6XX1gID09PSBgJHtbeSx4XX1gKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBzaGlwID0gc3RhdGUuZ2FtZUJvYXJkW3ldW3hdO1xuICAgICAgICAgICAgc3RhdGUuc2hvdHNIaXQucHVzaCgoW3ksIHhdKSk7XG4gICAgICAgICAgICBzaGlwLmhpdCgpO1xuICAgICAgICAgICAgY2hlY2tJZlN1bmsoc2hpcCk7XG4gICAgICAgICAgICByZXR1cm4gXCJoaXRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlLmdhbWVCb2FyZFt5XVt4XSA9IFwibVwiO1xuICAgICAgICAgICAgcmV0dXJuIFwibWlzc1wiO1xuICAgICAgICB9XG4gICAgXG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrSWZTdW5rID0gKHNoaXApID0+IHtcbiAgICAgICAgaWYgKHNoaXAuaXNTdW5rID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzdGF0ZS5udW1iZXJPZlNpbmtzICs9IDE7XG4gICAgICAgICAgICBjaGVja0lmQWxsU3VuaygpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja0lmQWxsU3VuayA9ICgpID0+IHtcbiAgICAgICAgaWYgKHN0YXRlLm51bWJlck9mU2lua3MgPT09IDUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHBsYWNlU2hpcCxcbiAgICAgICAgcmVjZWl2ZUF0dGFjayxcbiAgICAgICAgY2hlY2tJZkFsbFN1bmssXG4gICAgICAgIGlzTG9jYXRpb25WYWxpZCxcbiAgICAgICAgc3RhdGVcbiAgICB9XG5cbn1cblxuY2xhc3MgR2FtZWJvYXJkU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkQXJyYXkgPSBbXTtcbiAgICB9O1xuXG4gICAgYWRkQm9hcmQoZ2FtZWJvYXJkKSB7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkQXJyYXkucHVzaChnYW1lYm9hcmQpO1xuICAgIH07XG5cbiAgICBnZXRHYW1lQm9hcmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmRBcnJheTtcbiAgICB9O1xuXG59XG5cblxuXG5cbmV4cG9ydCB7IEdhbWVib2FyZFN0b3JhZ2UsIGdhbWVib2FyZEZhY3RvcnkgfTsiLCJpbXBvcnQgeyBHYW1lYm9hcmRTdG9yYWdlLCBnYW1lYm9hcmRGYWN0b3J5IH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBjcmVhdGVCb2FyZCB9IGZyb20gXCIuL0RPTVwiO1xuaW1wb3J0IHsgc2hpcEZhY3RvcnksIFNoaXBTdG9yYWdlIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBBSSB9IGZyb20gXCIuL0FJXCI7XG5cblxuZXhwb3J0IGxldCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5leHBvcnQgbGV0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuXG5sZXQgZ2FtZWJvYXJkQ2xhc3MgPSBuZXcgR2FtZWJvYXJkU3RvcmFnZSgpO1xuXG5nYW1lYm9hcmRDbGFzcy5hZGRCb2FyZChwbGF5ZXJHYW1lYm9hcmQpO1xuZ2FtZWJvYXJkQ2xhc3MuYWRkQm9hcmQoY29tcHV0ZXJHYW1lYm9hcmQpO1xuXG5sZXQgc2hpcFN0b3JhZ2VDbGFzcyA9IG5ldyBTaGlwU3RvcmFnZSgpO1xuXG5sZXQgY2FycmllciA9IHNoaXBGYWN0b3J5KFwiY2FycmllclwiLCA1KTtcbmxldCBiYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkoXCJiYXR0bGVzaGlwXCIsIDQpO1xubGV0IGNydWlzZXIgPSBzaGlwRmFjdG9yeShcImNydWlzZXJcIiwgMyk7XG5sZXQgc3VibWFyaW5lID0gc2hpcEZhY3RvcnkoXCJzdWJtYXJpbmVcIiwgMyk7XG5sZXQgZGVzdHJveWVyID0gc2hpcEZhY3RvcnkoXCJkZXN0cm95ZXJcIiwgMik7XG5cbnNoaXBTdG9yYWdlQ2xhc3MuYWRkU2hpcChjYXJyaWVyKTtcbnNoaXBTdG9yYWdlQ2xhc3MuYWRkU2hpcChiYXR0bGVzaGlwKTtcbnNoaXBTdG9yYWdlQ2xhc3MuYWRkU2hpcChjcnVpc2VyKTtcbnNoaXBTdG9yYWdlQ2xhc3MuYWRkU2hpcChzdWJtYXJpbmUpO1xuc2hpcFN0b3JhZ2VDbGFzcy5hZGRTaGlwKGRlc3Ryb3llcik7XG5cbmxldCBib3RDYXJyaWVyID0gc2hpcEZhY3RvcnkoXCJib3RjYXJyaWVyXCIsIDUpO1xubGV0IGJvdEJhdHRsZXNoaXAgPSBzaGlwRmFjdG9yeShcImJvdGJhdHRsZXNoaXBcIiwgNCk7XG5sZXQgYm90Q3J1aXNlciA9IHNoaXBGYWN0b3J5KFwiYm90Y3J1aXNlclwiLCAzKTtcbmxldCBib3RTdWJtYXJpbmUgPSBzaGlwRmFjdG9yeShcImJvdHN1Ym1hcmluZVwiLCAzKTtcbmxldCBib3REZXN0cm95ZXIgPSBzaGlwRmFjdG9yeShcImJvdGRlc3Ryb3llclwiLCAyKTtcblxucGxhY2VDb21wdXRlclNoaXBzKGJvdENhcnJpZXIpO1xucGxhY2VDb21wdXRlclNoaXBzKGJvdEJhdHRsZXNoaXApO1xucGxhY2VDb21wdXRlclNoaXBzKGJvdENydWlzZXIpO1xucGxhY2VDb21wdXRlclNoaXBzKGJvdFN1Ym1hcmluZSk7XG5wbGFjZUNvbXB1dGVyU2hpcHMoYm90RGVzdHJveWVyKTtcblxuZXhwb3J0IGxldCBwbGF5ZXIgPSBuZXcgUGxheWVyKCdwbGF5ZXInKTtcbmV4cG9ydCBsZXQgY29tcHV0ZXIgPSBuZXcgQUkoXCJBSVwiLCBwbGF5ZXIsIHBsYXllckdhbWVib2FyZCk7XG5cbmV4cG9ydCBsZXQgYXJyYXkgPSBzaGlwU3RvcmFnZUNsYXNzLmdldFNoaXBzKCk7XG5cbmNyZWF0ZUJvYXJkKFwicGxheWVyXCIpO1xuY3JlYXRlQm9hcmQoXCJjb21wdXRlclwiKVxuXG5leHBvcnQgbGV0IGxvZ2dpbmdHYW1lYm9hcmQgPSBnYW1lYm9hcmRDbGFzcy5nZXRHYW1lQm9hcmRzKClbMF0uc3RhdGUuZ2FtZUJvYXJkO1xuXG5mdW5jdGlvbiBwbGFjZUNvbXB1dGVyU2hpcHMoc2hpcCkge1xuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBsZXQgcm90YXRlU2hpcCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XG4gICAgICAgIGlmIChyb3RhdGVTaGlwKSBzaGlwLnJvdGF0ZSgpO1xuICAgICAgICBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuaXNMb2NhdGlvblZhbGlkKHNoaXAsIHksIHgpKSB7XG4gICAgICAgICAgICBjb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCwgeSwgeCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblxuIiwiXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50dXJuID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgZ2V0UGxheWVyTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9O1xuXG4gICAgc2V0UGxheWVyTmFtZShuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfTtcblxuICAgIGVuZFR1cm4ocGxheWVyKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgcGxheWVyLnN0YXJ0VHVybigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHN0YXJ0VHVybigpIHtcbiAgICAgICAgaWYgKHRoaXMudHVybiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudHVybiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgd2hvc2VUdXJuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50dXJuO1xuICAgIH07XG5cbiAgICBzZW5kQXR0YWNrKHksIHgsIHBsYXllciwgYm9hcmRSZWNpcGllbnQpIHtcbiAgICAgICAgaWYgKHRoaXMud2hvc2VUdXJuKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kVHVybihwbGF5ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIGJvYXJkUmVjaXBpZW50LnJlY2VpdmVBdHRhY2soeSwgeCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0IHsgUGxheWVyIH0iLCJcbmNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuXG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICB0aW1lc0hpdDogMCxcbiAgICAgICAgaXNTdW5rOiBmYWxzZSxcbiAgICAgICAgaXNIb3Jpem9udGFsOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIHN0YXRlLnRpbWVzSGl0ICs9IDE7XG4gICAgICAgIGlmIChzdGF0ZS50aW1lc0hpdCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICBzaW5rKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2luayA9ICgpID0+IHtcbiAgICAgICAgc3RhdGUuaXNTdW5rID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgcm90YXRlID0gKCkgPT4ge1xuICAgICAgICBzdGF0ZS5pc0hvcml6b250YWwgPSAhc3RhdGUuaXNIb3Jpem9udGFsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZ2V0IHRpbWVzSGl0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLnRpbWVzSGl0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgaXNTdW5rKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmlzU3VuaztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGlzSG9yaXpvbnRhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5pc0hvcml6b250YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGhpdCxcbiAgICAgICAgc2luayxcbiAgICAgICAgcm90YXRlXG4gICAgfVxufTtcblxuXG5jbGFzcyBTaGlwU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2hpcEFycmF5ID0gW107XG4gICAgfTtcblxuICAgIGFkZFNoaXAoc2hpcCkge1xuICAgICAgICB0aGlzLnNoaXBBcnJheS5wdXNoKHNoaXApO1xuICAgIH07XG5cbiAgICBnZXRTaGlwcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcEFycmF5O1xuICAgIH07XG5cbn07XG5cblxuZXhwb3J0IHsgc2hpcEZhY3RvcnksIFNoaXBTdG9yYWdlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9