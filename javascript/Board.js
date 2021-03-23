const {Segment} = require('./Segment')

class Board {

    constructor(height = 10, width = 10) {
        this.size = {height, width}
        this.segments = []
    }

    /**
     * @param segment {Segment}
     * */
    addSegment(segment) {
        if (!segment.isValid(this.size.width, this.size.height)) {
            throw new Error('Invalid segment')
        }

        this.segments.push(segment)
    }

    get squares() {
        const lastSegment = this.segments[this.segments.length - 1]
        const segmentPoints = lastSegment.segmentPoints

        const horizontal1 = this._getSquares([], segmentPoints[1], ['W'])
        const horizontal2 = this._getSquares([], segmentPoints[1], ['E'])
        const vertical1 = this._getSquares([], segmentPoints[1], ['N'])
        const vertical2 = this._getSquares([], segmentPoints[1], ['S'])
        // ...
        // escludere la direzione inversa al segmento finale


        for (const segment of this.segments) {

        }
    }

    _getAdjacentPoints(point) {
        const adjacentList = this.segments.filter(segment => (segment.startPoint.x === point.x && segment.startPoint.y === point.y) ||
            (segment.startPoint.x === point.x - 1 && segment.startPoint.y === point.y && segment.isHorizontal) ||
            (segment.startPoint.x === point.x && segment.startPoint.y === point.y - 1 && segment.isVertical))

        const maybeTop = adjacentList.find(adjacentSegment => adjacentSegment.y < point.y)
        const maybeBottom = adjacentList.find(adjacentSegment => adjacentSegment.y === point.y && adjacentSegment.isVertical)
        const maybeLeft = adjacentList.find(adjacentSegment => adjacentSegment.x < point.x)
        const maybeRight = adjacentList.find(adjacentSegment => adjacentSegment.x === point.x && adjacentSegment.isHorizontal)

        return {
            top: maybeTop ? maybeTop.startPoint : undefined,
            bottom: maybeBottom ? maybeBottom.segmentPoints[1]: undefined,
            left: maybeLeft ? maybeLeft.startPoint : undefined,
            right: maybeRight ? maybeRight.segmentPoints[1] : undefined,
        }
    }

    _getSquares(previousPoints, currentPoint, directionStack) {
        if (previousPoints.length && previousPoints[0].x === currentPoint.x && previousPoints[0].y === currentPoint.y) {
            return [{path: previousPoints}]
        }

        const nextMoves = this._getAdjacentPoints(currentPoint)
        const paths = []

        if (directionStack[0] === 'E') {
            let counter = 0
            if (nextMoves.top && !this._isDirectionAlreadyTaken(directionStack, 'N')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.top], nextMoves.top, ['N', ...directionStack]))
                counter++
            }
            if (nextMoves.bottom && !this._isDirectionAlreadyTaken(directionStack, 'S')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.bottom], nextMoves.bottom, ['S', ...directionStack]))
                counter++
            }
            if (counter < 2 && nextMoves.right) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.right], nextMoves.right, directionStack))
            }
        } else if (directionStack[0] === 'W') {
            let counter = 0
            if (nextMoves.top && !this._isDirectionAlreadyTaken(directionStack, 'N')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.top], nextMoves.top, ['N', ...directionStack]))
                counter++
            }
            if (nextMoves.bottom && !this._isDirectionAlreadyTaken(directionStack, 'S')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.bottom], nextMoves.bottom, ['S', ...directionStack]))
                counter++
            }
            if (counter < 2 && nextMoves.left) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.left], nextMoves.left, directionStack))
            }
        } else if (directionStack[0] === 'N') {
            let counter = 0
            if (nextMoves.left && !this._isDirectionAlreadyTaken(directionStack, 'W')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.left], nextMoves.left, ['W', ...directionStack]))
                counter++
            }
            if (nextMoves.right && !this._isDirectionAlreadyTaken(directionStack, 'E')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.right], nextMoves.right, ['E', ...directionStack]))
                counter++
            }
            if (counter < 2 && nextMoves.top) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.top], nextMoves.top, directionStack))
            }
        } else if (directionStack[0] === 'S') {
            let counter = 0
            if (nextMoves.left && !this._isDirectionAlreadyTaken(directionStack, 'W')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.left], nextMoves.left, ['W', ...directionStack]))
                counter++
            }
            if (nextMoves.right && !this._isDirectionAlreadyTaken(directionStack,'E')) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.right], nextMoves.right, ['E', ...directionStack]))
                counter++
            }
            if (counter < 2 && nextMoves.bottom) {
                paths.push(...this._getSquares([...previousPoints, nextMoves.bottom], nextMoves.bottom, directionStack))
            }
        }
        return paths
    }

    _isDirectionAlreadyTaken(array, value) {
        // Last element can be duplicated
        return array.slice(0, -1).includes(value)
    }

    /*
    *
Algoritmo di ricerca rettangoli:
- prediligere il cambio di direzione
- c'è uno stack di direzioni da intraprendere che
	- dipende dalle direzioni possibili [DX, B, SX, A DX]
	- si consuma ad ogni cambio di direzioni
	- la prima direzione deve essere duplicata in coda
- ad ogni nodo con più direzioni possibili devo branchare ricorsivamente
	- portandomi dietro lo stack delle direzioni.
	- ritornando le soluzioni che trovo come array
- le soluzioni ritornate vanno controllate perchè
	- possono essere duplicate
	- possono contenere segmenti e quindi non sono valide
    *
    * */
}

module.exports = {Board}