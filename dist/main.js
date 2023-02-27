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
/* harmony export */   "createBoard": () => (/* binding */ createBoard),
/* harmony export */   "listeners": () => (/* binding */ listeners)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");




function listeners() {
    
    document.addEventListener("click", (e) => {

        if (e.target.matches("#play-again")) {
            location.reload();
        }

    });

}


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
                    if (arrayOfShips.length || ___WEBPACK_IMPORTED_MODULE_0__.computerGameboard.checkIfAllSunk() || ___WEBPACK_IMPORTED_MODULE_0__.playerGameboard.checkIfAllSunk() || cell.style.background === "red" || cell.textContent === "○") {
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
    let win = document.querySelector(".win-toggle")
    win.style.display = "block";
    let msg = document.querySelector(".winning-ann")
    msg.textContent = `${name} is the winner!`
};

function updatePlayerBoard(attackOutcome, y, x) {
    const target = document.querySelector(`[y="${y}"][x="${x}"]`)

    if (attackOutcome === "hit") {
        target.style.background = "red";
    } else if (attackOutcome === "miss") {
        target.innerHTML = "○"
    }
};

function updateComputerBoard(attackOutcome, y, x) {
    const target = document.querySelector(`[y="${y}"][x="${x}"].bot-cell`)

    if (attackOutcome === "hit") {
        target.style.background = "red";
    } else if (attackOutcome === "miss") {
        target.innerHTML = "○"
    }
}


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

