
import { shipFactory, shipStorage } from "./ship.js";






test("Getting ship length", () => {
    expect(shipStorage.getShips()[0].length).toBe(5);
});

test("Get ship isSunk", () => {
    expect(shipStorage.getShips()[0].isSunk).toBe(false);
});

test("Getting ship hits", () => {
    expect(shipStorage.getShips()[0].timesHit).toBe(1);
});

