const {Segment} = require('./Segment')

class Board {

    constructor(height = 10, width = 10) {
        this.size = {height, width}
        this.segments = []
        this.conqueredSquares = []
    }

    get isGameOver() {
        const totalArea = (this.size.height - 1) * (this.size.width - 1)
        const conqueredArea = this.conqueredSquares.reduce((points, currentSquare) => {
            const width = currentSquare.right - currentSquare.left
            const height = currentSquare.bottom - currentSquare.top
            return points + width * height
        }, 0)

        return totalArea === conqueredArea
    }

    getPoints(player) {
        return this.conqueredSquares
            .filter(square => square.player === player)
            .reduce((points, currentSquare) => {
                const width = currentSquare.right - currentSquare.left
                const height = currentSquare.bottom - currentSquare.top
                const area = width * height
                return points + area
            }, 0)
    }

    /**
     * @param segment {Segment}
     * */
    canAddSegment(segment) {
        const point = segment.startPoint
        return segment.isValid(this.size.width, this.size.height) &&
            !this.segments.find(otherSegment => otherSegment.startPoint.x === point.x &&
                otherSegment.startPoint.y === point.y && otherSegment.direction === segment.direction) &&
            !this.conqueredSquares.find(square => point.x >= square.left && point.x < square.right &&
                point.y >= square.top && point.y < square.bottom)
    }

    /**
     * @param segment {Segment}
     * */
    addSegment(segment) {
        if (!this.canAddSegment(segment)) {
            throw Error('Invalid segment')
        }

        this.segments.push(segment)
        this.conqueredSquares.push(...this._computeSquares().map(square => Object.assign(square, {player: segment.player})))
    }

    _computeSquares() {
        const lastSegment = this.segments[this.segments.length - 1]

        return this._getConqueredSquaredPaths(
            this._getSquaredPaths([], lastSegment.startPoint, [lastSegment.isHorizontal ? 'W' : 'N']))
    }

    _getConqueredSquaredPaths(squaredPaths) {
        return squaredPaths
            .map(square => {
                const xs = square.path.map(point => point.x)
                const ys = square.path.map(point => point.y)
                return {left: Math.min(...xs), right: Math.max(...xs), top: Math.min(...ys), bottom: Math.max(...ys)}
            })
            .filter(square => { // filter out squares containing segments
                for (const segment of this.segments) {
                    if (segment.isHorizontal) {
                        if (segment.startPoint.x >= square.left && segment.startPoint.x < square.right &&
                            segment.startPoint.y > square.top && segment.startPoint.y < square.bottom) {
                            return false
                        }
                    } else if (segment.startPoint.x > square.left && segment.startPoint.x < square.right &&
                        segment.startPoint.y >= square.top && segment.startPoint.y < square.bottom) {
                        return false
                    }
                }
                return true
            })
            .filter(square => { // filter out squares already conquered
                for (const conqueredSquare of this.conqueredSquares) {
                    if (conqueredSquare.left === square.left && conqueredSquare.right === square.right &&
                        conqueredSquare.top === square.top && conqueredSquare.bottom === square.bottom) {
                        return false
                    }
                }
                return true
            })
    }

    _getAdjacentPoints(point) {
        const adjacentList = this.segments.filter(segment => (segment.startPoint.x === point.x && segment.startPoint.y === point.y) ||
            (segment.startPoint.x === point.x - 1 && segment.startPoint.y === point.y && segment.isHorizontal) ||
            (segment.startPoint.x === point.x && segment.startPoint.y === point.y - 1 && segment.isVertical))

        const maybeTop = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.y < point.y)
        const maybeBottom = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.y === point.y && adjacentSegment.isVertical)
        const maybeLeft = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.x < point.x)
        const maybeRight = adjacentList.find(adjacentSegment => adjacentSegment.startPoint.x === point.x && adjacentSegment.isHorizontal)

        return {
            top: maybeTop ? maybeTop.startPoint : undefined,
            bottom: maybeBottom ? maybeBottom.segmentPoints[1] : undefined,
            left: maybeLeft ? maybeLeft.startPoint : undefined,
            right: maybeRight ? maybeRight.segmentPoints[1] : undefined,
        }
    }

    _getSquaredPaths(previousPoints, currentPoint, directionStack) {
        if (previousPoints.length && previousPoints[0].x === currentPoint.x && previousPoints[0].y === currentPoint.y) {
            return [{path: previousPoints}]
        }

        const nextMoves = this._getAdjacentPoints(currentPoint)
        const paths = []

        const currentDirection = directionStack[0]
        const currentPoints = [...previousPoints, currentPoint]
        let turnsCount = 0
        if (currentDirection === 'E') {
            if (nextMoves.top && !this._isDirectionAlreadyTaken(directionStack, 'N')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.top, ['N', ...directionStack]))
                turnsCount++
            }
            if (nextMoves.bottom && !this._isDirectionAlreadyTaken(directionStack, 'S')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.bottom, ['S', ...directionStack]))
                turnsCount++
            }
            if (turnsCount < 2 && nextMoves.right) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.right, directionStack))
            }
        } else if (currentDirection === 'W') {
            if (nextMoves.top && !this._isDirectionAlreadyTaken(directionStack, 'N')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.top, ['N', ...directionStack]))
                turnsCount++
            }
            if (nextMoves.bottom && !this._isDirectionAlreadyTaken(directionStack, 'S')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.bottom, ['S', ...directionStack]))
                turnsCount++
            }
            if (turnsCount < 2 && nextMoves.left) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.left, directionStack))
            }
        } else if (currentDirection === 'N') {
            if (nextMoves.left && !this._isDirectionAlreadyTaken(directionStack, 'W')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.left, ['W', ...directionStack]))
                turnsCount++
            }
            if (nextMoves.right && !this._isDirectionAlreadyTaken(directionStack, 'E')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.right, ['E', ...directionStack]))
                turnsCount++
            }
            if (turnsCount < 2 && nextMoves.top) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.top, directionStack))
            }
        } else if (currentDirection === 'S') {
            if (nextMoves.left && !this._isDirectionAlreadyTaken(directionStack, 'W')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.left, ['W', ...directionStack]))
                turnsCount++
            }
            if (nextMoves.right && !this._isDirectionAlreadyTaken(directionStack, 'E')) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.right, ['E', ...directionStack]))
                turnsCount++
            }
            if (turnsCount < 2 && nextMoves.bottom) {
                paths.push(...this._getSquaredPaths(currentPoints, nextMoves.bottom, directionStack))
            }
        }
        return paths
    }

    _isDirectionAlreadyTaken(array, value) {
        // Last element can be duplicated
        return array.slice(0, -1).includes(value)
    }
}

module.exports = {Board}