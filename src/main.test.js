
import { shipFactory, shipStorage } from "./ship.js";
import { gameboardStorage, gameboardFactory } from "./gameboard.js";
import { Player } from "./player.js";
import { AI } from "./AI.js";




// test("Getting ship length", () => {
//     expect(shipStorage.getShips()[0].length).toBe(5);
// });

// test("Get ship isSunk", () => {
//     expect(shipStorage.getShips()[0].isSunk).toBe(false);
// });

// test("Getting ship hits", () => {
//     expect(shipStorage.getShips()[0].timesHit).toBe(0);
// });

// test("Getting ship orientation", () => {
//     expect(shipStorage.getShips()[0].isHorizontal).toBe(false);
// });

// test("Ensure vertical gameboard length is 7", () => {
//     expect(gameboardStorage.getGameBoards()[0].array.length).toBe(7);
// });

// test("Ensure hortizontal gameboard length is 7", () => {
//     expect(gameboardStorage.getGameBoards()[0].array[0].length).toBe(7);
// });

// test("Ensure splicing works on array", () => {
//     let spliceTest = gameboardStorage.getGameBoards()[0].array[0]
//     spliceTest.splice(0,1,"x");
//     expect(spliceTest).toContain("x");
//     expect(spliceTest.length).toBe(7);
// });

// test("Getting array item at specific index", () => {
//     let spliceTest = gameboardStorage.getGameBoards()[0].array[0]
//     spliceTest.splice(0,1,"x");
//     expect(gameboardStorage.getGameBoards()[0].array[0][0]).toBe("x");
// });

// test("Testing recevieAttack function", () => {
//     let gameboard = gameboardStorage.getGameBoards();
//     gameboard[0].placeShip(0,0);

//     let ship = shipStorage.getShips()[0];

//     expect(gameboard[0].receiveAttack(1,0)).toBe("Hit");
//     expect(gameboard[0].receiveAttack(1,0)).toBe("Already hit");
//     expect(gameboard[0].receiveAttack(0,0)).toBe("Hit");
//     expect(gameboard[0].receiveAttack(0,0)).toBe("Already hit");
//     expect(ship.timesHit).toBe(2);
    
// });

// test("Testing if gameloop returns true if all ships are sunk", () => {
//     let gameboard = gameboardStorage.getGameBoards();

//     let ship = shipStorage.getShips()[0];


//     gameboard[0].receiveAttack(0,0);
//     gameboard[0].receiveAttack(1,0);
//     gameboard[0].receiveAttack(2,0);
//     gameboard[0].receiveAttack(3,0);

//     expect(gameboard[0].checkIfAllSunk()).toBe("game continues");
//     expect(ship.isSunk).toBe(false);

//     gameboard[0].receiveAttack(4,0);

//     expect(gameboard[0].checkIfAllSunk()).toBe("game has ended");
//     expect(ship.isSunk).toBe(true);
// });

// test("Test if player turn changes", () => {
//     const player1 = new Player("PlayerOne");
//     const player2 = new Player("PlayerTwo");
//     player1.endTurn(player2);
//     expect(player1.whoseTurn()).toBe(false);
//     expect(player2.whoseTurn()).toBe(true);
// });

// test("Player attacking function", () => {
//     let gameboard = gameboardStorage.getGameBoards()[1];
//     let ship = shipStorage.getShips()[0];

//     let player1 = new Player('playerTestOne');
//     let player2 = new Player('playerTestTwo');

//     gameboard.placeShip(0,0);
//     player1.sendAttack(0, 0, player2, gameboard);
//     expect(player1.whoseTurn()).toBe(false);
//     expect(player2.whoseTurn()).toBe(true);

// });

// test("See if AI works", () => {
//     let gameboard = gameboardStorage.getGameBoards()[1];
//     let gameboardTwo = gameboardStorage.getGameBoards()[2];

//     let player1 = new Player("playerOne");
//     let player2 = new AI("robot", player1, gameboard);

//     player1.sendAttack(0, 0, player2, gameboardTwo);
//     player2.randomAttack();
    
//     expect(player2.shotsArray.length).toBe(1);


// });







