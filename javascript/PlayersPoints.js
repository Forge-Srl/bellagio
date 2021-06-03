class PlayersPoints {

    constructor() {
        this.points = new Map()
    }

    // @bionic (Player) => Int
    get(player) {
        return this.points.get(player)
    }

    set(player, points) {
        this.points.set(player, points)
    }

    get winningPlayer() {
        const points = this.points
        const maxPoint = Math.max(...points.values())
        return [...points].find(kvp => kvp[1] === maxPoint)[0]
    }

    forEach(...args) {
        this.points.forEach(...args)
    }
}

module.exports = {PlayersPoints}