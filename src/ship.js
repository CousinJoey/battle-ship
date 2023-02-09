
const shipFactory = (length) => {

    let state = {
        timesHit: 0,
        isSunk: false
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
        get timesHit() {
            return state.timesHit;
        },
        get isSunk() {
            return state.isSunk;
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

const shipStorage = new ShipStorage();

let ship5 = shipFactory(5);

shipStorage.addShip(ship5);

let foo = shipStorage.getShips();
foo[0].hit();

export { shipFactory, shipStorage };
