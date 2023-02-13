
import { shipFactory, shipStorage } from "./ship.js";
import { gameboardStorage, gameboardFactory } from "./gameboard.js";




test("Getting ship length", () => {
    expect(shipStorage.getShips()[0].length).toBe(5);
});

test("Get ship isSunk", () => {
    expect(shipStorage.getShips()[0].isSunk).toBe(false);
});

test("Getting ship hits", () => {
    expect(shipStorage.getShips()[0].timesHit).toBe(1);
});

test("Getting ship orientation", () => {
    expect(shipStorage.getShips()[0].isHorizontal).toBe(false);
});

test("Ensure vertical gameboard length is 7", () => {
    expect(gameboardStorage.getGameBoards()[0].array.length).toBe(7);
});

test("Ensure hortizontal gameboard length is 7", () => {
    expect(gameboardStorage.getGameBoards()[0].array[0].length).toBe(7);
});

test("Ensure splicing works on array", () => {
    let spliceTest = gameboardStorage.getGameBoards()[0].array[0]
    spliceTest.splice(0,1,"x");
    expect(spliceTest).toContain("x");
    expect(spliceTest.length).toBe(7);
});

test("Getting array item at specific index", () => {
    let spliceTest = gameboardStorage.getGameBoards()[0].array[0]
    spliceTest.splice(0,1,"x");
    expect(gameboardStorage.getGameBoards()[0].array[0][0]).toBe("x");
});

// test("Placing ship vertically", () => {
//     let gameboard = gameboardStorage.getGameBoards();
//     gameboard[0].placeShip(0,0);
//     expect(gameboard).toBe("");
// });

test("Testing recevieAttack function", () => {
    let gameboard = gameboardStorage.getGameBoards();
    gameboard[0].placeShip(0,0);
    expect(gameboard[0].receiveAttack(0,0)).toBe("Hit");
    expect(gameboard[0].receiveAttack(1,0)).toBe("Hit");
    expect(gameboard[0].receiveAttack(0,1)).toBe("Missed");
    expect(gameboard[0].receiveAttack(0,1)).toBe("Already shot");
});





