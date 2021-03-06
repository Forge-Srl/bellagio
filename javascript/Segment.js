require('./Point')
require('./Player')

class Segment {

    // @bionic String
    static get horizontal() {
        return 'horizontal'
    }

    // @bionic String
    static get vertical() {
        return 'vertical'
    }

    constructor(player, startPoint, direction) {
        if (direction !== Segment.horizontal && direction !== Segment.vertical) {
            throw new Error('Invalid direction')
        }

        this.player = player
        this.startPoint = startPoint
        this.direction = direction
    }

    // @bionic get startPoint Point
    // @bionic get player Player

    // @bionic Bool
    get isVertical() {
        return this.direction === Segment.vertical
    }

    // @bionic Bool
    get isHorizontal() {
        return this.direction === Segment.horizontal
    }

    get segmentPoints() {
        const endPoint = this.isVertical
            ? {x: this.startPoint.x, y: this.startPoint.y + 1}
            : {x: this.startPoint.x + 1, y: this.startPoint.y}

        return [this.startPoint, endPoint]
    }

    isValid(width, height) {
        return this.startPoint.x < width && this.startPoint.x >= 0
            && this.startPoint.y < height && this.startPoint.y >= 0
            && (this.startPoint.x !== width - 1 || this.isVertical)
            && (this.startPoint.y !== height - 1 || this.isHorizontal)
    }
}

module.exports = {Segment}