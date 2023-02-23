import { Player } from "./player";

export class AI extends Player{
    constructor(name, opponent, opponentBoard) {
        super(name, opponentBoard);
        this.name = name;
        this.opponent = opponent;
        this.opponentBoard = opponentBoard;
        this.shotsArray = [];
        this.turn = false;
    }


    randomAttack() {
        if (this.whoseTurn() === true) {
            let coords = {y:undefined, x:undefined};
                while (this.whoseTurn() === true) {
                coords.y = Math.floor(Math.random() * 10);
                coords.x = Math.floor(Math.random() * 10);
                if (!(this.shotsArray.some(number => number.y == coords.y && number.x == coords.x))) {
                    this.shotsArray.push(coords);
                    return {
                        result: this.sendAttack(coords.y, coords.x, this.opponent, this.opponentBoard),
                        y: coords.y,
                        x: coords.x
                    };
                }
            }
        }
    }

}