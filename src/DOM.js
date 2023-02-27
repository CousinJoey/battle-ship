
import { playerGameboard, array, player, computer, computerGameboard } from ".";


export function listeners() {
    
    document.addEventListener("click", (e) => {

        if (e.target.matches("#play-again")) {
            location.reload();
        }

    });

}


export function createBoard(name) {

    let isVertical = true;
    let counter = 5;
    let ignoreDecrement = false;
    const arrayOfShips = array;

    if (name === "player") {
        let rotate = document.querySelector("#rotate")

        rotate.addEventListener("click", () => {
        let arrayOfShips = array;
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
                    if (arrayOfShips.length || computerGameboard.checkIfAllSunk() || playerGameboard.checkIfAllSunk() || cell.style.background === "red" || cell.textContent === "○") {
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
    return playerGameboard.placeShip(testItem, y, x);
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
    updateComputerBoard(player.sendAttack(y, x, computer, computerGameboard), y, x);
    if (computerGameboard.checkIfAllSunk() === true) {
        endGame(player.getPlayerName());
    }
    let computerAttack = computer.randomAttack();
    updatePlayerBoard(computerAttack.result, computerAttack.y, computerAttack.x);
    if (playerGameboard.checkIfAllSunk() === true) {
        endGame(computer.getPlayerName());
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
