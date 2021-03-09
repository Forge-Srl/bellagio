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



    get squares() {
        const lastSegment = this.segments[this.segments.length - 1]
        const lastSegmentCoords = this._getSegmentCoords(lastSegment)

        const horizontal1 = this._getSquares([], lastSegmentCoords[1], ['W', 'N', 'E', 'S', 'W'])
        const horizontal2 = this._getSquares([], lastSegmentCoords[1], ['E', 'S', 'W', 'N', 'E'])
        const vertical1 = this._getSquares([], lastSegmentCoords[1], ['W', 'N', 'E', 'S', 'W'])
        const vertical2 = this._getSquares([], lastSegmentCoords[1], ['E', 'S', 'W', 'N', 'E'])
        // ...
        // escludere la direzione inversa al segmento finale


        for (const segment of this.segments) {

        }
    }

    _getSegmentCoords(segment) {
        if (segment.direction === Board.vertical) {
            return [segment.coordinates, {x: segment.coordinates.x, y: segment.coordinates.y + 1}]
        } else {
            return [segment.coordinates, {x: segment.coordinates.x + 1, y: segment.coordinates.y}]
        }
    }

    _getAdjacentCoords(node) {
        const adjacentList = this.segments.filter(segment => (segment.coordinates.x === node.x && segment.coordinates.y === node.y) ||
            (segment.coordinates.x === node.x - 1 && segment.coordinates.y === node.y && segment.direction === Board.horizontal) ||
            (segment.coordinates.x === node.x && segment.coordinates.y === node.y - 1 && segment.direction === Board.vertical))

        return {
            top: adjacentList.find(adjacentSegment => adjacentSegment.y < node.y).coordinates,
            bottom: this._getSegmentCoords(adjacentList.find(adjacentSegment => adjacentSegment.y === node.y && adjacentSegment.direction === Board.vertical))[1],
            left: adjacentList.find(adjacentSegment => adjacentSegment.x < node.x).coordinates,
            right: this._getSegmentCoords(adjacentList.find(adjacentSegment => adjacentSegment.x === node.x && adjacentSegment.direction === Board.horizontal))[1],
        }
    }

    _getSquares(previousCoordsPath, currentCoords, directionStack) {
        if (previousCoordsPath.length && previousCoordsPath[0].x === currentCoords.x && previousCoordsPath[0].y === currentCoords.y) {
            return [{path: previousCoordsPath}]
        }
        if (directionStack.length === 0) {
            return []
        }
        const nextMoves = this._getAdjacentCoords(currentCoords)

        const paths = []
        if (directionStack[0] === 'E' && nextMoves.right) {
            paths.push(...this._getSquares([...previousCoordsPath, nextMoves.right], nextMoves.right, directionStack))
        } else if (directionStack[0] === 'S' && nextMoves.bottom) {
            paths.push(...this._getSquares([...previousCoordsPath, nextMoves.bottom], nextMoves.bottom, directionStack))
        } else if (directionStack[0] === 'W' && nextMoves.left) {
            paths.push(...this._getSquares([...previousCoordsPath, nextMoves.left], nextMoves.left, directionStack))
        } else if (directionStack[0] === 'N' && nextMoves.top) {
            paths.push(...this._getSquares([...previousCoordsPath, nextMoves.top], nextMoves.top, directionStack))
        }
        //TODO: gestire casi in cui bisogna girare

        return paths
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