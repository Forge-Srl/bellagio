const {Board} = require('./Board')
const {Segment} = require('./Segment')
const {Player} = require('./Player')

class Game {

    constructor() {
    }

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

    // @bionic () => Void
    startGame() {
        this.players = [new Player('John Doe'), new Player('Alan Smith')]
        this.turnCounter = 0
        this.board = new Board()
        this.gameStartCallback(this.board)
    }

    // @bionic (Integer, Integer, String) => Void
    addSegment(x, y, direction) {
        const segment = new Segment(this.currentPlayer, {x, y}, direction)
        this.board.addSegment(segment)
        this.segmentAddedCallback(this.board, segment)
        this.turnCounter++

        if (this.board.isGameOver) {
            this.gameOverCallback(this.winningPlayer)
        }
    }

    get points() {
        const points = new Map()
        for (const player of this.players) {
            points.set(player, this.board.getPoints(player))
        }
        return points
    }

    get winningPlayer() {
        const points = this.points
        const maxPoint = Math.max(...points.values())
        return [...points].find(kvp => kvp[1] === maxPoint)[0]
    }
}

module.exports = {Game}