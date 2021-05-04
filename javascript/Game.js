const {Board} = require('./Board')
const {Point} = require('./Point')
const {Segment} = require('./Segment')
const {Player} = require('./Player')
const {PlayersPoints} = require('./PlayersPoints')

class Game {

    // @bionic ()
    constructor() {
    }

    // @bionic get players Array<Player>

    // @bionic Player
    get currentPlayer() {
        return this.players[this.turnCounter % this.players.length]
    }

    // @bionic ((Board) => Void) => Void
    onGameStart(callback) {
        this.gameStartCallback = callback
    }

    // @bionic ((Player) => Void) => Void
    onGameOver(callback) {
        this.gameOverCallback = callback
    }

    // @bionic ((Board, Segment) => Void) => Void
    onSegmentAdded(callback) {
        this.segmentAddedCallback = callback
    }

    // @bionic (Int, Int) => Void
    startGame(width, height) {
        this.players = [new Player('John Doe'), new Player('Alan Smith')]
        this.turnCounter = 0
        this.board = new Board(height, width)
        this.gameStartCallback(this.board)
    }

    // @bionic (Int, Int, String) => Void
    addSegment(x, y, direction) {
        const segment = new Segment(this.currentPlayer, new Point(x, y), direction)
        this.board.addSegment(segment)
        this.segmentAddedCallback(this.board, segment)
        this.turnCounter++

        if (this.board.isGameOver) {
            this.gameOverCallback(this.points.winningPlayer)
        }
    }

    // @bionic PlayersPoints
    get points() {
        const points = new PlayersPoints()
        for (const player of this.players) {
            points.set(player, this.board.getPoints(player))
        }
        return points
    }
}

module.exports = {Game}
