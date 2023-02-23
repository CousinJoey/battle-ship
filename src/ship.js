
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


export { shipFactory, ShipStorage };
