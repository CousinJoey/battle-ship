
import { shipFactory, shipStorage } from "./ship.js";
import { gameboardStorage } from "./gameboard.js";




test("Getting ship length", () => {
    expect(shipStorage.getShips()[0].length).toBe(5);
});

test("Get ship isSunk", () => {
    expect(shipStorage.getShips()[0].isSunk).toBe(false);
});

test("Getting ship hits", () => {
    expect(shipStorage.getShips()[0].timesHit).toBe(1);
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

// test("Inserts X using splice", () => {
//     expect(testSplice).toBe("");
// });





