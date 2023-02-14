
class Player {
    constructor(name) {
        this.name = name;
        this.turn = true;
    };

    getPlayerName() {
        return this.name;
    };

    setPlayerName(name) {
        this.name = name;
    };

    endTurn(player) {
        if (this.turn === true) {
            this.turn = false;
            player.startTurn();
        }
    };

    startTurn() {
        if (this.turn === false) {
            this.turn = true;
        }
    };

    whoseTurn() {
        return this.turn;
    };

    sendAttack(y, x, player, boardRecipient) {
        if (this.whoseTurn()) {
            boardRecipient.receiveAttack(y,x);
            this.endTurn(player);
        }
    }

}

export { Player }