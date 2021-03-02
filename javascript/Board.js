class Board {

    static get horizontal() {
        return 'horizontal'
    }

    static get vertical() {
        return 'vertical'
    }

    constructor(height = 10, width = 10) {
        this.size = {height, width}
        this.segments = []
    }

    /**
     * @param player
     * @param coordinates {{x: Number, y: Number}}
     * @param direction
     * */
    addSegment(player, coordinates, direction) {
        if (direction !== Board.horizontal && direction !== Board.vertical) {
            throw new Error('Invalid direction')
        }

        if (coordinates.x >= this.size.width || coordinates.y >= this.size.height
            || coordinates.x < 0 || coordinates.y < 0) {
            throw new Error('Invalid coordinates')
        }

        if (coordinates.x === this.size.width - 1 && direction === Board.horizontal
            || coordinates.y === this.size.height - 1 && direction === Board.vertical) {
            throw new Error('Invalid direction for these coordinates')
        }

        this.segments.push({player, coordinates, direction})
    }
}

module.exports = {Board}