(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.listeners)();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZS1zaGlwLy4vc3JjL0FJLmpzIiwid2VicGFjazovL2JhdHRsZS1zaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZS1zaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZS1zaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZS1zaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBSSBleHRlbmRzIFBsYXllcntcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBvcHBvbmVudCwgb3Bwb25lbnRCb2FyZCkge1xuICAgICAgICBzdXBlcihuYW1lLCBvcHBvbmVudEJvYXJkKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5vcHBvbmVudCA9IG9wcG9uZW50O1xuICAgICAgICB0aGlzLm9wcG9uZW50Qm9hcmQgPSBvcHBvbmVudEJvYXJkO1xuICAgICAgICB0aGlzLnNob3RzQXJyYXkgPSBbXTtcbiAgICAgICAgdGhpcy50dXJuID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICByYW5kb21BdHRhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLndob3NlVHVybigpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBsZXQgY29vcmRzID0ge3k6dW5kZWZpbmVkLCB4OnVuZGVmaW5lZH07XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMud2hvc2VUdXJuKCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjb29yZHMueSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBjb29yZHMueCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLnNob3RzQXJyYXkuc29tZShudW1iZXIgPT4gbnVtYmVyLnkgPT0gY29vcmRzLnkgJiYgbnVtYmVyLnggPT0gY29vcmRzLngpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3RzQXJyYXkucHVzaChjb29yZHMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiB0aGlzLnNlbmRBdHRhY2soY29vcmRzLnksIGNvb3Jkcy54LCB0aGlzLm9wcG9uZW50LCB0aGlzLm9wcG9uZW50Qm9hcmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogY29vcmRzLnksXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBjb29yZHMueFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSIsIlxuaW1wb3J0IHsgcGxheWVyR2FtZWJvYXJkLCBhcnJheSwgcGxheWVyLCBjb21wdXRlciwgY29tcHV0ZXJHYW1lYm9hcmQgfSBmcm9tIFwiLlwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5lcnMoKSB7XG4gICAgXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoXCIjcGxheS1hZ2FpblwiKSkge1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKG5hbWUpIHtcblxuICAgIGxldCBpc1ZlcnRpY2FsID0gdHJ1ZTtcbiAgICBsZXQgY291bnRlciA9IDU7XG4gICAgbGV0IGlnbm9yZURlY3JlbWVudCA9IGZhbHNlO1xuICAgIGNvbnN0IGFycmF5T2ZTaGlwcyA9IGFycmF5O1xuXG4gICAgaWYgKG5hbWUgPT09IFwicGxheWVyXCIpIHtcbiAgICAgICAgbGV0IHJvdGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcm90YXRlXCIpXG5cbiAgICAgICAgcm90YXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxldCBhcnJheU9mU2hpcHMgPSBhcnJheTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGFycmF5T2ZTaGlwcy5sZW5ndGgpOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlPZlNoaXBzLmxlbmd0aCA8IDEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBhcnJheU9mU2hpcHNbaV0ucm90YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGlzVmVydGljYWwgPSAhaXNWZXJ0aWNhbFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZXQgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtuYW1lfS1ib2FyZC1jb250YWluZXJgKTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDEwOyB5KyspIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBcImNvbXB1dGVyXCIpIGNlbGwuY2xhc3NMaXN0LmFkZChcImJvdC1jZWxsXCIpO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwicGxheWVyXCIpIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcInlcIiwgeCk7XG4gICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcInhcIiwgeSk7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5T2ZTaGlwcy5sZW5ndGggfHwgY29tcHV0ZXJHYW1lYm9hcmQuY2hlY2tJZkFsbFN1bmsoKSB8fCBwbGF5ZXJHYW1lYm9hcmQuY2hlY2tJZkFsbFN1bmsoKSB8fCBjZWxsLnN0eWxlLmJhY2tncm91bmQgPT09IFwicmVkXCIgfHwgY2VsbC50ZXh0Q29udGVudCA9PT0gXCLil4tcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0F0dGFjayhlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJwbGF5ZXJcIikge1xuICAgICAgICAgICAgICAgIGxldCBpc1Blcm0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyIDw9IDEpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgYWRkSGlnaGxpZ2h0KGNlbGwsIGlzVmVydGljYWwsIGNvdW50ZXIsIGlzUGVybSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPD0gMSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVIaWdobGlnaHQoY2VsbCwgaXNWZXJ0aWNhbCwgY291bnRlcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdEl0ZW0gPSBhcnJheU9mU2hpcHNbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyIDw9IDEpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb2Nlc3NTaGlwUGxhY2VtZW50KHRlc3RJdGVtLCBjZWxsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXAtY29sb3JcIikpIHJldHVybjtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdTaGlwQ2VsbHMgPSBnZXROZXdTaGlwQ2VsbHMoY2VsbCwgaXNWZXJ0aWNhbCwgY291bnRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3U2hpcENlbGxzLnNvbWUoZWxlbWVudCA9PiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXAtY29sb3JcIikpKSByZXR1cm47XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNQZXJtID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEhpZ2hsaWdodChjZWxsLCBpc1ZlcnRpY2FsLCBjb3VudGVyLCBpc1Blcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPT09IDMgJiYgIWlnbm9yZURlY3JlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZURlY3JlbWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlPZlNoaXBzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmVEZWNyZW1lbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheU9mU2hpcHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG5cbmZ1bmN0aW9uIGdldE5ld1NoaXBDZWxscyhjZWxsLCBpc1ZlcnRpY2FsLCBsZW5ndGgpIHtcbiAgICBsZXQgeSA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKFwieVwiKSk7XG4gICAgbGV0IHggPSBwYXJzZUludChjZWxsLmdldEF0dHJpYnV0ZShcInhcIikpO1xuICAgIGxldCBjZWxscyA9IFtjZWxsXTtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmV4dENlbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbeT1cIiR7eStpfVwiXVt4PVwiJHt4fVwiXWApO1xuICAgICAgICAgICAgaWYgKG5leHRDZWxsKSBjZWxscy5wdXNoKG5leHRDZWxsKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBuZXh0Q2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt5PVwiJHt5fVwiXVt4PVwiJHt4K2l9XCJdYCk7XG4gICAgICAgICAgICBpZiAobmV4dENlbGwpIGNlbGxzLnB1c2gobmV4dENlbGwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjZWxscztcbn07XG5cbmZ1bmN0aW9uIHByb2Nlc3NTaGlwUGxhY2VtZW50KHRlc3RJdGVtLCBjZWxsKSB7XG4gICAgbGV0IHkgPSBwYXJzZUludChjZWxsLmdldEF0dHJpYnV0ZShcInlcIikpXG4gICAgbGV0IHggPSBwYXJzZUludChjZWxsLmdldEF0dHJpYnV0ZShcInhcIikpXG4gICAgcmV0dXJuIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAodGVzdEl0ZW0sIHksIHgpO1xufTtcblxuZnVuY3Rpb24gYWRkSGlnaGxpZ2h0KGNlbGwsIGlzVmVydGljYWwsIGNvdW50ZXIsIGlzUGVybSkge1xuICAgIGlmIChpc1ZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChpc1Blcm0gPT09IHRydWUpIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXAtY29sb3JcIik7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNvbG9yXCIpO1xuICAgICAgICBsZXQgeCA9IGNlbGwuZ2V0QXR0cmlidXRlKFwieFwiKTtcbiAgICAgICAgbGV0IHkgPSBwYXJzZUludChjZWxsLmdldEF0dHJpYnV0ZShcInlcIikpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNvdW50ZXI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt5PVwiJHt5K2l9XCJdW3g9XCIke3h9XCJdYCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1Blcm0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWNvbG9yXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb2xvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc1Blcm0gPT09IHRydWUpIGNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXAtY29sb3JcIik7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNvbG9yXCIpO1xuICAgICAgICBsZXQgeCA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKFwieFwiKSk7XG4gICAgICAgIGxldCB5ID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJ5XCIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNvdW50ZXI7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFt5PVwiJHt5fVwiXVt4PVwiJHt4K2l9XCJdYCk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1Blcm0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwLWNvbG9yXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb2xvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHJlbW92ZUhpZ2hsaWdodChjZWxsLCBpc1ZlcnRpY2FsLCBjb3VudGVyKSB7XG4gICAgaWYgKGlzVmVydGljYWwgPT09IHRydWUpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3JcIik7XG4gICAgICAgIGxldCB4ID0gY2VsbC5nZXRBdHRyaWJ1dGUoXCJ4XCIpO1xuICAgICAgICBsZXQgeSA9IHBhcnNlSW50KGNlbGwuZ2V0QXR0cmlidXRlKFwieVwiKSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY291bnRlcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3k9XCIke3kraX1cIl1beD1cIiR7eH1cIl1gKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiY29sb3JcIik7XG4gICAgICAgIGxldCB4ID0gcGFyc2VJbnQoY2VsbC5nZXRBdHRyaWJ1dGUoXCJ4XCIpKTtcbiAgICAgICAgbGV0IHkgPSBjZWxsLmdldEF0dHJpYnV0ZShcInlcIik7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY291bnRlcjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3k9XCIke3l9XCJdW3g9XCIke3graX1cIl1gKTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbG9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcHJvY2Vzc0F0dGFjayhlKSB7XG4gICAgbGV0IHkgPSBwYXJzZUludChlLmdldEF0dHJpYnV0ZShcInlcIikpO1xuICAgIGxldCB4ID0gcGFyc2VJbnQoZS5nZXRBdHRyaWJ1dGUoXCJ4XCIpKTtcbiAgICB1cGRhdGVDb21wdXRlckJvYXJkKHBsYXllci5zZW5kQXR0YWNrKHksIHgsIGNvbXB1dGVyLCBjb21wdXRlckdhbWVib2FyZCksIHksIHgpO1xuICAgIGlmIChjb21wdXRlckdhbWVib2FyZC5jaGVja0lmQWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGVuZEdhbWUocGxheWVyLmdldFBsYXllck5hbWUoKSk7XG4gICAgfVxuICAgIGxldCBjb21wdXRlckF0dGFjayA9IGNvbXB1dGVyLnJhbmRvbUF0dGFjaygpO1xuICAgIHVwZGF0ZVBsYXllckJvYXJkKGNvbXB1dGVyQXR0YWNrLnJlc3VsdCwgY29tcHV0ZXJBdHRhY2sueSwgY29tcHV0ZXJBdHRhY2sueCk7XG4gICAgaWYgKHBsYXllckdhbWVib2FyZC5jaGVja0lmQWxsU3VuaygpID09PSB0cnVlKSB7XG4gICAgICAgIGVuZEdhbWUoY29tcHV0ZXIuZ2V0UGxheWVyTmFtZSgpKTtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBlbmRHYW1lKG5hbWUpIHtcbiAgICBsZXQgd2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW4tdG9nZ2xlXCIpXG4gICAgd2luLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgbGV0IG1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmluZy1hbm5cIilcbiAgICBtc2cudGV4dENvbnRlbnQgPSBgJHtuYW1lfSBpcyB0aGUgd2lubmVyIWBcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXllckJvYXJkKGF0dGFja091dGNvbWUsIHksIHgpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbeT1cIiR7eX1cIl1beD1cIiR7eH1cIl1gKVxuXG4gICAgaWYgKGF0dGFja091dGNvbWUgPT09IFwiaGl0XCIpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xuICAgIH0gZWxzZSBpZiAoYXR0YWNrT3V0Y29tZSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IFwi4peLXCJcbiAgICB9XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVDb21wdXRlckJvYXJkKGF0dGFja091dGNvbWUsIHksIHgpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbeT1cIiR7eX1cIl1beD1cIiR7eH1cIl0uYm90LWNlbGxgKVxuXG4gICAgaWYgKGF0dGFja091dGNvbWUgPT09IFwiaGl0XCIpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xuICAgIH0gZWxzZSBpZiAoYXR0YWNrT3V0Y29tZSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IFwi4peLXCJcbiAgICB9XG59XG4iLCJcbmNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoKSA9PiB7XG5cbiAgICBjb25zdCBjcmVhdGVHYW1lQm9hcmQgPSAoKSA9PiB7XG4gICAgICAgIGxldCBnYW1lQm9hcmQgPSBuZXcgQXJyYXkoMTApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVCb2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZ2FtZUJvYXJkW2ldID0gbmV3IEFycmF5KDEwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2FtZUJvYXJkO1xuICAgIH07XG5cbiAgICBsZXQgc3RhdGUgPSB7XG4gICAgICAgIGdhbWVCb2FyZDogY3JlYXRlR2FtZUJvYXJkKCksXG4gICAgICAgIG51bWJlck9mU2hpcHM6IFtdLFxuICAgICAgICBudW1iZXJPZlNpbmtzOiAwLFxuICAgICAgICBzaG90c0hpdDogW10sXG4gICAgfVxuXG4gICAgY29uc3QgaXNMb2NhdGlvblZhbGlkID0gKHNoaXAsIHksIHgpID0+IHtcbiAgICAgICAgaWYgKHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHggPiAxMCB8fCB4IDwgMCB8fCB5ID4gMTAgfHwgeSA8IDAgfHwgeCArIHNoaXAubGVuZ3RoID4gMTApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHN0YXRlLmdhbWVCb2FyZFt5XVtpXSAmJiBzdGF0ZS5nYW1lQm9hcmRbeV1baV0gIT09IHNoaXApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoeCA+IDEwIHx8IHggPCAwIHx8IHkgPiAxMCB8fCB5IDwgMCB8fCB5ICsgc2hpcC5sZW5ndGggPiAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZ2FtZUJvYXJkW2ldW3hdICYmIHN0YXRlLmdhbWVCb2FyZFtpXVt4XSAhPT0gc2hpcCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAgIFxuXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXAsIHksIHgpID0+IHtcbiAgICAgICAgaWYgKGlzTG9jYXRpb25WYWxpZChzaGlwLCB5LCB4KSA9PT0gdHJ1ZSAmJiBzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZ2FtZUJvYXJkW3ldW3ggKyBpXSA9IHNoaXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNMb2NhdGlvblZhbGlkKHNoaXAsIHksIHgpID09PSB0cnVlICYmIHNoaXAuaXNIb3Jpem9udGFsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUuZ2FtZUJvYXJkW3kgKyBpXVt4XSA9IHNoaXA7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc0xvY2F0aW9uVmFsaWQoc2hpcCwgeSwgeCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoeSwgeCkgPT4ge1xuXG4gICAgICAgIGlmIChzdGF0ZS5nYW1lQm9hcmRbeV1beF0gPT09IFwibVwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0YXRlLmdhbWVCb2FyZFt5XVt4XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeiBpbiBzdGF0ZS5zaG90c0hpdCl7XG4gICAgICAgICAgICAgICAgaWYoYCR7c3RhdGUuc2hvdHNIaXRbel19YCA9PT0gYCR7W3kseF19YCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgc2hpcCA9IHN0YXRlLmdhbWVCb2FyZFt5XVt4XTtcbiAgICAgICAgICAgIHN0YXRlLnNob3RzSGl0LnB1c2goKFt5LCB4XSkpO1xuICAgICAgICAgICAgc2hpcC5oaXQoKTtcbiAgICAgICAgICAgIGNoZWNrSWZTdW5rKHNoaXApO1xuICAgICAgICAgICAgcmV0dXJuIFwiaGl0XCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZS5nYW1lQm9hcmRbeV1beF0gPSBcIm1cIjtcbiAgICAgICAgICAgIHJldHVybiBcIm1pc3NcIjtcbiAgICAgICAgfVxuICAgIFxuICAgIH07XG5cbiAgICBjb25zdCBjaGVja0lmU3VuayA9IChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChzaGlwLmlzU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3RhdGUubnVtYmVyT2ZTaW5rcyArPSAxO1xuICAgICAgICAgICAgY2hlY2tJZkFsbFN1bmsoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2hlY2tJZkFsbFN1bmsgPSAoKSA9PiB7XG4gICAgICAgIGlmIChzdGF0ZS5udW1iZXJPZlNpbmtzID09PSA1KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwbGFjZVNoaXAsXG4gICAgICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgICAgIGNoZWNrSWZBbGxTdW5rLFxuICAgICAgICBpc0xvY2F0aW9uVmFsaWQsXG4gICAgICAgIHN0YXRlXG4gICAgfVxuXG59XG5cbmNsYXNzIEdhbWVib2FyZFN0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWVib2FyZEFycmF5ID0gW107XG4gICAgfTtcblxuICAgIGFkZEJvYXJkKGdhbWVib2FyZCkge1xuICAgICAgICB0aGlzLmdhbWVib2FyZEFycmF5LnB1c2goZ2FtZWJvYXJkKTtcbiAgICB9O1xuXG4gICAgZ2V0R2FtZUJvYXJkcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZWJvYXJkQXJyYXk7XG4gICAgfTtcblxufVxuXG5cblxuXG5leHBvcnQgeyBHYW1lYm9hcmRTdG9yYWdlLCBnYW1lYm9hcmRGYWN0b3J5IH07IiwiaW1wb3J0IHsgR2FtZWJvYXJkU3RvcmFnZSwgZ2FtZWJvYXJkRmFjdG9yeSB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgY3JlYXRlQm9hcmQgfSBmcm9tIFwiLi9ET01cIjtcbmltcG9ydCB7IHNoaXBGYWN0b3J5LCBTaGlwU3RvcmFnZSB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgQUkgfSBmcm9tIFwiLi9BSVwiO1xuaW1wb3J0IHsgbGlzdGVuZXJzIH0gZnJvbSBcIi4vRE9NXCI7XG5cblxuZXhwb3J0IGxldCBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5leHBvcnQgbGV0IGNvbXB1dGVyR2FtZWJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeSgpO1xuXG5saXN0ZW5lcnMoKTtcblxubGV0IGdhbWVib2FyZENsYXNzID0gbmV3IEdhbWVib2FyZFN0b3JhZ2UoKTtcblxuZ2FtZWJvYXJkQ2xhc3MuYWRkQm9hcmQocGxheWVyR2FtZWJvYXJkKTtcbmdhbWVib2FyZENsYXNzLmFkZEJvYXJkKGNvbXB1dGVyR2FtZWJvYXJkKTtcblxubGV0IHNoaXBTdG9yYWdlQ2xhc3MgPSBuZXcgU2hpcFN0b3JhZ2UoKTtcblxubGV0IGNhcnJpZXIgPSBzaGlwRmFjdG9yeShcImNhcnJpZXJcIiwgNSk7XG5sZXQgYmF0dGxlc2hpcCA9IHNoaXBGYWN0b3J5KFwiYmF0dGxlc2hpcFwiLCA0KTtcbmxldCBjcnVpc2VyID0gc2hpcEZhY3RvcnkoXCJjcnVpc2VyXCIsIDMpO1xubGV0IHN1Ym1hcmluZSA9IHNoaXBGYWN0b3J5KFwic3VibWFyaW5lXCIsIDMpO1xubGV0IGRlc3Ryb3llciA9IHNoaXBGYWN0b3J5KFwiZGVzdHJveWVyXCIsIDIpO1xuXG5zaGlwU3RvcmFnZUNsYXNzLmFkZFNoaXAoY2Fycmllcik7XG5zaGlwU3RvcmFnZUNsYXNzLmFkZFNoaXAoYmF0dGxlc2hpcCk7XG5zaGlwU3RvcmFnZUNsYXNzLmFkZFNoaXAoY3J1aXNlcik7XG5zaGlwU3RvcmFnZUNsYXNzLmFkZFNoaXAoc3VibWFyaW5lKTtcbnNoaXBTdG9yYWdlQ2xhc3MuYWRkU2hpcChkZXN0cm95ZXIpO1xuXG5sZXQgYm90Q2FycmllciA9IHNoaXBGYWN0b3J5KFwiYm90Y2FycmllclwiLCA1KTtcbmxldCBib3RCYXR0bGVzaGlwID0gc2hpcEZhY3RvcnkoXCJib3RiYXR0bGVzaGlwXCIsIDQpO1xubGV0IGJvdENydWlzZXIgPSBzaGlwRmFjdG9yeShcImJvdGNydWlzZXJcIiwgMyk7XG5sZXQgYm90U3VibWFyaW5lID0gc2hpcEZhY3RvcnkoXCJib3RzdWJtYXJpbmVcIiwgMyk7XG5sZXQgYm90RGVzdHJveWVyID0gc2hpcEZhY3RvcnkoXCJib3RkZXN0cm95ZXJcIiwgMik7XG5cbnBsYWNlQ29tcHV0ZXJTaGlwcyhib3RDYXJyaWVyKTtcbnBsYWNlQ29tcHV0ZXJTaGlwcyhib3RCYXR0bGVzaGlwKTtcbnBsYWNlQ29tcHV0ZXJTaGlwcyhib3RDcnVpc2VyKTtcbnBsYWNlQ29tcHV0ZXJTaGlwcyhib3RTdWJtYXJpbmUpO1xucGxhY2VDb21wdXRlclNoaXBzKGJvdERlc3Ryb3llcik7XG5cbmV4cG9ydCBsZXQgcGxheWVyID0gbmV3IFBsYXllcigncGxheWVyJyk7XG5leHBvcnQgbGV0IGNvbXB1dGVyID0gbmV3IEFJKFwiQUlcIiwgcGxheWVyLCBwbGF5ZXJHYW1lYm9hcmQpO1xuXG5leHBvcnQgbGV0IGFycmF5ID0gc2hpcFN0b3JhZ2VDbGFzcy5nZXRTaGlwcygpO1xuXG5jcmVhdGVCb2FyZChcInBsYXllclwiKTtcbmNyZWF0ZUJvYXJkKFwiY29tcHV0ZXJcIilcblxuZXhwb3J0IGxldCBsb2dnaW5nR2FtZWJvYXJkID0gZ2FtZWJvYXJkQ2xhc3MuZ2V0R2FtZUJvYXJkcygpWzBdLnN0YXRlLmdhbWVCb2FyZDtcblxuZnVuY3Rpb24gcGxhY2VDb21wdXRlclNoaXBzKHNoaXApIHtcbiAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgbGV0IHJvdGF0ZVNoaXAgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xuICAgICAgICBpZiAocm90YXRlU2hpcCkgc2hpcC5yb3RhdGUoKTtcbiAgICAgICAgaWYgKGNvbXB1dGVyR2FtZWJvYXJkLmlzTG9jYXRpb25WYWxpZChzaGlwLCB5LCB4KSkge1xuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXAsIHksIHgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbiIsIlxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudHVybiA9IHRydWU7XG4gICAgfTtcblxuICAgIGdldFBsYXllck5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfTtcblxuICAgIHNldFBsYXllck5hbWUobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH07XG5cbiAgICBlbmRUdXJuKHBsYXllcikge1xuICAgICAgICBpZiAodGhpcy50dXJuID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllci5zdGFydFR1cm4oKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBzdGFydFR1cm4oKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnR1cm4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdob3NlVHVybigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHVybjtcbiAgICB9O1xuXG4gICAgc2VuZEF0dGFjayh5LCB4LCBwbGF5ZXIsIGJvYXJkUmVjaXBpZW50KSB7XG4gICAgICAgIGlmICh0aGlzLndob3NlVHVybigpKSB7XG4gICAgICAgICAgICB0aGlzLmVuZFR1cm4ocGxheWVyKTtcbiAgICAgICAgICAgIHJldHVybiBib2FyZFJlY2lwaWVudC5yZWNlaXZlQXR0YWNrKHksIHgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IFBsYXllciB9IiwiXG5jb25zdCBzaGlwRmFjdG9yeSA9IChuYW1lLCBsZW5ndGgpID0+IHtcblxuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgdGltZXNIaXQ6IDAsXG4gICAgICAgIGlzU3VuazogZmFsc2UsXG4gICAgICAgIGlzSG9yaXpvbnRhbDogZmFsc2UsXG4gICAgfVxuXG4gICAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgICAgICBzdGF0ZS50aW1lc0hpdCArPSAxO1xuICAgICAgICBpZiAoc3RhdGUudGltZXNIaXQgPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgc2luaygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHNpbmsgPSAoKSA9PiB7XG4gICAgICAgIHN0YXRlLmlzU3VuayA9IHRydWU7XG4gICAgfTtcblxuICAgIGNvbnN0IHJvdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgc3RhdGUuaXNIb3Jpem9udGFsID0gIXN0YXRlLmlzSG9yaXpvbnRhbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsZW5ndGgsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGdldCB0aW1lc0hpdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS50aW1lc0hpdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGlzU3VuaygpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5pc1N1bms7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBpc0hvcml6b250YWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuaXNIb3Jpem9udGFsO1xuICAgICAgICB9LFxuICAgICAgICBoaXQsXG4gICAgICAgIHNpbmssXG4gICAgICAgIHJvdGF0ZVxuICAgIH1cbn07XG5cblxuY2xhc3MgU2hpcFN0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNoaXBBcnJheSA9IFtdO1xuICAgIH07XG5cbiAgICBhZGRTaGlwKHNoaXApIHtcbiAgICAgICAgdGhpcy5zaGlwQXJyYXkucHVzaChzaGlwKTtcbiAgICB9O1xuXG4gICAgZ2V0U2hpcHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoaXBBcnJheTtcbiAgICB9O1xuXG59O1xuXG5cbmV4cG9ydCB7IHNoaXBGYWN0b3J5LCBTaGlwU3RvcmFnZSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==