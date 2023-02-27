import { GameboardStorage, gameboardFactory } from "./gameboard";
import { createBoard } from "./DOM";
import { shipFactory, ShipStorage } from "./ship";
import { Player } from "./player";
import { AI } from "./AI";
import { listeners } from "./DOM";


export let playerGameboard = gameboardFactory();
export let computerGameboard = gameboardFactory();

listeners();

let gameboardClass = new GameboardStorage();

gameboardClass.addBoard(playerGameboard);
gameboardClass.addBoard(computerGameboard);

let shipStorageClass = new ShipStorage();

let carrier = shipFactory("carrier", 5);
let battleship = shipFactory("battleship", 4);
let cruiser = shipFactory("cruiser", 3);
let submarine = shipFactory("submarine", 3);
let destroyer = shipFactory("destroyer", 2);

shipStorageClass.addShip(carrier);
shipStorageClass.addShip(battleship);
shipStorageClass.addShip(cruiser);
shipStorageClass.addShip(submarine);
shipStorageClass.addShip(destroyer);

let botCarrier = shipFactory("botcarrier", 5);
let botBattleship = shipFactory("botbattleship", 4);
let botCruiser = shipFactory("botcruiser", 3);
let botSubmarine = shipFactory("botsubmarine", 3);
let botDestroyer = shipFactory("botdestroyer", 2);

placeComputerShips(botCarrier);
placeComputerShips(botBattleship);
placeComputerShips(botCruiser);
placeComputerShips(botSubmarine);
placeComputerShips(botDestroyer);

export let player = new Player('player');
export let computer = new AI("AI", player, playerGameboard);

export let array = shipStorageClass.getShips();

createBoard("player");
createBoard("computer")

export let loggingGameboard = gameboardClass.getGameBoards()[0].state.gameBoard;

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


