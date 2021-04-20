describe('Board', () => {
    let Board, Segment, board2x2, board3x2, board2x3, board3x2full

    beforeEach(() => {
        Board = require('../Board').Board
        Segment = require('../Segment').Segment

        board2x2 = new Board()
        board2x2.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]

        board3x2 = new Board()
        board3x2.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 2, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]

        board2x3 = new Board()
        board2x3.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]

        board3x2full = new Board()
        board3x2full.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 2, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]
    })

    test('canAddSegment, no overlapping', () => {
        const segment = new Segment(undefined, {x: 0, y: 0}, Segment.horizontal)
        segment.isValid = (width, height) => {
            expect(width).toBe(10)
            expect(height).toBe(10)
            return true
        }

        const board = new Board()
        board.segments = [new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical)]
        board.conqueredSquares = [{left: 3, top: 2, right: 7, bottom: 3}]

        expect(board.canAddSegment(segment)).toBe(true)
    })

    test('canAddSegment, segment is not valid', () => {
        const segment = new Segment(undefined, {x: 0, y: 0}, Segment.horizontal)
        segment.isValid = () => false
        const board = new Board()
        expect(board.canAddSegment(segment)).toBe(false)
    })

    test('canAddSegment, segment overlapping', () => {
        const segment = new Segment(undefined, {x: 0, y: 0}, Segment.horizontal)
        segment.isValid = () => true
        const board = new Board()
        board.segments = [new Segment(undefined, {x: 0, y: 0}, Segment.horizontal)]
        expect(board.canAddSegment(segment)).toBe(false)
    })

    test('canAddSegment, conquered overlapping top left', () => {
        const segment = new Segment(undefined, {x: 1, y: 1}, Segment.horizontal)
        segment.isValid = () => true
        const board = new Board()
        board.conqueredSquares = [{left: 1, top: 1, right: 3, bottom: 3}]

        expect(board.canAddSegment(segment)).toBe(false)
    })

    test('canAddSegment, conquered overlapping top middle', () => {
        const segment = new Segment(undefined, {x: 1, y: 1}, Segment.horizontal)
        segment.isValid = () => true
        const board = new Board()
        board.conqueredSquares = [{left: 0, top: 1, right: 2, bottom: 3}]

        expect(board.canAddSegment(segment)).toBe(false)
    })

    test('canAddSegment, conquered overlapping left middle', () => {
        const segment = new Segment(undefined, {x: 1, y: 1}, Segment.horizontal)
        segment.isValid = () => true
        const board = new Board()
        board.conqueredSquares = [{left: 1, top: 0, right: 3, bottom: 2}]

        expect(board.canAddSegment(segment)).toBe(false)
    })

    test('canAddSegment, conquered overlapping middle', () => {
        const segment = new Segment(undefined, {x: 1, y: 1}, Segment.horizontal)
        segment.isValid = () => true
        const board = new Board()
        board.conqueredSquares = [{left: 0, top: 0, right: 2, bottom: 2}]

        expect(board.canAddSegment(segment)).toBe(false)
    })

    test('canAddSegment, conquered non overlapping bottom right', () => {
        const segment = new Segment(undefined, {x: 2, y: 2}, Segment.horizontal)
        segment.isValid = () => true
        const board = new Board()
        board.conqueredSquares = [{left: 0, top: 0, right: 2, bottom: 2}]

        expect(board.canAddSegment(segment)).toBe(true)
    })

    test('_getConqueredSquaredPaths no intersections', () => {
        const board = new Board()

        expect(board._getConqueredSquaredPaths([{
            path: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 2, y: 2}, {x: 1, y: 2}],
        }])).toStrictEqual([{left: 1, right: 3, top: 1, bottom: 2}])
    })

    test('_getConqueredSquaredPaths surrounded ', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 3, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 3, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 2, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 2, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 2, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 3, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 2}, Segment.vertical),
            new Segment(undefined, {x: 2, y: 2}, Segment.vertical),
            new Segment(undefined, {x: 3, y: 2}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 3, y: 1}, Segment.vertical),
        ]

        expect(board._getConqueredSquaredPaths([{
            path: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 2, y: 2}, {x: 1, y: 2}],
        }])).toStrictEqual([{left: 1, right: 3, top: 1, bottom: 2}])
    })

    test('_getConqueredSquaredPaths vertical segment inside ', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 2, y: 1}, Segment.vertical),
        ]

        expect(board._getConqueredSquaredPaths([{
            path: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 2, y: 2}, {x: 1, y: 2}],
        }])).toStrictEqual([])
    })

    test('_getConqueredSquaredPaths horizontal segment inside ', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 1, y: 2}, Segment.horizontal),
        ]

        expect(board._getConqueredSquaredPaths([{
            path: [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 3}, {x: 2, y: 2}, {x: 2, y: 1}],
        }])).toStrictEqual([])
    })

    test('_getConqueredSquaredPaths already conquered square', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 2, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 2, y: 1}, Segment.horizontal),
        ]
        board.conqueredSquares = [
            {left: 1, right: 2, top: 1, bottom: 2, player: 'Luigi'}
        ]

        expect(board._getConqueredSquaredPaths([{
            path: [{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 2, y: 1}],
        }])).toStrictEqual([])
    })

    test('_getAdjacentPoints 1 point on right', () => {
        const board = new Board()
        board.segments = [new Segment(undefined, {x: 0, y: 0}, Segment.horizontal)]
        const adjacentPoints = board._getAdjacentPoints({x: 0, y: 0})
        expect(adjacentPoints).toEqual({right: {x: 1, y: 0}})
    })

    test('_getAdjacentPoints 4 points around', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 1}, Segment.horizontal),
        ]
        const adjacentPoints = board._getAdjacentPoints({x: 1, y: 1})
        expect(adjacentPoints).toEqual({
            top: {x: 1, y: 0},
            left: {x: 0, y: 1},
            right: {x: 2, y: 1},
            bottom: {x: 1, y: 2},
        })
    })

    test('_getAdjacentPoints surrounded by 4 not connected segments', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 2, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 2, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 1, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 2}, Segment.horizontal),
            new Segment(undefined, {x: 0, y: 1}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 0}, Segment.vertical),
        ]
        const adjacentPoints = board._getAdjacentPoints({x: 1, y: 1})
        expect(adjacentPoints).toEqual({})
    })

    test('_getSquaredPaths 2x2 clockwise', () => {
        const squaredPaths = board2x2._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 0}]},
        ])
    })

    test('_getSquaredPaths 2x2 counterclockwise', () => {
        const squaredPaths = board2x2._getSquaredPaths([], {x: 1, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]},
        ])
    })

    test('_getSquaredPaths 2x2 clockwise incomplete', () => {
        const board = new Board()
        board.segments = [
            new Segment(undefined, {x: 0, y: 0}, Segment.horizontal),
            new Segment(undefined, {x: 1, y: 0}, Segment.vertical),
            new Segment(undefined, {x: 0, y: 1}, Segment.horizontal),
        ]
        const squaredPaths = board._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([])
    })

    test('_getSquaredPaths 3x2 clockwise', () => {
        const squaredPaths = board3x2._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: 0}]},
        ])
    })

    test('_getSquaredPaths 3x2 counterclockwise', () => {
        const squaredPaths = board3x2._getSquaredPaths([], {x: 1, y: 0}, ['W'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 0}]},
        ])
    })

    test('_getSquaredPaths 2x3 clockwise', () => {
        const squaredPaths = board2x3._getSquaredPaths([], {x: 1, y: 0}, ['E'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2}, {x: 0, y: 1}, {x: 0, y: 0}]},
        ])
    })

    test('_getSquaredPaths 2x3 counterclockwise', () => {
        const squaredPaths = board2x3._getSquaredPaths([], {x: 1, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}, {x: 1, y: 1}]},
        ])
    })

    test('_getSquaredPaths 3x2 full, 2 paths', () => {
        const squaredPaths = board3x2full._getSquaredPaths([], {x: 1, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}]},
            {path: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 1, y: 1}]},
        ])
    })

    test('_getSquaredPaths 3x2 full, single path', () => {
        const squaredPaths = board3x2full._getSquaredPaths([], {x: 2, y: 0}, ['N'])
        expect(squaredPaths).toEqual([
            {path: [{x: 2, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}]},
            {path: [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}]},
        ])
    })
})