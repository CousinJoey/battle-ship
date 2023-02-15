
export function createBoard() {

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

