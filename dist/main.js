/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBoard": () => (/* binding */ createBoard)
/* harmony export */ });

function createBoard() {

    let playerBoard = document.querySelector(".player-board-container");

    // for (let x = 0; x < board.length; x++) {
    //     const row = document.createElement("div");
    //     for (let y = 0; x < board[x].length; y++) {
    //         const cell = document.createElement("div");
    //             cell.setAttribute("y", x);
    //             cell.setAttribute("x", y);
    //         row.appendChild(cell);
    //     }
    //     playerBoard.appendChild(row);
    // }

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let cell = document.createElement("div");
            cell.setAttribute("y", x);
            cell.setAttribute("x", y);
            playerBoard.appendChild(cell);
        }
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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");




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
        sink
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");



let gameBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.gameboardFactory)();

console.log(gameBoard);
console.log(gameBoard.state.gameBoard)

;(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.createBoard)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDTzs7QUFFUDs7QUFFQSx1QkFBdUIsa0JBQWtCO0FBQ3pDO0FBQ0EsMkJBQTJCLHFCQUFxQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsUUFBUTtBQUM1Qix3QkFBd0IsUUFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEJxQztBQUNEOztBQUVwQzs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBLFVBQVU7QUFDViw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxzQkFBc0Isa0JBQWtCLFNBQVMsTUFBTTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdvQzs7Ozs7OztVQ3REcEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOaUU7QUFDN0I7O0FBRXBDLGdCQUFnQiw0REFBZ0I7O0FBRWhDO0FBQ0E7O0FBRUEsa0RBQVcsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZS1zaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZS1zaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuXG4gICAgbGV0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItYm9hcmQtY29udGFpbmVyXCIpO1xuXG4gICAgLy8gZm9yIChsZXQgeCA9IDA7IHggPCBib2FyZC5sZW5ndGg7IHgrKykge1xuICAgIC8vICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8vICAgICBmb3IgKGxldCB5ID0gMDsgeCA8IGJvYXJkW3hdLmxlbmd0aDsgeSsrKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZShcInlcIiwgeCk7XG4gICAgLy8gICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJ4XCIsIHkpO1xuICAgIC8vICAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgLy8gfVxuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJ5XCIsIHgpO1xuICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJ4XCIsIHkpO1xuICAgICAgICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuIiwiXG5pbXBvcnQgeyBzaGlwU3RvcmFnZSB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IGNyZWF0ZUJvYXJkIH0gZnJvbSBcIi4vRE9NXCI7XG5cbmNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoYXJyYXkpID0+IHtcblxuICAgIGNvbnN0IGNyZWF0ZUdhbWVCb2FyZCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGdhbWVCb2FyZCA9IG5ldyBBcnJheSgxMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZUJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBnYW1lQm9hcmRbaV0gPSBuZXcgQXJyYXkoMTApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNyZWF0ZUJvYXJkKGdhbWVCb2FyZCk7XG4gICAgICAgIHJldHVybiBnYW1lQm9hcmQ7XG4gICAgfTtcblxuICAgIGxldCBzdGF0ZSA9IHtcbiAgICAgICAgZ2FtZUJvYXJkOiBjcmVhdGVHYW1lQm9hcmQoKSxcbiAgICAgICAgbnVtYmVyT2ZTaGlwczogW10sXG4gICAgICAgIG51bWJlck9mU2lua3M6IDAsXG4gICAgICAgIHNob3RzSGl0OiBbXSxcbiAgICB9XG5cbiAgICBjb25zdCBpc0xvY2F0aW9uVmFsaWQgPSAoc2hpcCwgeSx4KSA9PiB7XG4gICAgICAgIGlmIChzaGlwLmlzSG9yaXpvbnRhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKCh4ID4gOSB8fCB4IDwgMCB8fCB4ICsgc2hpcC5sZW5ndGggPiA5IHx8IHkgPiA5IHx8IHkgPCAwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcC5pc0hvcml6b250YWwgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICgoeCA+IDkgfHwgeCA8IDAgfHwgeSA+IDkgfHwgeSA8IDAgfHwgeSArIHNoaXAubGVuZ3RoID4gOSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcCwgeSwgeCkgPT4ge1xuICAgICAgICBpZiAoaXNMb2NhdGlvblZhbGlkKHNoaXAsIHksIHgpID09PSB0cnVlICYmIHNoaXAuaXNIb3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5nYW1lQm9hcmRbeV1beCArIGldID0gc2hpcFxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzTG9jYXRpb25WYWxpZChzaGlwLCB5LCB4KSA9PT0gdHJ1ZSAmJiBzaGlwLmlzSG9yaXpvbnRhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHN0YXRlLmdhbWVCb2FyZFt5ICsgaV1beF0gPSBzaGlwXG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoc2hpcCwgeSwgeCkgPT4ge1xuXG4gICAgICAgIGlmIChib2FyZFt5XVt4XSA9PT0gXCJtXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9hcmRbeV1beF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHogaW4gc3RhdGUuc2hvdHNIaXQpe1xuICAgICAgICAgICAgICAgIGlmKGAke3N0YXRlLnNob3RzSGl0W3pdfWAgPT09IGAke1t5LHhdfWApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGUuc2hvdHNIaXQucHVzaCgoW3ksIHhdKSk7XG4gICAgICAgICAgICBzaGlwLmhpdCgpO1xuICAgICAgICAgICAgY2hlY2tJZlN1bmsoc2hpcClcbiAgICAgICAgICAgIGNoZWNrSWZBbGxTdW5rKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2FyZFt5XVt4XSA9IFwibVwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgXG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrSWZTdW5rID0gKHNoaXApID0+IHtcbiAgICAgICAgaWYgKHNoaXAuaXNTdW5rID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzdGF0ZS5udW1iZXJPZlNpbmtzICs9IDE7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGNoZWNrSWZBbGxTdW5rID0gKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUubnVtYmVyT2ZTaW5rcyA9PT0gc3RhdGUubnVtYmVyT2ZTaGlwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7IFxuICAgICAgICBhcnJheSxcbiAgICAgICAgcGxhY2VTaGlwLFxuICAgICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgICBjaGVja0lmQWxsU3VuayxcbiAgICAgICAgc3RhdGVcbiAgICB9XG5cbn1cblxuY2xhc3MgR2FtZWJvYXJkU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkQXJyYXkgPSBbXTtcbiAgICB9O1xuXG4gICAgYWRkQm9hcmQoZ2FtZWJvYXJkKSB7XG4gICAgICAgIHRoaXMuZ2FtZWJvYXJkQXJyYXkucHVzaChnYW1lYm9hcmQpO1xuICAgIH07XG5cbiAgICBnZXRHYW1lQm9hcmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmRBcnJheTtcbiAgICB9O1xuXG59XG5cblxuXG5cbmV4cG9ydCB7IEdhbWVib2FyZFN0b3JhZ2UsIGdhbWVib2FyZEZhY3RvcnkgfTsiLCJcbmNvbnN0IHNoaXBGYWN0b3J5ID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuXG4gICAgbGV0IHN0YXRlID0ge1xuICAgICAgICB0aW1lc0hpdDogMCxcbiAgICAgICAgaXNTdW5rOiBmYWxzZSxcbiAgICAgICAgaXNIb3Jpem9udGFsOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgICAgIHN0YXRlLnRpbWVzSGl0ICs9IDE7XG4gICAgICAgIGlmIChzdGF0ZS50aW1lc0hpdCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICBzaW5rKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2luayA9ICgpID0+IHtcbiAgICAgICAgc3RhdGUuaXNTdW5rID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBuYW1lLFxuICAgICAgICBnZXQgdGltZXNIaXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUudGltZXNIaXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBpc1N1bmsoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuaXNTdW5rO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgaXNIb3Jpem9udGFsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmlzSG9yaXpvbnRhbDtcbiAgICAgICAgfSxcbiAgICAgICAgaGl0LFxuICAgICAgICBzaW5rXG4gICAgfVxufTtcblxuXG5jbGFzcyBTaGlwU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2hpcEFycmF5ID0gW107XG4gICAgfTtcblxuICAgIGFkZFNoaXAoc2hpcCkge1xuICAgICAgICB0aGlzLnNoaXBBcnJheS5wdXNoKHNoaXApO1xuICAgIH07XG5cbiAgICBnZXRTaGlwcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hpcEFycmF5O1xuICAgIH07XG5cbn07XG5cblxuZXhwb3J0IHsgc2hpcEZhY3RvcnksIFNoaXBTdG9yYWdlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdhbWVib2FyZFN0b3JhZ2UsIGdhbWVib2FyZEZhY3RvcnkgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IGNyZWF0ZUJvYXJkIH0gZnJvbSBcIi4vRE9NXCI7XG5cbmxldCBnYW1lQm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KCk7XG5cbmNvbnNvbGUubG9nKGdhbWVCb2FyZCk7XG5jb25zb2xlLmxvZyhnYW1lQm9hcmQuc3RhdGUuZ2FtZUJvYXJkKVxuXG5jcmVhdGVCb2FyZCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==